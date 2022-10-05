import ScreenBase from "./ScreenBase";
import ScreenManager from "./ScreenManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MainMenuManager extends ScreenBase {

    show() {
        super.show();

    }

    hide() {
        super.hide();

    }

    onClickPlayBtn() {
        ScreenManager._inst.gotoZoneSelection();
    }
}
