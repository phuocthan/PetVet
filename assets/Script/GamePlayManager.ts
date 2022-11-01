import ScreenBase from './ScreenBase';
import ScreenManager from './ScreenManager';
import GameController from './GameController';
import AssetManager from './AssetManager';
import LevelData from './Levels/LevelData';
import PetController from './Characters/PetController';
import PetData, { AttachBone } from './Characters/PetData';
import { PetState } from './Characters/PetData';
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
    private _targetBones: Map<string, [{ bone: string; angle: number; attachNode: cc.Node }]> = new Map();
    private _roomTargets: Map<string, { itemId: string; targetId: string; finish: boolean }> = new Map();

    private _petData: PetData = null;
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
        this._petData = AssetManager._inst.getPetData(levelData.petId);
        
        // spawn pet
        const petPrefab = AssetManager._inst.getPrefab(levelData.petId);
        const petNode = cc.instantiate(petPrefab);
        petNode.setPosition(this._spawnPos);
        this.node.addChild(petNode);
        this._petCtrl = petNode.getComponent(PetController);
        this._petCtrl.load(this._petData);

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
        const roomData = this._rooms[roomIdx];

        this._petCtrl.State = <PetState>roomData.petState;
        this._petCtrl.updateAnim();

        this._roomTargets.clear();
        this._loadTargets(this._petCtrl.skeleton.node, this._petData);

        // load items
        const items = roomData.items;
        const useItemType = roomData.useType;
        this.itemBoard.loadItems(items);
        this._petCtrl.node.setSiblingIndex(1);
        this._numberOfTargets = 0;
        items.forEach((item) => {
            const bones = this._targetBones.get(item);
            if(bones) {
                bones.forEach((target) => {
                    if (target.attachNode) {
                        target.attachNode.active = true;
                        const hurtPoint = target.attachNode.getComponent(HurtPoint);
                        this._numberOfTargets++;
                        hurtPoint.onFinish = () => {
                            if (++this._finishedTargets >= this._numberOfTargets) {
                                cc.warn('End room!');
                                this._onFinishRoom();
                            }
                            cc.warn(`Room state: ${this._finishedTargets}/${this._numberOfTargets}`);
                        };
                    }
                });
            }
        });
    }

    private _onFinishRoom(): void {
        const animTime = this._petCtrl.playAnimFunny();
        this.scheduleOnce(() => {
            this.itemBoard.clear();
            this._targetBones.clear();
            if(this._curRoomIdx < this._rooms.length - 1) {
                this._loadRooms(this._curRoomIdx + 1);
            } else {
                cc.warn('>>> Back to level selection');
            }
        }, animTime * 0.7);
    }

    private _loadTargets(animNode: cc.Node, data: PetData): void {
        for (let boneName of Object.keys(data.bones)) {
            const boneConfig = data.bones[boneName];
            const type = boneConfig.type;
            const prefabId = `${boneConfig.type}_T`;
            const prefab = AssetManager._inst.getItemPrefab(prefabId);
            let nodeU: cc.Node = null;
            if (prefab) {
                nodeU = cc.instantiate(prefab);
                nodeU.angle = boneConfig?.angle || 0;
                nodeU.active = false;
                Utils.attachNodeToSpineBone(animNode, boneName, nodeU);
            } else {
                cc.warn(`Missing target prefab for bone: ${boneName}, prefab: ${prefabId}`);
            }
            if (this._targetBones.has(type)) {
                this._targetBones.get(type).push({
                    bone: boneName,
                    angle: boneConfig.angle,
                    attachNode: nodeU,
                });
            } else {
                this._targetBones.set(type, [
                    {
                        bone: boneName,
                        angle: boneConfig.angle,
                        attachNode: nodeU,
                    },
                ]);
            }
        }
    }
}
