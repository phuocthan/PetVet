const { ccclass, property } = cc._decorator;

export enum ItemState {
    Idle,
    Inactive,
    Holding,
    Active,
    Used
}

export enum InteractionType {
    Click,
    Drag,
}

@ccclass
export default class BaseItem extends cc.Component {
    @property(cc.String)
    itemType: string = "";
    
    protected _originPos: cc.Vec3 = null;

    onLoad() {
        this.savePosition();
    }

    start() {
        this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_END, (touch: cc.Event.EventTouch) => {
            this._onTouchEnd(touch, false)
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, (touch: cc.Event.EventTouch) => {
            this._onTouchEnd(touch, true)
        }, this);
    }

    protected _onTouchStart(touch: cc.Event.EventTouch) {
        // cc.warn(`TouchStart: ${this.itemType}`);
    }

    protected _onTouchMove(touch: cc.Event.EventTouch) {
        // cc.warn(`TouchMove: ${this.itemType}`);
    }

    protected _onTouchEnd(touch: cc.Event.EventTouch, isCancel: boolean) {
        // cc.warn(`TouchEnd: ${this.itemType}, ${isCancel}`);
    }
    
    public savePosition() {
        this._originPos = this.node.position.clone();
    }
    
    public restorePosition() {
        this.node.setPosition(this._originPos);
    }
}