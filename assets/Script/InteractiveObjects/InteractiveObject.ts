const {ccclass, property} = cc._decorator;

export enum InteractionType {
    Rug,
    Drag
}

@ccclass
export default class InteractiveObject extends cc.Component {
    
    public interactionType: InteractionType = InteractionType.Drag;
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
