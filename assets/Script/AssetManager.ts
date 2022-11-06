const { ccclass, property } = cc._decorator;

@ccclass('StorePrefab')
export class StorePrefab {
    @property(cc.String)
    id: string = '';

    @property(cc.Prefab)
    prefab: cc.Prefab = null;
}

@ccclass
export default class AssetManager extends cc.Component {
    public static _inst: AssetManager = null;

    @property([cc.JsonAsset])
    levels: cc.JsonAsset[] = [];

    @property([StorePrefab])
    petPool: StorePrefab[] = [];

    @property([StorePrefab])
    itemPool: StorePrefab[] = [];

    onLoad() {
        AssetManager._inst = this;
    }

    start() {}

    public getLevelData(id: number): any {
        return this.levels[id].json;
    }

    public getPrefab(key: string): cc.Prefab {
        const prefab = this.petPool.find(x => x.id === key);
        return prefab ? prefab.prefab : null;
    }

    public getItemPrefab(key: string): cc.Prefab {
        const prefab = this.itemPool.find(x => x.id === key);
        return prefab ? prefab.prefab : null;
    }
}
