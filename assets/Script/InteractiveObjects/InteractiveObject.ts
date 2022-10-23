import DraggableItem from "../Items/DragableItem";

const {ccclass, property} = cc._decorator;

const InteractiveConfig = {
    rugTriggerValue: 4.0,
    rugDelayTime: 300
}

export enum InteractionType {
    Rug,
    Drag
}

@ccclass
export default class InteractiveObject extends cc.Component {   
    /**
     * Property Declaration
     */
    @property(cc.CircleCollider)
    collider: cc.CircleCollider = null;

    protected _lastDraggableItemPosition: cc.Vec3 = null;
    private _delayTime: number = 0;

    /**
     * Start
     */
    start() {
        
    }
    /**
     * On Collision Enter
     * @param target 
     * @param self 
     */
    onCollisionEnter(target: cc.Collider, self: cc.Collider) {
        const draggableItem: DraggableItem = target.getComponent(DraggableItem);
        if (!draggableItem) return;
        // console.log('on collision enter', dragableItem.itemType);
    }
    /**
     * On Collision Stay
     * @param target 
     * @param self 
     */
    onCollisionStay(target: cc.Collider, self: cc.Collider) {
        const draggableItem: DraggableItem = target.getComponent(DraggableItem);
        if (!draggableItem) return;
        switch (this.interactionType()) {
        case InteractionType.Rug: 
            if (Date.now() - this._delayTime <= InteractiveConfig.rugDelayTime) break;
            const lastPosition = this.lastDraggableItemPosition() || draggableItem.node.position;
            const delta = draggableItem.node.position.sub(lastPosition);
            const mag = delta.mag();
            if (mag >= InteractiveConfig.rugTriggerValue) {
                console.log("OK");
                this._delayTime = Date.now();
            }
            this.saveLastDraggableItemPosition(draggableItem);
            break;
        }
        
    }
    /**
     * Get Last Dragable Item Position
     */
    lastDraggableItemPosition(): cc.Vec3 {
        return this._lastDraggableItemPosition;
    }
    private saveLastDraggableItemPosition(draggableItem: DraggableItem) {
        this._lastDraggableItemPosition = draggableItem.node.position.clone();
    }
    /**
     * On Collision Exit
     * @param target 
     * @param self 
     */
    onCollisionExit(target: cc.Collider, self: cc.Collider) {
        // console.log('on collision exit');
    }
    /**
     * Get Interaction Type
     * @returns {InteractionType}
     */
    interactionType() {
        return InteractionType.Drag;
    }
    /**
     * Update
     * @param dt 
     */
    update(dt: number) {
        
    }
}
