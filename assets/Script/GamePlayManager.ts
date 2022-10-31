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
        const levelData: LevelData = LevelData.parseFrom(rawLevelData);

        this._levelData = levelData;
        this._rooms = levelData.rooms;
        this._loadRooms();
    }

    hide() {
        super.hide();
    }

    onClickSelectLevelBtn() {
        ScreenManager._inst.gotoLevelSelection();
    }

    private _loadRooms() {
        this._curRoomIdx = 0;
        const roomData = this._rooms[this._curRoomIdx];
        const petId = this._levelData.petId;
        const petData = AssetManager._inst.getPetData(petId);
        const petPrefab = AssetManager._inst.getPrefab(petId);
        const petNode = cc.instantiate(petPrefab);

        // spawn pet
        petNode.setPosition(this._spawnPos);
        this.node.addChild(petNode);
        this._petCtrl = petNode.getComponent(PetController);
        this._petCtrl.State = <PetState>roomData.petState;
        this._petCtrl.load(petData);

        this._roomTargets.clear();
        this._loadTargets(this._petCtrl.skeleton.node, petData);

        // load items
        const items = roomData.items;
        const useItemType = roomData.useType;
        this.itemBoard.loadItems(items);
        petNode.setSiblingIndex(1);
        this._numberOfTargets = 0;
        items.forEach((item) => {
            this._targetBones.get(item).forEach((target) => {
                if (target.attachNode) {
                    target.attachNode.active = true;
                    const hurtPoint = target.attachNode.getComponent(HurtPoint);
                    this._numberOfTargets++;
                    hurtPoint.onFinish = () => {
                        if (++this._finishedTargets >= this._numberOfTargets) {
                            cc.warn('End room!');
                            this._petCtrl.playAnimFunny();
                        }
                        cc.warn(`Room state: ${this._finishedTargets}/${this._numberOfTargets}`);
                    };
                }
            });
        });
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
