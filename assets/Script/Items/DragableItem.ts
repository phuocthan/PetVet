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

    public currentState: DragableItemState = DragableItemState.Inactive;
    /**
     * Start
     */
    start() {

    }
    /**
     * Update
     * @param dt 
     */
    update(dt: number) {
        
    }
}
