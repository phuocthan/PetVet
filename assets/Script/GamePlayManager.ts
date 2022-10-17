import ScreenBase from "./ScreenBase";
import ScreenManager from "./ScreenManager";
import GameController from './GameController';
import AssetManager from "./AssetManager";
import LevelData from './Levels/LevelData';
import PetController from './Characters/PetController';

const { ccclass, property } = cc._decorator;

@ccclass
export default class GamePlayManager extends ScreenBase {

    show() {
        super.show();
        const curLevel = GameController._inst.curLevel;
        const rawLevelCfg = AssetManager._inst.getLevelData(curLevel);
        const levelCfg: LevelData = LevelData.parseFrom(rawLevelCfg);
        const petCfg = AssetManager._inst.getPetData(levelCfg.petId);

        const petCtrl = this.getComponentInChildren(PetController);
        petCtrl.load(petCfg)
    }

    hide() {
        super.hide();

    }

    onClickSelectLevelBtn() {
        ScreenManager._inst.gotoLevelSelection();
    }
}
