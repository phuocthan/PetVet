const {ccclass, property} = cc._decorator;

export enum DragableItemState {
    Idle,
    Inactive,
    Holding,
    Active,
    Used
}

@ccclass
export default class DragableItem extends cc.Component {
    @property()
    itemType: string = "";

    public currentState: DragableItemState = DragableItemState.Inactive;
    /**
     * Start
     */
    start() {
        this.node.on(cc.Node.EventType.TOUCH_START, (touch, event) => {
            // return the touch point with world coordinates
            
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, (touch, event) => {
            // return the touch point with world coordinates
            
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_END, (touch, event) => {
            // return the touch point with world coordinates
            
        }, this);
    }
    /**
     * Update
     * @param dt 
     */
    update(dt: number) {
        
    }
}
