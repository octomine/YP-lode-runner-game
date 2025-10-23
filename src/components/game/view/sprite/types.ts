export type PhasesType = Record<number, { start: number, length: number } | null>
export type SpriteConfigType = {
  img: HTMLImageElement,
  fps: number,
  phases: PhasesType,
  width?: number,
  height?: number,
}
