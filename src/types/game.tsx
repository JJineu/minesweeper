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
  isFlag: boolean;
};
export type Board = {
  board: Cell[][];
  boardSetting: BoardSetting;
};
export type Status = {
  status: GameStatus;
  time: number
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
};
