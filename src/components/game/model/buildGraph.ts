import { checkNode, getStartNode, checkSides } from "./checkNode";
import { RunnerAction } from "../constants";
import { PositionType, PathGraphType, NodeType } from "./types";
import { checkFall, mapToWorld } from "../utils";

const RECURSION_DEPTH = 100000;
export const verticeId = ({ x, y }: PositionType) => `${x}-${y}`

export const buildEdge = ({ x, y, action }: { x: number, y: number, action: RunnerAction }) => {
  let dx = 0;
  let dy = 0;
  switch (action) {
    case RunnerAction.MoveLeft:
    case RunnerAction.MoveRight:
      dx = action === RunnerAction.MoveLeft ? -1 : 1;
      break;
    case RunnerAction.MoveUp:
    case RunnerAction.MoveDown:
    case RunnerAction.Fall:
      dy = action === RunnerAction.MoveUp ? -1 : 1;
      break;
    default:
  }
  let cost = 1;
  let xx = x + dx;
  let yy = y + dy;
  let depth = 0;
  while (checkNode({ x: xx, y: yy }).length === 0 && depth < RECURSION_DEPTH) {
    depth++;
    if (action === RunnerAction.Fall && !checkFall(mapToWorld({ x: xx, y: yy }))) {
      break;
    }
    cost++;
    xx = x + dx * cost;
    yy = y + dy * cost;
  }
  const actions = checkNode({ x: xx, y: yy }).length > 0
    ? checkNode({ x: xx, y: yy })
    : checkSides({ x: xx, y: yy });
  const node = {
    x: xx, y: yy,
    actions: action === RunnerAction.Fall
      ? actions
      : checkNode({ x: xx, y: yy }),
  }
  return { action, cost, vertice: verticeId({ x: xx, y: yy }), node };
}

export const buildGraph = (init: Array<PositionType> = []): PathGraphType => {
  const iTime = new Date().getTime();
  let x = 0;
  let y = 0;
  let cnt = 0;
  let nodes: Array<NodeType> = [];
  if (init.length > 0) {
    nodes = init.map<NodeType>((item) => getStartNode(item));
  } else {
    while (checkNode({ x, y }).length === 0) {
      cnt++;
      x = cnt % 32;
      y = Math.floor(cnt / 32);
    }
    nodes = [{ x, y, actions: checkNode({ x, y }) }]
  }
  let depth = 0;
  const res: PathGraphType = {};
  while (nodes.length > 0 && depth < RECURSION_DEPTH) {
    depth++;
    const { x, y, actions } = nodes[0];
    res[verticeId({ x, y })] = {
      x, y,
      edges: actions.map((act) => {
        const edge = buildEdge({ x, y, action: act });
        const { action, cost, vertice, node } = edge;
        if (!res[verticeId(node)]) {
          nodes.push(node);
        }
        return { action, cost, vertice };
      })
    };
    nodes.shift();
  }
  return res;
}
