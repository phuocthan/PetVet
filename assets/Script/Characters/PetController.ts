import Utils from '../Utils';
const {ccclass, property} = cc._decorator;

@ccclass('PetAnimations')
export class PetAnimations {
    @property([cc.String])
    idle: string[] = [];

    @property([cc.String])
    eat: string[] = [];

    @property([cc.String])
    fun: string[] = [];
}

@ccclass('PetBones')
export class PetBones {
    @property([cc.String])
    tumors: string[] = [];

    @property([cc.String])
    thorns: string[] = [];

    @property([cc.String])
    scratch: string[] = [];
}

@ccclass
export default class PetController extends cc.Component {

    @property(sp.Skeleton)
    skeleton: sp.Skeleton = null;

    @property(PetAnimations)
    animations: PetAnimations = new PetAnimations();

    @property(PetBones)
    bones: PetBones = new PetBones();

    @property(cc.Prefab)
    tumorPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    thornPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    scratchPrefab: cc.Prefab = null;

    onLoad () {
        this.bones.tumors.forEach(boneName => {
            const nodeU = cc.instantiate(this.tumorPrefab);
            nodeU.angle = -90;
            Utils.attachNodeToSpineBone(this.skeleton.node, boneName, nodeU);
        });
        this.bones.thorns.forEach(boneName => {
            const nodeU = cc.instantiate(this.thornPrefab);
            nodeU.angle = -90;
            Utils.attachNodeToSpineBone(this.skeleton.node, boneName, nodeU);
        });
        this.bones.scratch.forEach(boneName => {
            const nodeU = cc.instantiate(this.scratchPrefab);
            nodeU.angle = -90;
            Utils.attachNodeToSpineBone(this.skeleton.node, boneName, nodeU);
        });
    }

    start () {

    }
}
