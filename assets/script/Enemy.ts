import { _decorator, Animation, animation, CCString, Collider2D, Component, Contact2DType, IPhysics2DContact, Node, sp } from 'cc';
import { GameManager } from './GameManager';
import { audioManager } from './audioManager';
const { ccclass, property } = _decorator;

@ccclass('Enemy')
export class Enemy extends Component {
    @property
    speed:number=200;
    @property(Animation)
    anim:Animation=null;
    @property
    hp:number=1;

    @property(CCString)
    animHit:string="";
    @property(CCString)
    animDown:string="";

    @property
    score:number=100;

    private isDead:boolean=false;
    private collider: Collider2D | null = null;

    start() {

     this.collider = this.getComponent(Collider2D);

     if (this.collider) {
        this.collider.on(Contact2DType.BEGIN_CONTACT,this.Oncollider,this)
     }
    }
    Oncollider(self:Collider2D,other:Collider2D,Contact2DType:IPhysics2DContact){
        if (this.isDead) { return }
        this.hp--;

        if (this.hp>0) {
            if (this.animHit) { this.anim.play(this.animHit); }
        }
        else{
            this.isDead=true;
            GameManager.getInstance().addscore(this.score);
            audioManager.getInstance().playSound(audioManager.getInstance().boomClip);
           this.anim.play(this.animDown);
           this.anim.once(Animation.EventType.FINISHED,()=>{
            this.node.destroy()})
        }

        if (other&&other.node.name!=='hero1') {
          
            const target = other.node;
            this.scheduleOnce(() => {
                if (target && target.isValid) {
                    target.destroy();
                }
            }, 0);
        }


    }
    update(deltaTime: number) {
        if (this.hp>0) {
        const p =this.node.position;
        this.node.setPosition(p.x,p.y-deltaTime*this.speed,p.z)
        }

    }

    protected onDestroy(): void {
     if (this.collider) {
        this.collider.off(Contact2DType.BEGIN_CONTACT,this.Oncollider,this)
        this.collider = null;
     }
    }
    
}


