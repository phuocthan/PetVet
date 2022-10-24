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

    @property({ type: cc.Enum(InteractionType) })
    interactionType: InteractionType = InteractionType.Drag;

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
        const hitItem: DraggableItem = target.getComponent(DraggableItem);
        if (!hitItem) return;
        if (!this.isValidTarget(hitItem.itemType)) return;
        cc.log('on collision enter', hitItem.itemType);
    }

    /**
     * On Collision Stay
     * @param target 
     * @param self 
     */
    onCollisionStay(target: cc.Collider, self: cc.Collider) {
        const hitItem: DraggableItem = target.getComponent(DraggableItem);
        if (!hitItem) return;
        if (!this.isValidTarget(hitItem.itemType)) return;
        switch (this.interactionType) {
        case InteractionType.Rug: 
            if (Date.now() - this._delayTime <= InteractiveConfig.rugDelayTime) break;
            const lastPosition = this.lastDraggableItemPosition() || hitItem.node.position;
            const delta = hitItem.node.position.sub(lastPosition);
            const mag = delta.mag();
            if (mag >= InteractiveConfig.rugTriggerValue) {
                console.log("OK");
                this._delayTime = Date.now();
            }
            this.saveLastDraggableItemPosition(hitItem);
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
     * Update
     * @param dt 
     */
    update(dt: number) {
        
    }

    protected isValidTarget(type: string): boolean {
        return true;
    }
}
