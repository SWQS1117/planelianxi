import { _decorator, Component, Label, Node } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('scoreUI')
export class scoreUI extends Component {
    @property(Label)
    scoreLable:Label=null;
    start() {
     
    }

    update(deltaTime: number) {
        this.scoreLable.string=GameManager.getInstance().score.toString();
    }
}


