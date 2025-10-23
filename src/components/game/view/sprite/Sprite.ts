import { TileSize, AnimationPhase } from "../../constants";
import { PhasesType, SpriteConfigType } from './types'

export class Sprite {
  private time = 0;
  private frame = 0;

  private canvas: OffscreenCanvas;
  private img: HTMLImageElement;
  private fps: number;
  private phases: PhasesType;

  constructor({ img, fps, phases, width = TileSize, height = TileSize }: SpriteConfigType) {
    this.canvas = new OffscreenCanvas(width, height);
    this.img = img;
    this.fps = fps;
    this.phases = phases;
  }

  public getPhase(dt: number, phase = 0, direction = 0): OffscreenCanvas {
    this.time += dt;
    if (phase === AnimationPhase.Freeze) {
      return this.canvas;
    }
    let x = 0;
    let y = 0;
    if (this.phases[phase]) {
      const { start, length } = this.phases[phase] as { start: number, length: number };
      const frameOffset = start;
      if (this.time >= 1 / this.fps) {
        this.frame = (this.frame + 1) % length;
        this.time = 0;
      }
      x = (this.frame + frameOffset) * TileSize;
      y = direction * TileSize;
      x = x >= this.img.width ? this.img.width - TileSize : x;
      y = y >= this.img.height ? this.img.height - TileSize : y;

      // магия, без которой не проходят тесты
      const ctx = this.canvas.getContext('2d') as CanvasRect & CanvasDrawImage;
      if (ctx) {
        ctx.clearRect(0, 0, TileSize, TileSize);
        ctx.drawImage(
          this.img,
          x, y, TileSize, TileSize,
          0, 0, TileSize, TileSize
        )
      }
    }

    return this.canvas;
  }
}
