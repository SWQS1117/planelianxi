import { _decorator, Component, instantiate, math, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('EnemyManager')
export class EnemyManager extends Component {
    @property
    Enemy0sr:number=1;
    @property(Prefab)
    Enemy0fab:Prefab=null;

    @property
    Enemy1sr:number=2;
    @property(Prefab)
    Enemy1fab:Prefab=null;

    @property
    Enemy2sr:number=3;
    @property(Prefab)
    Enemy2fab:Prefab=null;

    @property
    propsr:number=5;
    @property(Prefab)
    prop1fab:Prefab=null;
    @property(Prefab)
    prop2fab:Prefab=null;

    start() {
        this.schedule(this.Enemy0,this.Enemy0sr);
        this.schedule(this.Enemy1,this.Enemy1sr);
        this.schedule(this.Enemy2,this.Enemy2sr);
        this.schedule(this.Prop,this.propsr);
        
    }
    ObjectSpawn(enenyprefab:Prefab,minX:number,maxX:number,Y:number){
        const Enemy= instantiate(enenyprefab);
      this.node.addChild(Enemy);
      const randomx=math.randomRangeInt(minX,maxX);
      Enemy.setPosition(randomx,Y,0)
    }

    Prop(){
     const random= math.randomRangeInt(0,2);
      let Prefab=null;
      if (random==0) {
        Prefab=this.prop1fab;
      }
      if (random==1) {
        Prefab=this.prop2fab;
      }
      this.ObjectSpawn(Prefab,-225,225,520);
    }
   
    Enemy0():void{
       this.ObjectSpawn(this.Enemy0fab,-225,225,520);
    }
    Enemy1(){
       this.ObjectSpawn(this.Enemy1fab,-225,225,520);
    }
    Enemy2(){
        this.ObjectSpawn(this.Enemy2fab,-225,225,520);
    }
    update(deltaTime: number) {
      
    }
    protected onDestroy(): void {
        this.unschedule(this.Enemy0)
         this.unschedule(this.Enemy1)
          this.unschedule(this.Enemy2)
          this.unschedule(this.Prop);
       
    }
}


