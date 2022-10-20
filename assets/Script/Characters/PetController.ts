import AssetManager from '../AssetManager';
import Utils from '../Utils';
import PetData from './PetData';
import { AttachBone } from './PetData';
const {ccclass, property} = cc._decorator;

@ccclass
export default class PetController extends cc.Component {

    @property(sp.Skeleton)
    skeleton: sp.Skeleton = null;

    private _petData: PetData = null;

    onLoad () {
    }

    start () {

    }

    public load(data: PetData): void {
        this._petData = data;
        for(let type of Object.keys(data.hurts)) {
            const bones = data.hurts[type];
            const prefab = AssetManager._inst.getItemPrefab(type);
            this._spawnHurtPoints(bones, prefab)
        }
    }

    private _spawnHurtPoints(bones: AttachBone[], prefab: cc.Prefab): void {
        bones.forEach(attachPoint => {
            const nodeU = cc.instantiate(prefab);
            nodeU.angle = attachPoint?.angle || 0;
            Utils.attachNodeToSpineBone(this.skeleton.node, attachPoint.bone, nodeU);
        });
    }
}
