import { _decorator, Button, Component, director, game, Sprite, UIOpacity} from 'cc';
import { overUI } from './overUI';
import { audioManager } from './audioManager';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    private static instance:GameManager;
    public  static getInstance():GameManager{
        return this.instance;
    };

    public static isPaused:boolean=false;
    @property
    bombNumber:number=0;
    @property
    lifeNumber:number=3;
    @property
    score:number=0;

    @property(Button)
    shopButton:Button=null;
    @property(Button)
    continueButton:Button=null;

    @property(overUI)
    overUI:overUI=null;

    private highScore:number=0;
    private readonly STORAGE_KEY ='plane_high_score';


    protected onLoad(): void {
         GameManager.instance=this;
         this.highScore=parseInt(localStorage.getItem(this.STORAGE_KEY)||'0',10)
        
    }
    protected start(): void {
         audioManager.getInstance().playMusic();
    }
    addBomb(){
        this.bombNumber++;
    }
    addLife(){
        this.lifeNumber--;
    }
    addscore(s:number){
        this.score+=s;
    }


    Onshop(){
        audioManager.getInstance().playSound(audioManager.getInstance().btnClip)
        this.shopButton.node.active=false;
        this.continueButton.node.active=true;
        GameManager.isPaused=true;
        director.pause();


    }
    Oncontinue(){
        audioManager.getInstance().playSound(audioManager.getInstance().btnClip)
        director.resume();
        this.shopButton.node.active=true;
        this.continueButton.node.active=false;
        GameManager.isPaused=false;

    }

    gameOver(){
        this.Onshop();
        
        if (this.score>this.highScore) {
            this.highScore=this.score;
            localStorage.setItem(this.STORAGE_KEY,this.highScore.toString());
        }
        this.overUI.gameOverUI(this.highScore,this.score);
    }

    restartButton(){
        audioManager.getInstance().playSound(audioManager.getInstance().btnClip)
        GameManager.isPaused=false;
        director.resume();
        director.loadScene('game');
    }
    quitButton(){
        audioManager.getInstance().playSound(audioManager.getInstance().btnClip)
        GameManager.isPaused=false;
        director.resume();
        director.loadScene('start');
    }

}
