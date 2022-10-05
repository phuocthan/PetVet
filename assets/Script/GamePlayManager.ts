import ScreenBase from "./ScreenBase";
import ScreenManager from "./ScreenManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GamePlayManager extends ScreenBase {

    show() {
        super.show();

    }

    hide() {
        super.hide();

    }

    onClickSelectLevelBtn() {
        ScreenManager._inst.gotoLevelSelection();
    }
}
