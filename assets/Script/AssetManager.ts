const {ccclass, property} = cc._decorator;

@ccclass
export default class AssetManager extends cc.Component {

    @property(cc.JsonAsset)
    pets: cc.JsonAsset = null;

    @property([cc.JsonAsset])
    levels: cc.JsonAsset[] = [];

    // onLoad () {}

    start () {
        
    }

    // update (dt) {}
}
