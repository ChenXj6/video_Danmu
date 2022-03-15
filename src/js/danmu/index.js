import { isObject, isArray } from './utils'
import Danmu from './danmu';
class VideoDanmu {
  constructor(video, canvas, options, videoWidth) {
    if (!video || !canvas || !options || isObject(options)) return;
    if (!options.danmuData || !isArray(options.danmuData)) return;
    this.video = video;
    this.canvas = canvas;
    this.canvasCtx = canvas.getContext('2d');
    this.canvas.width = videoWidth || 1000;
    this.canvas.height = video.offsetHeight;
    // video  播放与暂停
    this.danmuPaused = true;

    Object.assign(this, options, {
      speed: 2,
      runTime: 0,
      color: '#fff'
    })
    this.danmuPool = this.createDanmuPool();
    this.render()
  }
  createDanmuPool () {
    return this.danmuData.map(dm => new Danmu(dm, this))
  }

  render () {
    this.clearRect();
    this.DrawDanmu();
    // video 暂停与播放
    // true 的情况下停止绘制动画
    !this.danmuPaused && requestAnimationFrame(this.render.bind(this))
  }

  DrawDanmu () {
    let currentTime = this.video.currentTime;

    this.danmuPool.map(danmu => {
      // danmu.stopDraw   判断弹幕是否已经移除可视范围,停止渲染
      if (!danmu.stopDraw && currentTime >= danmu.runTime) {
        // danmu.isInit  判断弹幕是否已经初始化了，防止重新初始化
        if (!danmu.isInit) {
          danmu.initialize();
          danmu.isInit = true;
        }
        danmu.x -= danmu.speed;
        danmu.draw();
        if (danmu.x <= danmu.width * -1) {
          danmu.stopDraw = true;
        }
      }
    })
  }

  reset () {
    this.clearRect();
    let currentTime = this.video.currentTime;
    this.danmuPool.map(danmu => {
      danmu.stopDraw = false;
      if (currentTime <= danmu.runTime) {
        danmu.isInit = false
      } else {
        danmu.stopDraw = true
      }
    })
  }

  addDanmu (data) {
    this.danmuPool.push(new Danmu(data, this))
  }

  clearRect () {
    this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
export default VideoDanmu