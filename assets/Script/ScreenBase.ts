const {ccclass, property} = cc._decorator;
export enum SCREEN_ID {
    MAINMENU,
    ZONE_SELECTION,
    LEVEL_SELECTION,
    GAMEPLAY,
    COUNT
}

@ccclass
export default class ScreenBase extends cc.Component {

    show() {
        // do something later
    }

    hide() {
        // do something later
    }
}
