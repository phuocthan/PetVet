import Utils from '../Utils';
import PetData from './PetData';
const {ccclass, property} = cc._decorator;

@ccclass
export default class PetController extends cc.Component {

    @property(sp.Skeleton)
    skeleton: sp.Skeleton = null;

    @property(cc.Prefab)
    tumorPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    thornPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    scratchPrefab: cc.Prefab = null;

    private _petData: PetData = null;

    onLoad () {
    }

    start () {

    }

    public load(data: PetData): void {
        this._petData = data;
        this._spawnHurtPoints(data.hurts.tumors, this.tumorPrefab)
        this._spawnHurtPoints(data.hurts.thorns, this.thornPrefab)
        this._spawnHurtPoints(data.hurts.scratch, this.scratchPrefab)
    }

    private _spawnHurtPoints(bones: string[], prefab: cc.Prefab): void {
        bones.forEach(boneName => {
            const nodeU = cc.instantiate(prefab);
            nodeU.angle = -90;
            Utils.attachNodeToSpineBone(this.skeleton.node, boneName, nodeU);
        });
    }
}
