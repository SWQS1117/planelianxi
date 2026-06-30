import { _decorator, Component, instantiate, Node, Prefab, RigidBody2D, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('bullet')
export class bullet extends Component {
   
    @property
    speed:number=200;

    start() {
        const rb=this.getComponent(RigidBody2D);
        if (rb) {
            rb.linearVelocity=new Vec2(0,this.speed)
        }
    }

    update(deltaTime: number) {
        
        if (this.node.position.y>714) {
            this.node.destroy()
        }

    }
}


