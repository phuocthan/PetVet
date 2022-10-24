import InteractiveObject, { InteractionType } from "./InteractiveObject";

const {ccclass, property} = cc._decorator;

@ccclass
export default class HurtPoint extends InteractiveObject {

    @property(cc.String)
    targetItemType: string = '';

    start () {
        super.start();
    }
    
    protected isValidTarget(type: string): boolean {
        return this.targetItemType === type;
    }
}
