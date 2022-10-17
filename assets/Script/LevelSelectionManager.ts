import GameController from "./GameController";
import ScreenBase from "./ScreenBase";
import ScreenManager from "./ScreenManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LevelSelectionManager extends ScreenBase {

    show() {
        super.show();

    }

    hide() {
        super.hide();

    }

    onClickLevelItem(event, customEventData) {
        const levelSelection = parseInt(customEventData);
        GameController._inst.curLevel = levelSelection;
        ScreenManager._inst.gotoGamePlay();
    }
}
