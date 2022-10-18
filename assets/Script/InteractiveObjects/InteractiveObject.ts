import DragableItem from "../Items/DragableItem";

const {ccclass, property} = cc._decorator;

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

    protected _lastDragableItemPosition: cc.Vec3 = null;
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
        const dragableItem: DragableItem = target.getComponent(DragableItem);
        if (!dragableItem) return;
        console.log('on collision enter', dragableItem.itemType);
    }
    /**
     * On Collision Stay
     * @param target 
     * @param self 
     */
    onCollisionStay(target: cc.Collider, self: cc.Collider) {
        const dragableItem: DragableItem = target.getComponent(DragableItem);
        if (!dragableItem) return;
        console.log('on collision stay', dragableItem.itemType);
        // if (this.interactionType())
        const lastPosition = this.lastDragableItemPosition() || dragableItem.node.position;
        const delta = this.node.position.sub(lastPosition);
        this.saveLastDragableItemPosition(dragableItem);
    }
    /**
     * Get Last Dragable Item Position
     */
    lastDragableItemPosition(): cc.Vec3 {
        return this._lastDragableItemPosition;
    }
    private saveLastDragableItemPosition(dragableItem: DragableItem) {
        this._lastDragableItemPosition = dragableItem.node.position.clone();
    }
    /**
     * On Collision Exit
     * @param target 
     * @param self 
     */
    onCollisionExit(target: cc.Collider, self: cc.Collider) {
        console.log('on collision exit');
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
