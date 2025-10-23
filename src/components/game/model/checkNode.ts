import { PositionType, GraphVerticeType, NodeType } from "./types";
import { RunnerAction, Tile, OBSTACLE, FLOOR } from "../constants";
import { getTileAt, checkFall, worldToMap } from "../utils";

export const checkNode = ({ x, y }: PositionType): Array<RunnerAction> => {
  const res: Array<RunnerAction> = [];
  const center = getTileAt({ x, y });
  const bottom = getTileAt({ x, y: y + 1 });
  const top = getTileAt({ x, y: y - 1 });
  const left = getTileAt({ x: x - 1, y });
  const leftB = getTileAt({ x: x - 1, y: y + 1 });
  const right = getTileAt({ x: x + 1, y });
  const rightB = getTileAt({ x: x + 1, y: y + 1 });

  // stair
  if ([center, bottom].includes(Tile.Stair) && !OBSTACLE.includes(center)) {
    if (OBSTACLE.includes(left) && OBSTACLE.includes(right)) {
      if ([Tile.Empty, Tile.Bonus, Tile.Stair].includes(center)) {
        if (OBSTACLE.includes(top)) {
          res.push(RunnerAction.MoveDown);
        }
        if (OBSTACLE.includes(bottom)) {
          res.push(RunnerAction.MoveUp);
        }
      }
      return res;
    }
    if ([Tile.Rope, Tile.Stair].includes(left) ||
      (FLOOR.includes(leftB) && !OBSTACLE.includes(left) && !OBSTACLE.includes(center))) {
      res.push(RunnerAction.MoveLeft);
    }
    if ([Tile.Rope, Tile.Stair].includes(right) ||
      (FLOOR.includes(rightB) && !OBSTACLE.includes(right) && !OBSTACLE.includes(center))) {
      res.push(RunnerAction.MoveRight);
    }
    if (OBSTACLE.includes(bottom)) {
      if ([Tile.Empty, Tile.Rope, Tile.Bonus].includes(leftB) && !OBSTACLE.includes(left)) {
        res.push(RunnerAction.MoveLeft);
      }
      if ([Tile.Empty, Tile.Rope, Tile.Bonus].includes(rightB) && !OBSTACLE.includes(right)) {
        res.push(RunnerAction.MoveRight);
      }
    }
    if (center === Tile.Stair) {
      if (!OBSTACLE.includes(top)) {
        res.push(RunnerAction.MoveUp);
      }
      if (!OBSTACLE.includes(bottom)) {
        res.push(RunnerAction.MoveDown);
      }
    } else if (!OBSTACLE.includes(center)) {
      res.push(RunnerAction.MoveDown);
    }
  }
  // falling
  if ([Tile.Empty, Tile.Bonus].includes(center) && [Tile.Empty, Tile.Rope, Tile.Bonus].includes(bottom)) {
    if ([left, right].includes(Tile.Rope) || top === Tile.Stair) {
      res.push(RunnerAction.Fall);
    } else if (((OBSTACLE.includes(leftB) && !OBSTACLE.includes(left)) ||
      (OBSTACLE.includes(rightB) && !OBSTACLE.includes(right)))) {
      res.push(RunnerAction.Fall);
    }
  }
  // ends
  if (([Tile.Empty, Tile.Bonus].includes(center) && FLOOR.includes(bottom)) || (center === Tile.Rope)) {
    if (OBSTACLE.includes(left)) {
      if (!(bottom === Tile.Stair && !FLOOR.includes(rightB))) {
        res.push(RunnerAction.MoveRight);
      }
    }
    if (OBSTACLE.includes(right)) {
      if (!(bottom === Tile.Stair && !FLOOR.includes(leftB))) {
        res.push(RunnerAction.MoveLeft);
      }
    }
  }

  if (res.length === 2) {
    if (Math.abs(res[1] - res[0]) === 2) {
      return [];
    }
  }

  // under stair
  if (top === Tile.Stair && [Tile.Empty, Tile.Rope, Tile.Bonus].includes(center)) {
    if (bottom === Tile.Stair) {
      res.push(RunnerAction.MoveDown);
    } else if (OBSTACLE.includes(bottom) ||
      ([Tile.Empty, Tile.Rope, Tile.Bonus].includes(bottom) && center === Tile.Rope)) {
      return checkSides({ x, y });
    }
  }
  return res;
}

export const checkSides = ({ x, y }: PositionType): Array<RunnerAction> => {
  const res = [];
  if (!OBSTACLE.includes(getTileAt({ x: x - 1, y }))) {
    res.push(RunnerAction.MoveLeft);
  }
  if (!OBSTACLE.includes(getTileAt({ x: x + 1, y }))) {
    res.push(RunnerAction.MoveRight);
  }
  if (getTileAt({ x, y }) === Tile.Stair) {
    if (!OBSTACLE.includes(getTileAt({ x, y: y - 1 }))) {
      res.push(RunnerAction.MoveUp);
    }
    if (!OBSTACLE.includes(getTileAt({ x, y: y + 1 }))) {
      res.push(RunnerAction.MoveDown);
    }
  } else if (!OBSTACLE.includes(getTileAt({ x, y })) && getTileAt({ x, y: y + 1 }) === Tile.Stair) {
    res.push(RunnerAction.MoveDown);
  }
  return res;
}

export const getStartNode = ({ x, y }: PositionType): NodeType => {
  const atMap = worldToMap({ x, y });
  if (checkNode(atMap).length > 0) {
    return { ...atMap, actions: checkNode(atMap) };
  }
  if (checkFall({ x, y })) {
    return { ...atMap, actions: [RunnerAction.Fall] };
  }
  const bottom = getTileAt({ x: atMap.x, y: atMap.y + 1 });
  if (FLOOR.includes(bottom) || getTileAt(atMap) === Tile.Rope) {
    return { ...atMap, actions: checkSides(atMap) }
  }
  return { ...atMap, actions: [] };// TODO: подумать прям ОЧ внимательно
}
