import AssetManager from '../AssetManager';

const { ccclass, property } = cc._decorator;

@ccclass
export default class ItemBoard extends cc.Component {
    @property(cc.Integer)
    displayItems: number = 3;

    @property([cc.Node])
    slots: cc.Node[] = [];

    private _itemIds: string[];
    private _items: cc.Node[] = [];

    start() {}

    public loadItems(ids: string[]) {
        let addSlotIdx = 0;
        ids.forEach((itemId, idx) => {
            const itemPrefab = AssetManager._inst.getItemPrefab(itemId);
            const itemNode = cc.instantiate(itemPrefab);
            this.slots[addSlotIdx].addChild(itemNode);
            itemNode.active = idx < this.displayItems;
            addSlotIdx = addSlotIdx >= this.displayItems - 1 ? 0 : addSlotIdx + 1;
            this._items[idx] = itemNode;
        });
        this._itemIds = ids;
    }
}
