export default  class Utils {
    /**
     *  attach a node to spine Bone
     */
    public static attachNodeToSpineBone(animNode: cc.Node, bone: string, mustAddNode: cc.Node) {
        if (!animNode) {
            return;
        }
        const skeleton: sp.Skeleton = animNode.getComponent(sp.Skeleton);
        if (skeleton) {
            //@ts-ignore
            let attachUtil = skeleton.attachUtil;
            let boneNodes = attachUtil.generateAttachedNodes(bone); //get the bone using the bone name
            let boneNode = (boneNodes && boneNodes[0]) || null;
            boneNode && boneNode.addChild(mustAddNode);
        }
    }
}
