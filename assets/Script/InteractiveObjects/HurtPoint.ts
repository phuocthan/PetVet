import DragableItem from '../Items/DragableItem';
import InteractiveObject, { InteractionType } from './InteractiveObject';

const { ccclass, property } = cc._decorator;

@ccclass
export default class HurtPoint extends InteractiveObject {
    @property(cc.String)
    targetItemType: string = '';

    onFinish: () => void = null;

    start() {
        super.start();
    }

    protected isValidTarget(type: string): boolean {
        return this.targetItemType === type;
    }

    protected onHitDraggableItem(item: DragableItem): void {
        switch (this.targetItemType) {
            case 'TWEEZERS':
                this.node.active = false;
                this.onFinish && this.onFinish();
                break;
            case 'ICE_BAG':
                // stick on position
                const originItemParent = item.node.parent;
                item.stickToMode = true;
                item.getComponent(cc.Collider).enabled = false;
                // cc.warn(`Hurt pos ${this.node.parent.getPosition()}, item pos ${item.node.getPosition()}`);
                item.node.parent = this.node;
                item.node.setPosition(this.node.getPosition().add(cc.v2(0, 5)));
                this.scheduleOnce(() => {
                    this.node.active = false;
                    item.node.parent = originItemParent;
                    item.restoreOriginalPosition();
                    item.getComponent(cc.Collider).enabled = true;
                }, 2);
                this.onFinish && this.onFinish();
                break;
            case 'TOPICAL':
                this.node.active = false;
                this.onFinish && this.onFinish();
                break;
        }
    }
}
