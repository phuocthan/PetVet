const {ccclass, property} = cc._decorator;

export enum InteractionType {
    Rug,
    Drag
}

@ccclass
export default class InteractiveObject extends cc.Component {   
    @property(cc.CircleCollider)
    collider: cc.CircleCollider = null;
    /**
     * Start
     */
    start() {
        this.collider.node.on(cc.Node.EventType.TOUCH_START, (touch, event) => {
            // return the touch point with world coordinates
            let touchLoc = touch.getLocation();
            // https://docs.cocos.com/creator/api/en/classes/Intersection.html Intersection
            const radius = this.collider.radius;
            const pos = this.node.convertToWorldSpaceAR(cc.v2(0, 0));
            if (cc.Intersection.circleCircle({position: touchLoc, radius: 1}, {position: pos, radius: radius})) {
                console.log("Hit!");
            }
            else {
                console.log("No hit");
            }
        }, this);
    
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
