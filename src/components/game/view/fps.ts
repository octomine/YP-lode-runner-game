export class FPS {
  private time: number;
  private frames: number;

  constructor() {
    this.time = 0;
    this.frames = 0;
  }

  updateTime(dTime: number) {
    this.time += dTime;
    this.frames++;
    if (this.time > 1) {
      console.log(`fps: ${this.frames}`);
      this.time = 0;
      this.frames = 0;
    }
  }
}