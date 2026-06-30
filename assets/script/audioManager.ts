import { _decorator, AudioClip, AudioSource, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('audioManager')
export class audioManager extends Component {
    private static instance:audioManager;
   
    static getInstance():audioManager{
        return this.instance;
    }
    @property(AudioSource)
    audioSource:AudioSource=null;

    @property(AudioClip)
    bgmClip:AudioClip=null;
    @property(AudioClip)
    shoot1Clip:AudioClip=null;
    @property(AudioClip)
    boomClip:AudioClip=null;
    @property(AudioClip)
    propClip:AudioClip=null;
    @property(AudioClip)
    btnClip:AudioClip=null;

    protected onLoad(): void {
        audioManager.instance=this;
    }

    playSound(clip:AudioClip){
        if (clip) {
            this.audioSource.playOneShot(clip);
        }
    }

    playMusic(){
        if (this.bgmClip) {
            this.audioSource.clip=this.bgmClip;
            this.audioSource.loop=true;
            this.audioSource.play();

        }
    }

    shopMusic(){
        this.audioSource.stop();
    }
    
}


