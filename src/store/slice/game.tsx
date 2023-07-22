import { PayloadAction, createSlice } from "@reduxjs/toolkit";

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
type Status = {
  status: string;
};

const initialState: Board = {
  board: [],
};
export const game = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGame: (state, action) => {
      const { width, height, minesCount } = action.payload;
      state.board = [];

      for (let y = 0; y < height; y++) {
        state.board.push([]);
        for (let x = 0; x < width; x++) {
          state.board[y].push({
            x,
            y,
            isMine: false,
            isOpen: false,
            nearMines: 0,
          });
        }
      }

      let count = minesCount;
      while (count > 0) {
        let i = Math.floor(Math.random() * state.board[0].length);
        let j = Math.floor(Math.random() * state.board.length);
        if (!state.board[j][i].isMine) {
          count--;
          state.board[j][i].isMine = true;
        }
      }
    },
    openCell: (state, action: PayloadAction<Coordinates>) => {
      const { x, y } = action.payload;

      // 오픈된 셀의 개수를 구합니다.
      const getOpenCount = (board: Cell[][]) =>
        board.flat().filter((c) => c.isOpen === true).length;

      // 첫 번째 셀이 폭탄인 경우 재배치를 합니다.
      if (getOpenCount(state.board) === 0 && state.board[y][x].isMine) {
        state.board[y][x].isMine = false;
        while (true) {
          let i = Math.floor(Math.random() * state.board[0].length);
          let j = Math.floor(Math.random() * state.board.length);
          if (!(x === i && y === j) && !state.board[j][i].isMine) {
            state.board[j][i].isMine = true;
            break;
          }
        }
      }

      // 셀 주변의 폭탄 수를 계산합니다.
      const calculateMineCount = (board: Cell[][], { x, y }: Coordinates) => {
        let mineCount = 0;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (dy === 0 && dx === 0) continue;
            const newX = x + dx;
            const newY = y + dy;

            if (
              newY >= 0 &&
              newY < board.length &&
              newX >= 0 &&
              newX < board[0].length &&
              board[newY][newX].isMine
            )
              mineCount++;
          }
        }
        return mineCount;
      };
      // 스택에 현재 셀을 추가합니다.
      const stack = [{ x, y }];
      // 스택에는 안전지대인 셀이 추가되며, 더이상 안전지대가 없을 때까지 탐색합니다.
      while (stack.length > 0) {
        const { x, y } = stack.pop() as Coordinates;

        // 셀 주변의 폭탄 수를 계산합니다.
        const nearMines = calculateMineCount(state.board, { x, y });
        // 셀에 방문 표시를 합니다.
        state.board[y][x].isOpen = true;
        state.board[y][x].nearMines = nearMines;

        // 안전지대가 있다면 스택에 추가합니다.
        if (!state.board[y][x].isMine && nearMines === 0) {
          for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
              if (dx === 0 && dy === 0) continue;
              const newX = x + dx;
              const newY = y + dy;

              if (
                newY < 0 ||
                newY >= state.board.length ||
                newX < 0 ||
                newX >= state.board[0].length ||
                state.board[newY][newX].isOpen
              )
                continue;
              stack.push({ x: newX, y: newY });
            }
          }
        }
      }
    },
  },
});

export const gameAction = game.actions;
