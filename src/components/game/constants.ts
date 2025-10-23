export const TileSize = 32;
export enum Tile {
  Empty = 0,
  Brick = 1,
  Concrete = 2,
  Stair = 3,
  Rope = 4,
  Bonus = 5,
  Enemy = 6,
  Player = 7,
  Trap = 96,
  Trapped = 99,
  Out = 100,
}

export const VELOCITY = 200;
export const OBSTACLE: Tile[] = [Tile.Brick, Tile.Concrete, Tile.Out];
export const FLOOR: Tile[] = [Tile.Stair, Tile.Trapped, ...OBSTACLE];
export enum Orientation {
  Left = 0,
  Right = 1,
}
export enum RunnerAction {
  Stay = 0,
  Fall = 1000,
  MoveLeft = 37,
  MoveUp = 38,
  MoveRight = 39,
  MoveDown = 40,
}

export enum AnimationPhase {
  Stay = 0,
  Run = 1,
  Climb = 2,
  Hang = 3,
  Fall = 4,
  Freeze = 100,
}

export const InitRest = 5;
export const TrapLifeTime = 5;
export const WaitTime = 4;
export const DelayTime = 3;
