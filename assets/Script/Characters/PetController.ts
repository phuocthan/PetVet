import Utils from '../Utils';
import PetData from './PetData';
import { PetState } from './PetData';
const { ccclass, property } = cc._decorator;

@ccclass
export default class PetController extends cc.Component {
    @property(sp.Skeleton)
    skeleton: sp.Skeleton = null;

    private _state: PetState;
    private _data: PetData = null;
    private _hurtMap: Map<string, cc.Node[]>;

    onLoad() {
        this._hurtMap = new Map();
    }

    start() {}

    public load(data: PetData): void {
        this._data = data;
    }

    public getHurtPoints(type: string): cc.Node[] {
        return this._hurtMap.get(type);
    }

    private _getAnim(): string {
        switch (this._state) {
            case 'IDLE_SAD':
                return this._data.animations.idle[0];
            case 'IDLE_FUN':
                return this._data.animations.idle[1];
            case 'FUN':
                return Utils.getRandomItem(this._data.animations.fun);
            case 'EAT':
                return Utils.getRandomItem(this._data.animations.eat);
        }
    }

    public get State(): PetState {
        return this._state;
    }

    public set State(value: PetState) {
        this._state = value;
    }

    public updateAnim(): void {
        this.skeleton.setAnimation(0, this._getAnim(), true);
    }

    public playAnimFunny(): number {
        this.State = 'FUN';
        const animFun = Utils.getRandomItem(this._data.animations.fun);
        const animIdle = this._data.animations.idle[1];
        this.skeleton.setAnimation(0, animFun, false);
        this.skeleton.addAnimation(0, animIdle, true);
        const animTime = Utils.getAnimDuration(this.skeleton, animFun) + Utils.getAnimDuration(this.skeleton, animIdle);
        return animTime;
    }
}
