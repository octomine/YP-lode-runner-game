import { PathStepType, PathGraphType } from './types';
import { RunnerAction } from '../constants';

export const find = (start: string, end: string, graph: PathGraphType): Array<PathStepType> => {
  const iTime = new Date().getTime();
  if (graph[start] && graph[end]) {
    // TODO: сделать нормальный тип
    const visited: Record<string, any> = {};
    const unvisited = [];
    const { x, y } = graph[start];
    unvisited.push({ id: start, x, y, cost: 0, action: RunnerAction.Stay, parent: null });
    while (unvisited.length > 0) {
      const { id } = unvisited[0];
      const { edges } = graph[id];
      if (!visited[id]) {
        visited[id] = unvisited[0];
        if (id === end) {
          let vertice = visited[id];
          const path = [];
          while (vertice.parent) {
            const { x, y, action } = vertice;
            path.push({ x, y, action });
            vertice = visited[vertice.parent];
          }
          path.reverse();
          return path;
        }
        edges.forEach(({ cost, action, vertice }) => {
          if (!visited[vertice]) {
            const { x, y } = graph[vertice];
            unvisited.push({ id: vertice, x, y, cost, action, parent: id });
          }
        });
      }
      unvisited.shift();
      // это типа поиск кратчайшего пути, но работает кривовато
      // unvisited.sort((a, b) => {
      //   const { cost: costA } = a;
      //   const { cost: costB } = b;
      //   if (costA > costB) {
      //     return 1;
      //   }
      //   if (costA < costB) {
      //     return -1;
      //   }
      // });
    }
  }
  return [];
}
