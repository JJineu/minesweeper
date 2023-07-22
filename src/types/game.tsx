export type Coordinates = {
  x: number;
  y: number;
};
export type Cell = {
  x: number;
  y: number;
  isMine: boolean;
  isOpen: boolean;
  nearMines: number;
};
export type Board = {
  board: Cell[][];
};
export type Status = {
  status: GameStatus;
};
export enum GameStatus {
  READY,
  RUN,
  WIN,
  LOSE,
}
export type BoardSetting = {
    width: number;
    height: number;
    minesCount: number;
}