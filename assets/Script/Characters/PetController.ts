const {ccclass, property} = cc._decorator;

@ccclass
export default class PetController extends cc.Component {

    @property(sp.Skeleton)
    skeleton: sp.Skeleton = null;

    onLoad () {
        const slot: sp.spine.Bone = this.skeleton.findBone('gai_1');
    }

    start () {

    }
}
