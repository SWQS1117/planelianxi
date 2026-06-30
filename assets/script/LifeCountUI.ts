import { _decorator, Component, Label, Node } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('LifeCountUI')
export class LifeCountUI extends Component {
    @property(Label)
    LifeCountLabel:Label=null;

    start() {

    }

    update(deltaTime: number) {
       this.LifeCountLabel.string= GameManager.getInstance().lifeNumber.toString();
    }
}


