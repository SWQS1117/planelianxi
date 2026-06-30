import { _decorator, Component, ResolutionPolicy, screen, view } from 'cc';
const { ccclass } = _decorator;

@ccclass('AutoFit')
export class AutoFit extends Component {
    start() {
        // 竖屏游戏：固定高度，宽度自动适配
        // 桌面端：两侧会有黑边（正常）
        // 手机端竖屏：几乎完美适配
        // 手机端横屏：两侧黑边
        screen.resolutionPolicy = ResolutionPolicy.FIXED_HEIGHT;
    }
}
