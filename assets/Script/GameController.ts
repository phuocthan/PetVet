import ScreenBase from "./ScreenBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameController extends ScreenBase {

    public static _inst: GameController = null;

    onLoad() {
        GameController._inst = this;
        
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;
    }

    public currZone = -1;
    public currLevel  = -1;
}
