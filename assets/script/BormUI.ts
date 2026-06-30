import { _decorator, Component, Label } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('BormUI')
export class BormUI extends Component {
    @property(Label)
    numberLabel:Label=null;

    start() {

    }
    update(deltaTime: number) {
        this.numberLabel.string = GameManager.getInstance().bombNumber.toString();
    }
}


