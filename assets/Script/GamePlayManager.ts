import ScreenBase from './ScreenBase';
import ScreenManager from './ScreenManager';
import GameController from './GameController';
import AssetManager from './AssetManager';
import LevelData from './Levels/LevelData';
import PetController from './Characters/PetController';
import PetData from './Characters/PetData';
import { PetState } from './Characters/PetData';
import { RoomData } from './Levels/LevelData';
import ItemBoard from './Objects/ItemBoard';

const { ccclass, property } = cc._decorator;

@ccclass
export default class GamePlayManager extends ScreenBase {

    @property(ItemBoard)
    private itemBoard: ItemBoard = null;

    private _spawnPos: cc.Vec2 = null;
    private _petController: PetController = null;
    private _levelData: LevelData = null;
    private _rooms: RoomData[] = null;

    private _curRoomIdx: number = -1;

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
        const petData: PetData = AssetManager._inst.getPetData(petId);
        const petPrefab = AssetManager._inst.getPrefab(petId);
        const petNode = cc.instantiate(petPrefab);

        // spawn pet
        petNode.setPosition(this._spawnPos);
        this.node.addChild(petNode);
        this._petController = petNode.getComponent(PetController);
        this._petController.State = <PetState>roomData.petState;
        this._petController.load(petData);
        petNode.setSiblingIndex(1);

        // load items
        const items = roomData.items;
        const useItemType = roomData.useType;
        this.itemBoard.loadItems(items);
    }
}
