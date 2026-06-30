import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('overUI')
export class overUI extends Component {
    @property(Label)
    restartLabel:Label=null;
    @property(Label)
    overLabel:Label=null;

   gameOverUI(heightScore:number,count:number){
     this.node.active = true;        
    this.restartLabel.string=heightScore.toString();
    this.overLabel.string=count.toString();
   }
}
