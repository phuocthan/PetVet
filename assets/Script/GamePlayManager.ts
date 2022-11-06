import ScreenBase from './ScreenBase';
import ScreenManager from './ScreenManager';
import GameController from './GameController';
import AssetManager from './AssetManager';
import LevelData, { AttachBone } from './Levels/LevelData';
import PetController, { AnimalState } from './Characters/PetController';
import { RoomData } from './Levels/LevelData';
import ItemBoard from './Objects/ItemBoard';
import Utils from './Utils';
import HurtPoint from './InteractiveObjects/HurtPoint';

const { ccclass, property } = cc._decorator;

@ccclass
export default class GamePlayManager extends ScreenBase {
    @property(ItemBoard)
    private itemBoard: ItemBoard = null;

    private _spawnPos: cc.Vec2 = null;
    private _petCtrl: PetController = null;
    private _levelData: LevelData = null;
    private _rooms: RoomData[] = null;
    private _targetBones: Map<string, [{ data: AttachBone; node: cc.Node }]> = new Map();
    private _roomTargets: Map<string, { itemId: string; targetId: string; finish: boolean }> = new Map();

    private _curRoomIdx: number = -1;
    private _numberOfTargets: number = 0;
    private _finishedTargets: number = 0;

    prepareToShow() {
        if (!this._spawnPos) {
            this._spawnPos = this.node.getChildByName('PetSpawnPos')?.getPosition();
        }
    }

    show() {
        super.show();
        const curLevel = GameController._inst.curLevel;
        const rawLevelData = AssetManager._inst.getLevelData(curLevel);
        const levelData = LevelData.parseFrom(rawLevelData);

        // spawn pet
        const petPrefab = AssetManager._inst.getPrefab(levelData.petId);
        const petNode = cc.instantiate(petPrefab);
        petNode.setPosition(this._spawnPos);
        this.node.addChild(petNode);
        this._petCtrl = petNode.getComponent(PetController);
        this._petCtrl.loadAnimations(levelData.animations);

        this._levelData = levelData;
        this._rooms = levelData.rooms;
        this._loadRooms(0);
    }

    hide() {
        super.hide();
    }

    onClickSelectLevelBtn() {
        ScreenManager._inst.gotoLevelSelection();
    }

    private _loadRooms(roomIdx: number) {
        this._curRoomIdx = roomIdx;
        const data = this._rooms[roomIdx];

        this._petCtrl.State = <AnimalState>data.state;
        this._petCtrl.updateAnim();

        this._loadTargets(data);

        // load items
        const useItemType = data.useType;
        this.itemBoard.loadItems(data.targets);
        this._petCtrl.node.setSiblingIndex(1);
    }

    private _loadTargets(data: RoomData) {
        this._numberOfTargets = 0;
        this._roomTargets.clear();
        const setupTarget = (item: string, bone: AttachBone, nodeU: cc.Node) => {
            const hurtPoint = nodeU.getComponent(HurtPoint);
            this._numberOfTargets++;
            hurtPoint.onFinish = () => {
                if (++this._finishedTargets >= this._numberOfTargets) {
                    cc.warn('End room!');
                    this._onFinishRoom();
                }
                cc.warn(`Room state: ${this._finishedTargets}/${this._numberOfTargets}`);
            };

            if (this._targetBones.has(item)) {
                this._targetBones.get(item).push({
                    data: bone,
                    node: nodeU,
                });
            } else {
                this._targetBones.set(item, [
                    {
                        data: bone,
                        node: nodeU,
                    },
                ]);
            }
        };
        data.targets.forEach((target) => {
            console.log(target);
            const item = target.item;
            const bones = target.bones;
            const prefabId = `${item}_T`;
            const prefab = AssetManager._inst.getItemPrefab(prefabId);
            let nodeU: cc.Node = null;
            if (bones && bones.length > 0 && prefab) {
                for (let i = 0; i < bones.length; i++) {
                    nodeU = cc.instantiate(prefab);
                    nodeU.angle = bones[i]?.angle || 0;
                    Utils.attachNodeToSpineBone(this._petCtrl.skeleton.node, bones[i].name, nodeU);
                    setupTarget(item, bones[i], nodeU);
                }
            }
        });
    }

    private _onFinishRoom(): void {
        const animTime = this._petCtrl.playAnimFunny();
        this.scheduleOnce(() => {
            this.itemBoard.clear();
            this._targetBones.clear();
            if (this._curRoomIdx < this._rooms.length - 1) {
                this._loadRooms(this._curRoomIdx + 1);
            } else {
                cc.warn('>>> Back to level selection');
            }
        }, animTime * 0.9);
    }
}
