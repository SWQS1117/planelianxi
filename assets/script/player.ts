import { _decorator, Animation, CCString, Collider2D, Component, Contact2DType, EventTouch, Input, input, instantiate, IPhysics2DContact, Node, Prefab, UIOpacity, Vec3 } from 'cc';
import { prop, propType } from './prop';
import { GameManager } from './GameManager';
import { audioManager } from './audioManager';
const { ccclass, property } = _decorator;

enum shootType{
    OneShoot,
    TwoShoot
};


@ccclass('player')
export class player extends Component {

@property(Node)
bulletparent:Node=null;

@property(Prefab)
bulletfab:Prefab=null;
@property(Node)
bullet1position:Node=null;

@property(Prefab)
bullet2fab:Prefab=null;
@property(Node)
bullet2position:Node=null;
@property(Node)
bullet3positon:Node=null;

@property
shootRate:number=0.5;
@property
shootType:shootType=shootType.OneShoot;

@property
hp:number=3;

@property(Animation)
anim:Animation=null;
@property(CCString)
anim_hit:string=" ";
@property(CCString)
anim_down:string=" ";

@property
invincibleDuaration:number=0.5;

isInvincible:boolean=false;
invincibTimer:number=0;

private lastTapTime: number = 0;
private readonly DOUBLE_TAP_INTERVAL: number = 0.3;

shootTimer:number=0;
    @property
    invincibleDuration:number=0.5;
    private playerCollider: Collider2D | null = null;
    protected onLoad(): void {
        input.on(Input.EventType.TOUCH_MOVE,this.onMove,this)
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);

      this.playerCollider = this.getComponentInChildren(Collider2D);
      if (this.playerCollider) {
        this.playerCollider.on(Contact2DType.BEGIN_CONTACT,this.onCollider,this)
      }
    }

    onTouchStart(event: EventTouch) {
    if (GameManager.isPaused) return;  
    const now = Date.now() / 1000;    
    if (now - this.lastTapTime < this.DOUBLE_TAP_INTERVAL) {
        this.clearAllEnemies();
        this.lastTapTime = 0;   
    } else {
        this.lastTapTime = now;
    }
}

    clearAllEnemies() {
        if (GameManager.getInstance().bombNumber <= 0) return; 
        const enemies = this.node.parent?.getChildByName('EnemyManager');
        if (!enemies) return;
        GameManager.getInstance().bombNumber--;
        for (let i = enemies.children.length - 1; i >= 0; i--) {
            const child = enemies.children[i];
            if (child.getComponent('Enemy')) {
                child.destroy();
            }
    }
}

    onCollider(self:Collider2D,other:Collider2D,Contact:IPhysics2DContact){
       
       const Prop=other.getComponent(prop)
        if (Prop) {
          
            if (Prop.isProcessed) return;
            Prop.isProcessed=true;
            audioManager.getInstance().playSound(audioManager.getInstance().propClip);
            switch (Prop.proptype) {
                case propType.zreoShoot:
                    this.ZreoShoot();
                    this.schedule(()=>{ this.shootType=shootType.OneShoot},5)
                    break;
            
                case propType.OneShoot:
                    
                    GameManager.getInstance().addBomb();
                    break;
            }
            other.node.destroy();
        }
        else{
            this.colliedrEnemy();
        }
 
    }

    ZreoShoot(){
        this.shootType=shootType.TwoShoot;
    }
    onMove(event:EventTouch){
        if (GameManager.isPaused) return;
        const p=this.node.position;
        let  touchp=new Vec3(
            p.x+event.getDeltaX(),p.y+event.getDeltaY(),p.z
        )

        if (touchp.x<-224) {
            touchp.x=-224
        }
        if (touchp.x>224) {
            touchp.x=224
        }
        if (touchp.y>440) {
            touchp.y=440
        }
        if (touchp.y<-420) {
            touchp.y=-420
        }

        this.node.setPosition(touchp);
    }

    colliedrEnemy(){
         if (this.isInvincible) {return }
         if (this.hp <= 0) {return }

        this.hp--;
        audioManager.getInstance().playSound(audioManager.getInstance().boomClip);
        GameManager.getInstance().addLife();
        if (this.hp>0) {
            this.anim.play(this.anim_hit);
            this.isInvincible=true;
            this.invincibTimer=this.invincibleDuaration;
        }
        else{
            this.anim.play(this.anim_down);
            this.isInvincible=true;
            this.invincibTimer=this.invincibleDuaration;
            this.anim.once(Animation.EventType.FINISHED,()=>{
                GameManager.getInstance().gameOver();
                this.node.destroy();
            })
         
        }
    }
    update(deltaTime: number):void {
        if(this.hp<=0)return;
         if (this.isInvincible) {
            this.invincibTimer-=deltaTime;
            if (this.invincibTimer<=0) {
                this.isInvincible=false;
            }
    
        }

        switch(this.shootType){
            case shootType.OneShoot:
                this.OneShoot(deltaTime);
                break;
            case shootType.TwoShoot:
                this.TwoShoot(deltaTime);
                break;
        }



    }
    OneShoot(deltaTime:number){
         this.shootTimer+=deltaTime;
        if (this.shootTimer>=this.shootRate) {
            this.shootTimer=0
        const  bullet1= instantiate(this.bulletfab);
        this.bulletparent.addChild(bullet1);
        bullet1.setWorldPosition(this.bullet1position.worldPosition);
        }
        audioManager.getInstance().playSound(audioManager.getInstance().shoot1Clip)
        
    }

    TwoShoot(deltaTime:number){
        this.shootTimer+=deltaTime;
        if (this.shootTimer>=this.shootRate) {
            this.shootTimer=0
        const  bullet1= instantiate(this.bullet2fab);
        const  bullet2= instantiate(this.bullet2fab);
        this.bulletparent.addChild(bullet1);
        this.bulletparent.addChild(bullet2);
        bullet1.setWorldPosition(this.bullet2position.worldPosition);
         bullet2.setWorldPosition(this.bullet3positon.worldPosition);
        }
        audioManager.getInstance().playSound(audioManager.getInstance().shoot1Clip)
    }
    protected onDestroy(): void {
        input.off(Input.EventType.TOUCH_MOVE,this.onMove,this)
      if (this.playerCollider) {
        this.playerCollider.off(Contact2DType.BEGIN_CONTACT,this.onCollider,this)
        this.playerCollider = null;
      }
    }
}


