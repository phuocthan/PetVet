import InteractiveObject from "../InteractiveObjects/InteractiveObject";

const { ccclass, property } = cc._decorator;

export enum DragableItemState {
    Idle,
    Inactive,
    Holding,
    Active,
    Used
}

@ccclass
export default class DragableItem extends cc.Component {
    /**
     * Property Declaration
     */
    @property()
    itemType: string = "";

    public _currentState: DragableItemState = DragableItemState.Inactive;

    protected _originalPosition: cc.Vec3 = null;
    /**
     * On Load
     */
    onLoad() {
        this.initOriginalPosition();
    }
    /**
     * Start
     */
    start() {
        this.node.on(cc.Node.EventType.TOUCH_START, (touch: cc.Event.EventTouch) => {
            this.setState(DragableItemState.Holding);
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, (touch: cc.Event.EventTouch) => {
            const position = this.node.position.clone();
            const delta = touch.getDelta();
            position.x += delta.x;
            position.y += delta.y;
            this.node.setPosition(position);
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_END, (touch: cc.Event.EventTouch) => {
            this.setState(DragableItemState.Idle);
            this.restoreOriginalPosition();
        }, this);
    }
    /**
     * Init item original position
     */
    initOriginalPosition() {
        this._originalPosition = this.node.position.clone();
    }
    /**
     * Restore to original position
     */
    restoreOriginalPosition() {
        this.node.setPosition(this._originalPosition);
    }
    /**
     * Set state of current dragable item
     * @param state 
     */
    setState(state: DragableItemState) {
        this._currentState = state;
    }
    /**
     * Update
     * @param dt 
     */
    update(dt: number) {

    }
}
