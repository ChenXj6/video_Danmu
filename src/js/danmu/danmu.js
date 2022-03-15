import { getTextWidth, getTextPosition } from "./utils";

export default class Danmu {
  constructor(danmu, parentCtx) {
    this.content = danmu.content;
    this.runTime = danmu.runTime;
    this.danmu = danmu;
    this.ctx = parentCtx;

    this.initialize();
  }
  initialize () {
    this.color = this.danmu.color ?? this.ctx.color;
    this.speed = this.danmu.speed ?? this.ctx.speed;
    this.fontSize = 30;
    this.width = getTextWidth(this.content, this.fontSize)
    getTextPosition(this.ctx.canvas, this.fontSize, this)
  }
  draw () {
    this.ctx.canvasCtx.font = this.fontSize + 'px';
    this.ctx.canvasCtx.fillStyle = this.color;
    this.ctx.canvasCtx.fillText(this.content, this.x, this.y)
  }
}