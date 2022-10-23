import ScreenBase from './ScreenBase';
import ScreenManager from './ScreenManager';
import GameController from './GameController';
import AssetManager from './AssetManager';
import LevelData from './Levels/LevelData';
import PetController from './Characters/PetController';
import PetData from './Characters/PetData';
import { PetState } from './Characters/PetData';

const { ccclass, property } = cc._decorator;

@ccclass
export default class GamePlayManager extends ScreenBase {
    private _spawnPos: cc.Vec2 = null;
    private _petController: PetController = null;
    private _levelData: LevelData = null;

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
        const petData: PetData = AssetManager._inst.getPetData(levelData.petId);
        const petPrefab = AssetManager._inst.getPrefab(levelData.petId);
        const petNode = cc.instantiate(petPrefab);

        this._levelData = levelData;
        // spawn pet
        petNode.setPosition(this._spawnPos);
        this.node.addChild(petNode);
        this._petController = petNode.getComponent(PetController);
        this._petController.State = <PetState>levelData.rooms[0].petState;
        this._petController.load(petData);
        petNode.setSiblingIndex(1);
    }

    hide() {
        super.hide();
    }

    onClickSelectLevelBtn() {
        ScreenManager._inst.gotoLevelSelection();
    }
}
