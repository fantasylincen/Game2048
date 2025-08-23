// 2048游戏音效管理器
// 使用Web Audio API生成游戏音效

class SoundManager {
  constructor() {
    this.audioContext = null;
    this.masterGain = null;
    this.enabled = true;
    this.initialized = false;
  }

  // 初始化音频上下文
  async init() {
    if (this.initialized) return;
    
    try {
      // 现代浏览器需要用户交互才能启动音频上下文
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.masterGain = this.audioContext.createGain();
      this.masterGain.connect(this.audioContext.destination);
      this.masterGain.gain.value = 0.3; // 主音量控制
      this.initialized = true;
    } catch (error) {
      console.warn('音频初始化失败:', error);
      this.enabled = false;
    }
  }

  // 启用/禁用音效
  setEnabled(enabled) {
    this.enabled = enabled;
  }

  // 生成音调
  createTone(frequency, duration, type = 'sine') {
    if (!this.enabled || !this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.masterGain);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    // 音量包络
    const currentTime = this.audioContext.currentTime;
    gainNode.gain.value = 0;
    gainNode.gain.linearRampToValueAtTime(0.3, currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, currentTime + duration);

    oscillator.start(currentTime);
    oscillator.stop(currentTime + duration);
  }

  // 移动音效 - 简单的滑音
  playMoveSound() {
    if (!this.enabled) return;
    this.init().then(() => {
      this.createTone(220, 0.1, 'triangle');
    });
  }

  // 合并音效 - 上升音调
  playMergeSound(tileValue) {
    if (!this.enabled) return;
    this.init().then(() => {
      // 根据方块值调整音调高度
      const baseFreq = 330;
      const freq = baseFreq + Math.log2(tileValue) * 50;
      this.createTone(freq, 0.2, 'square');
    });
  }

  // 创建新方块音效
  playNewTileSound() {
    if (!this.enabled) return;
    this.init().then(() => {
      this.createTone(440, 0.15, 'sine');
    });
  }

  // 胜利音效 - 上升音阶
  playWinSound() {
    if (!this.enabled) return;
    this.init().then(() => {
      const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6
      notes.forEach((freq, index) => {
        setTimeout(() => {
          this.createTone(freq, 0.3, 'sine');
        }, index * 100);
      });
    });
  }

  // 游戏结束音效 - 下降音调
  playGameOverSound() {
    if (!this.enabled) return;
    this.init().then(() => {
      const notes = [440, 392, 349, 294]; // A4, G4, F4, D4
      notes.forEach((freq, index) => {
        setTimeout(() => {
          this.createTone(freq, 0.4, 'sawtooth');
        }, index * 200);
      });
    });
  }

  // 播放复合音效 - 用于特殊组合
  playComboSound(comboCount) {
    if (!this.enabled) return;
    this.init().then(() => {
      for (let i = 0; i < comboCount; i++) {
        setTimeout(() => {
          this.createTone(440 + i * 100, 0.1, 'triangle');
        }, i * 50);
      }
    });
  }

  // 无效移动音效
  playInvalidMoveSound() {
    if (!this.enabled) return;
    this.init().then(() => {
      this.createTone(150, 0.2, 'sawtooth');
    });
  }

  // 清理资源
  dispose() {
    if (this.audioContext && this.audioContext.state !== 'closed') {
      this.audioContext.close();
    }
  }
}

// 创建全局音效管理器实例
const soundManager = new SoundManager();

export default soundManager;