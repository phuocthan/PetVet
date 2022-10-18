import PetData from "./Characters/PetData";

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

    @property(cc.JsonAsset)
    config: cc.JsonAsset = null;

    @property([cc.JsonAsset])
    levels: cc.JsonAsset[] = [];

    @property([StorePrefab])
    petPrefabs: StorePrefab[] = [];

    private _petConfigs: Map<string, PetData> = new Map();

    onLoad() {
        AssetManager._inst = this;
        this._parseConfig();
    }

    private _parseConfig(): void {
        const configJson = this.config.json;
        for (let petCfg of configJson.pets) {
            this._petConfigs.set(petCfg.id, petCfg);
        }
        // cc.warn(this._petConfigs);
    }

    start() {}

    public getLevelData(id: number): any {
        return this.levels[id].json;
    }

    public getPrefab(key: string): cc.Prefab {
        const pet = this.petPrefabs.find(x => x.id === key);
        return pet ? pet.prefab : null;
    }

    public getPetData(id: string): PetData {
        return this._petConfigs.get(id);
    }
}
