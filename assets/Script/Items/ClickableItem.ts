import BaseItem from './BaseItem';

const { ccclass, property } = cc._decorator;

@ccclass
export default class ClickableItem extends BaseItem {
    protected _onTouchStart(touch: cc.Event.EventTouch): void {
        this.node.active = false;
    }

    protected _onTouchMove(touch: cc.Event.EventTouch): void {
        
    }

    protected _onTouchEnd(touch: cc.Event.EventTouch, isCancel: boolean): void {
        
    }
}
