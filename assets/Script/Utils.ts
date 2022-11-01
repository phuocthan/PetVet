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

    public static randomRange(min: number, max: number, int: boolean = false) {
        const delta = max - min;
        const rnd = Math.random();
        let result = min + rnd * delta;

        if (int) {
            result = Math.round(result);
        }

        return result;
    }

    public static getRandomItem<T>(arr: T[]): T {
        return arr[this.randomRange(0, arr.length - 1, true)];
    }

    public static waitForSeconds(delayTime: number, context: cc.Component): Promise<void> {
        return new Promise<void>((resolve) => {
            context.scheduleOnce(resolve.bind(context), delayTime);
        });
    }

    public static getAnimDuration(ske: sp.Skeleton, animName: string): number {
        const anim: sp.spine.Animation = ske ? ske.findAnimation(animName) : null;
        return anim ? anim.duration : 0.0;
    }
}
