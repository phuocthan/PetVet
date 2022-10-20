import InteractiveObject, { InteractionType } from "../InteractiveObject";

const {ccclass, property} = cc._decorator;

@ccclass
export default class HurtScratch extends InteractiveObject {

    @property([cc.SpriteFrame])
    kemSprites: cc.SpriteFrame[] = [];

    /**
     * Start
     */
    start() {
        super.start();
    }
    /**
     * Get Interaction Type
     * @returns {InteractionType}
     */
    interactionType() {
        return InteractionType.Rug;
    }
    /**
     * Update
     * @param dt 
     */
    update(dt: number) {
        
    }
}
