import { AnimationData } from '../Levels/LevelData';
import Utils from '../Utils';
const { ccclass, property } = cc._decorator;

export type AnimalState = 'IDLE_FUN' | 'IDLE_SAD' | 'FUN' | 'EAT';

@ccclass
export default class PetController extends cc.Component {
    @property(sp.Skeleton)
    skeleton: sp.Skeleton = null;

    private _state: AnimalState;
    private _animations: AnimationData = null;
    private _hurtMap: Map<string, cc.Node[]>;

    onLoad() {
        this._hurtMap = new Map();
    }

    start() {}

    public loadAnimations(animConfig: AnimationData): void {
        this._animations = animConfig;
    }

    public getHurtPoints(type: string): cc.Node[] {
        return this._hurtMap.get(type);
    }

    private _getAnim(): string {
        switch (this._state) {
            case 'IDLE_SAD':
                return this._animations.idle[0];
            case 'IDLE_FUN':
                return this._animations.idle[1];
            case 'FUN':
                return Utils.getRandomItem(this._animations.fun);
            case 'EAT':
                return Utils.getRandomItem(this._animations.eat);
        }
    }

    public get State(): AnimalState {
        return this._state;
    }

    public set State(value: AnimalState) {
        this._state = value;
    }

    public updateAnim(): void {
        this.skeleton.setAnimation(0, this._getAnim(), true);
    }

    public playAnimFunny(): number {
        this.State = 'FUN';
        const animFun = Utils.getRandomItem(this._animations.fun);
        const animIdle = this._animations.idle[1];
        this.skeleton.setAnimation(0, animFun, false);
        this.skeleton.addAnimation(0, animIdle, true);
        const animTime = Utils.getAnimDuration(this.skeleton, animFun) + Utils.getAnimDuration(this.skeleton, animIdle);
        return animTime;
    }
}
