import AssetManager from '../AssetManager';
import { TargetData } from '../Levels/LevelData';

const { ccclass, property } = cc._decorator;

@ccclass
export default class ItemBoard extends cc.Component {
    @property(cc.Integer)
    displayItems: number = 3;

    @property([cc.Node])
    slots: cc.Node[] = [];

    private _itemIds: TargetData[];
    private _items: cc.Node[] = [];

    start() {}

    public loadItems(ids: TargetData[]) {
        let addSlotIdx = 0;
        ids.forEach((target, idx) => {
            const itemPrefab = AssetManager._inst.getItemPrefab(target.item);
            const itemNode = cc.instantiate(itemPrefab);
            this.slots[addSlotIdx].addChild(itemNode);
            itemNode.active = idx < this.displayItems;
            addSlotIdx = addSlotIdx >= this.displayItems - 1 ? 0 : addSlotIdx + 1;
            this._items[idx] = itemNode;
        });
        this._itemIds = ids;
    }

    public clear() {
        this._itemIds.length = 0;
        this._items.length = 0;
        this.slots.forEach(slot => slot.removeAllChildren());
    }
}
