import { PositionType } from './../model/types';
import { TileSize, Tile } from '../constants';
import GameModel from '../model/GameModel';

// координаты мира -> координаты карты
export const worldToMap = ({ x, y }: PositionType): PositionType => {
  return { x: Math.floor(x / TileSize), y: Math.floor(y / TileSize) };
}

// координаты карты -> координаты мира
export const mapToWorld = ({ x, y }: PositionType): PositionType => {
  return { x: x * TileSize, y: y * TileSize };
}

export const getTileAt = ({ x, y }: PositionType): Tile => {
  const level = GameModel.getLevelMap();
  if (x < 0 || y < 0 || x >= level[0].length || y >= level.length) {
    return Tile.Out;
  }
  return level[y][x];
}

export const checkFall = ({ x, y }: PositionType): boolean => {
  const mid: PositionType = worldToMap({ x: x + .5 * TileSize, y: y + .5 * TileSize });
  const bottom: PositionType = worldToMap({ x: x + .5 * TileSize, y: y + TileSize });
  return [Tile.Empty, Tile.Bonus, Tile.Trap].includes(getTileAt(mid))
    && ([Tile.Empty, Tile.Rope, Tile.Bonus, Tile.Trap].includes(getTileAt(bottom)));
}

export const checkTrap = ({ x, y }: PositionType): boolean => {
  const mid: PositionType = worldToMap({ x: x + .5 * TileSize, y: y + .5 * TileSize });
  const bottom: PositionType = worldToMap({ x: x + .5 * TileSize, y: y + TileSize });
  return [Tile.Empty, Tile.Bonus].includes(getTileAt(mid))
    && (getTileAt(bottom) === Tile.Trap);
}

export { EventBus } from './EventBus';
