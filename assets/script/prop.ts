import { _decorator, Component ,Node} from 'cc';
const { ccclass, property } = _decorator;
export enum propType{
    zreoShoot,
    OneShoot
}

@ccclass('prop')
export class prop extends Component {
@property
speed:number=100;

public isProcessed:boolean=false;

@property
proptype:propType=propType.OneShoot;
    start() {
        
    }

    update(deltaTime: number) {
       const p =this.node.position;
        this.node.setPosition(p.x,p.y-deltaTime*this.speed) 
    }
}


