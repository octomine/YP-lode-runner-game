import { Tile, AnimationPhase, RunnerAction } from "../constants";

export type PositionType = {
  x: number,
  y: number,
};

export type NodeType = PositionType & { actions: Array<RunnerAction> };

export type CheckCollisionType = {
  position: PositionType,
  phase: AnimationPhase,
}

export type RunnerInfoType = PositionType & {
  phase: AnimationPhase,
  direction: number,
};

export type LevelMapType = Tile[][];
export type TrapType = PositionType & {
  time: number,
}

export type GraphEdgeType = {
  action: RunnerAction,
  cost: number,
  vertice: string
}
export type GraphVerticeType = PositionType & {
  edges: Array<GraphEdgeType>
}
export type PathGraphType = Record<string, GraphVerticeType>;
export type PathStepType = PositionType & { action: RunnerAction };

export type LevelType = {
  level: LevelMapType,
  player: PositionType,
  bonuses: number,
  enemies: Array<PositionType>,
}

export enum ModelEvents {
  Update = 'update',
  UpdateWorld = 'updateWorld',
  GameStart = 'start',
  Message = 'message',
  LevelUp = 'levelUp',
  UpdateScore = 'updateScore',
  UpdateRest = 'updateRest',
  GameOver = 'over',
  CustomOver = 'customOver',
};

export enum MessageType {
  Hide = 'hide',
  Pause = 'pause',
  Message = 'message',
};

export type ModelMessageType = {
  type: MessageType,
  noRest?: boolean,
  title?: string,
  message?: string,
};
