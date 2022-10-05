import ScreenBase from "./ScreenBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameController extends ScreenBase {


    public static _inst: GameController = null;

    onLoad() {
        GameController._inst = this;
    }

    public currZone = -1;
    public currLevel  = -1;
}
