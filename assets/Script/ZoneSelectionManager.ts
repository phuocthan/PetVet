import GameController from "./GameController";
import ScreenBase from "./ScreenBase";
import ScreenManager from "./ScreenManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ZoneSelectionManager extends ScreenBase {

    private _curPage = 0;
    
    show() {
        super.show();

    }

    hide() {
        super.hide();

    }

    onClickZoneItem(event, customEventData) {
        const zoneSelection = parseInt(customEventData);
        GameController._inst.currZone = zoneSelection;
        GameController._inst.currLevel = -1;
        ScreenManager._inst.gotoLevelSelection();
    }

    onClickHomeBtn() {
        ScreenManager._inst.gotoMainMenu();
    }

    onClickShopBtn() {
        
    }

    onClickLeftBtn() {
        
    }

    onClickRighBtn() {
        
    }

    showPage() {

    }

    updatePageArrowStatus() {

    }
}
