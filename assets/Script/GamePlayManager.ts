import ScreenBase from "./ScreenBase";
import ScreenManager from "./ScreenManager";
import GameController from './GameController';
import AssetManager from "./AssetManager";
import LevelData from './Levels/LevelData';

const { ccclass, property } = cc._decorator;

@ccclass
export default class GamePlayManager extends ScreenBase {

    show() {
        super.show();
        const curLevel = GameController._inst.curLevel;
        const levelCfg = AssetManager._inst.getLevelData(curLevel);

        cc.warn(LevelData.parseFrom(levelCfg));
    }

    hide() {
        super.hide();

    }

    onClickSelectLevelBtn() {
        ScreenManager._inst.gotoLevelSelection();
    }
}
