import { PositionType, PathStepType } from "./types";
import { RunnerAction, VELOCITY, TileSize, Orientation, AnimationPhase, Tile, WaitTime } from "../constants";
import { worldToMap } from "../utils";

export class Runner {
  private _x: number;
  private _y: number;
  private _action: RunnerAction = RunnerAction.Stay;
  private _orientation: Orientation = Orientation.Right;
  private _target: PositionType;
  private _path: Array<PathStepType> = [];
  private _isTrapped = false;
  private waitTime = 0;
  private escapePath: Array<PathStepType> = [];

  private readonly magic: number = 2;

  constructor({ x, y }: PositionType = { x: 0, y: 0 }) {
    this.update({ x, y });
  }

  public update({ x, y }: PositionType): void {
    this._x = x;
    this._y = y;
  }

  public setAction(action: RunnerAction) {
    if (this._action !== RunnerAction.Fall) {
      this._action = action;
      if (this._action === RunnerAction.MoveLeft) {
        this._orientation = 0;
      }
      if (this._action === RunnerAction.MoveRight) {
        this._orientation = 1;
      }
    }
  }

  public reset(pos: PositionType) {
    this.waitTime = 0;
    this._isTrapped = false;
    this._path = [];
    this.update(pos);
    this.setTarget(worldToMap(pos));
  }

  public setTarget(val: PositionType) {
    this._target = val;
  }

  public setPath(path: Array<PathStepType>) {
    this._path = path;
  }

  public targetFromPath() {
    if (this._path.length > 0) {
      const { x, y, action } = this._path[0];
      this.setTarget({ x, y });
      this.setAction(action);
      this._path.shift();
    }
  }

  public wait(dTime: number): boolean {
    this.waitTime += dTime;
    if (this.waitTime >= WaitTime) {
      this.waitTime = 0;
      return false;
    }
    return true;
  }

  public escape() {
    this._isTrapped = false;
    this.setPath(this.escapePath);
    this.targetFromPath();
  }

  public resetAction() {
    this._action = RunnerAction.Stay;
  }

  public setIsTrapped(val: boolean): void {
    this._isTrapped = val;
    if (this.isTrapped) {
      const currentPosition = worldToMap({ x: this.x + TileSize / 2, y: this.y + TileSize / 2 });
      this.escapePath = [
        { ...currentPosition, action: RunnerAction.MoveUp },
        { ...this.target, action: this.action },
      ]
    }
  }

  public getNextPos(dTime: number): PositionType {
    const dx = dTime * VELOCITY;
    const dy = dTime * VELOCITY;
    let x: number = this._x;
    let y: number = this._y;
    switch (this.action) {
      case RunnerAction.MoveLeft:
        x = this._x - dx;
        break;
      case RunnerAction.MoveRight:
        x = this._x + dx;
        break;
      case RunnerAction.MoveUp:
        y = this._y - dy;
        break;
      case RunnerAction.MoveDown:
      case RunnerAction.Fall:
        y = this._y + dy;
        break;
      default:
    }
    return { x, y };
  }

  public getCheckCollisionPoint({ x, y }: PositionType): PositionType {
    switch (this._action) {
      case RunnerAction.MoveLeft:
        return { x, y: y + .5 * TileSize };
      case RunnerAction.MoveUp:
        return { x: x + .5 * TileSize, y };
      case RunnerAction.MoveRight:
        return { x: x + TileSize - this.magic, y: y + .5 * TileSize };
      case RunnerAction.MoveDown:
      case RunnerAction.Fall:
        return { x: x + .5 * TileSize, y: y + TileSize - this.magic };
      default:
        return { x: 0, y: 0 };
    }
  }

  public getAnimationPhase(tile: Tile, onFloor: boolean): AnimationPhase {
    let phase: AnimationPhase = AnimationPhase.Freeze;
    switch (this.action) {
      case RunnerAction.MoveLeft:
      case RunnerAction.MoveRight:
        phase = tile === Tile.Rope ? AnimationPhase.Hang : AnimationPhase.Run;
        if (onFloor) {
          phase = AnimationPhase.Run;
        }
        break;
      case RunnerAction.MoveDown:
      case RunnerAction.MoveUp:
        phase = tile === Tile.Stair ? AnimationPhase.Climb : phase;
        break;
      case RunnerAction.Fall:
        phase = AnimationPhase.Fall;
        break;
      case RunnerAction.Stay:
        phase = onFloor ? AnimationPhase.Stay : phase;
        break;
      default:
    }
    return phase;
  }

  get x(): number {
    return this._x;
  }

  get y(): number {
    return this._y;
  }

  get action(): RunnerAction {
    return this._action;
  }

  get orientation(): number {
    return this._orientation;
  }

  get target(): PositionType {
    return this._target;
  }

  get path(): Array<PathStepType> {
    return this._path;
  }

  get pathIsPassed(): boolean {
    const { x, y } = this;
    const atMap = worldToMap({ x, y });
    return this._path.length === 0 && atMap.x === this._target.x && atMap.y === this._target.y;
  }

  get isTrapped(): boolean {
    return this._isTrapped;
  }
}

export default Runner;
