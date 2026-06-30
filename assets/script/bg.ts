import { _decorator, Component, Input, input, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('bg')
export class bg extends Component {
    @property(Node)
    bg1:Node=null;
    @property(Node)
    bg2:Node=null;
    @property
    speed:number=100;

    start() {

    }

    update(deltaTime: number) {
       const bg1p = this.bg1.position;
       this.bg1.setPosition(bg1p.x, bg1p.y - deltaTime * this.speed, bg1p.z);

       const bg2p = this.bg2.position;
       this.bg2.setPosition(bg2p.x, bg2p.y - deltaTime * this.speed, bg2p.z);

       if (bg1p.y < -852) {
           const bg2p = this.bg2.position;
           this.bg1.setPosition(bg2p.x, bg2p.y + 852, bg2p.z);
       }
       if (bg2p.y < -852) {
           const bg1p = this.bg1.position;
           this.bg2.setPosition(bg1p.x, bg1p.y + 852, bg1p.z);
       }
    }
}


