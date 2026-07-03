# ✈️ 飞机大战 - Plane Battle

一款基于 **Cocos Creator 3.8+** 和 **TypeScript** 开发的完整横版射击游戏，支持桌面端和移动端触屏操作。

> 🎮 [在线试玩](https://swqs1117.github.io/planelianxi/)

---

## 📸 游戏截图

| 开始界面 | 游戏主界面 | 结束界面 |
|---------|-----------|---------|
| ![start] | ![gameplay] | ![gameover] |

*(截图可以后续补充)*

---

## 🎯 游戏特色

### 敌机系统
- **三种差异化敌机**：小型机（低血量快速）、中型机、大型机（高血量慢速）
- **变体机制**：正反两种变体，增加随机性和挑战性
- **Schedule 调度**：精确控制各类敌机的生成节奏与密度

### 道具系统
- **双发子弹**：拾取后 5 秒内双弹道射击，火力翻倍
- **炸弹清屏**：双击屏幕触发炸弹，瞬间清除场上所有敌机

### 操控方式
- **拖拽移动**：触摸/鼠标拖拽控制战机位置
- **连招操作**：双击屏幕触发炸弹清屏（需持有炸弹道具）
- **自动射击**：进入游戏即自动开火

### 游戏机制
- **无敌帧**：受击后 0.5 秒无敌保护
- **多命系统**：初始 3 条命，受击后闪烁提示
- **最高分记录**：通过 LocalStorage 持久化存储

---

## 🛠️ 技术栈

| 技术 | 用途 |
|------|------|
| **Cocos Creator 3.8+** | 游戏引擎 |
| **TypeScript** | 编程语言 |
| **RigidBody2D + Collider2D** | 物理碰撞检测 |
| **Animation** | 动画系统（受伤闪烁、爆炸、道具拾取等） |
| **AudioSource + AudioClip** | 音效管理 |
| **触屏输入系统** | 移动端操控适配 |
| **单例模式** | 全局游戏状态与音效管理 |
| **LocalStorage** | 最高分持久化存储 |

---

## 📁 项目结构

```
assets/
├── animation/          # 动画资源
├── Audio/              # 音效文件（BGM、射击、爆炸、道具等）
├── image/              # 游戏素材（敌机、子弹、背景、UI 等）
├── prefab/             # 预制体（玩家、敌机、子弹、道具等）
├── scene/              # 场景文件（start、game）
└── script/             # 核心 TypeScript 代码
    ├── player.ts       # 玩家控制（移动、射击、碰撞、连招）
    ├── Enemy.ts        # 敌机行为（碰撞、血量、动画）
    ├── EnemyManager.ts # 敌机生成调度
    ├── bullet.ts       # 子弹逻辑
    ├── prop.ts         # 道具逻辑
    ├── GameManager.ts  # 全局状态管理（单例）
    ├── audioManager.ts # 音效管理（单例）
    ├── bg.ts           # 滚动背景
    ├── AutoFit.ts      # 屏幕适配（FIXED_HEIGHT）
    ├── startui.ts      # 开始界面
    ├── overUI.ts       # 结束界面
    ├── scoreUI.ts      # 分数显示
    ├── BormUI.ts       # 炸弹数量显示
    └── LifeCountUI.ts  # 生命数量显示
```

---

## 🚀 本地运行

```bash
# 克隆仓库
git clone https://github.com/swqs1117/planelianxi.git

# 用 Cocos Creator 3.8+ 打开项目目录
# 选择 planelianxi 文件夹即可加载

# 构建发布
# Cocos Creator → 项目 → 构建 → Web/移动端
```

### 环境要求
- [Cocos Creator](https://www.cocos.com/creator) 3.8 或更高版本
- Node.js（用于依赖管理）

---

## 📜 开发历程

本项目由个人独立完成，从设计到编码历时约 1 个月（2026.06），涵盖：

1. **项目设计**：游戏原型设计、UI 流程规划、功能模块划分
2. **核心开发**：玩家操控、敌机 AI、碰撞检测、道具系统
3. **打磨优化**：动画反馈、音效系统、屏幕适配、触屏体验
4. **发布上线**：Web 构建部署、代码开源

---

## 🙌 致谢

- Cocos Creator 官方文档与社区
- 所有使用的免费音效与美术资源

---

## 📄 许可

本项目仅供学习交流使用。
