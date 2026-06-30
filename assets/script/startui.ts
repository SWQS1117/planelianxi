import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('startui')
export class startui extends Component {
    start() {

    }
    
    update(deltaTime: number) {
        
    }
    onStartButtonClick(){
        director.loadScene('game')
    }
}


