import Utils from '../Utils';
const {ccclass, property} = cc._decorator;

@ccclass('FrameConfig')
class FrameConfig {
    @property(cc.SpriteFrame)
    frame: cc.SpriteFrame = null;

    @property(cc.Vec2)
    offset: cc.Vec2 = cc.v2(0, 0);
}

@ccclass
export default class RandomSpriteFrame extends cc.Component {

    @property(cc.Sprite)
    sprite: cc.Sprite = null;

    @property([FrameConfig])
    frames: FrameConfig[] = [];

    onLoad () {
        const frameConfig: FrameConfig = this._getRandomFrame();
        this.sprite.spriteFrame = frameConfig.frame;
        this.sprite.node.setPosition(frameConfig.offset);
    }

    start () {

    }

    private _getRandomFrame(): FrameConfig {
        const randIdx = Utils.randomRange(0, this.frames.length - 1, true);
        return this.frames[randIdx];
    }
}
