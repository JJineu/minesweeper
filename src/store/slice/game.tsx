import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  Board,
  BoardSetting,
  Cell,
  Coordinates,
  GameStatus,
  Status,
} from "../../types/game";

const initialState: Board & Status = {
  board: [],
  boardSetting: { width: 8, height: 8, minesCount: 10 },
  status: GameStatus.READY,
  time: 0,
};
export const game = createSlice({
  name: "game",
  initialState,
  reducers: {
    setBoard: (state, action: PayloadAction<BoardSetting>) => {
      const { width, height, minesCount } = action.payload;
      state.status = GameStatus.READY;
      state.time = 0;
      state.boardSetting = { width, height, minesCount };
    },
    setGame: (state) => {
      const { width, height, minesCount } = state.boardSetting;
      state.status = GameStatus.READY;
      state.time = 0;

      state.board = Array.from({ length: height }, (_, y) =>
        Array.from({ length: width }, (_, x) => ({
          x,
          y,
          isMine: false,
          isOpen: false,
          nearMines: 0,
          isFlag: false,
        }))
      );

      const mineIndices = new Set<number>();
      while (mineIndices.size < minesCount) {
        const i = Math.floor(Math.random() * width);
        const j = Math.floor(Math.random() * height);
        const index = j * width + i;
        mineIndices.add(index);
      }

      for (const index of mineIndices) {
        const y = Math.floor(index / width);
        const x = index % width;
        state.board[y][x].isMine = true;
      }
    },
    openCell: (state, action: PayloadAction<Coordinates>) => {
      const { x, y } = action.payload;

      // 플래그가 있는 경우, 이미 오픈된 경우 클릭할 수 없습니다.
      if (state.board[y][x].isFlag || state.board[y][x].isOpen) return;

      // 첫 번째 셀이 폭탄인 경우 재배치를 합니다.
      if (state.status === GameStatus.READY && state.board[y][x].isMine) {
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

      state.status = GameStatus.RUN;

      // 게임의 패배 조건을 검증합니다.
      if (state.board[y][x].isMine) {
        state.status = GameStatus.LOSE;
        // 모든 폭탄을 오픈합니다.
        state.board.flat().forEach((cell) => {
          if (cell.isMine) {
            cell.isOpen = true;
          }
        });
        return;
      }

      // 셀 주변의 폭탄 수를 계산합니다.
      const nearMines = calculateMineCount(state.board, { x, y });
      // 셀에 방문 표시를 합니다.
      state.board[y][x].isOpen = true;
      state.board[y][x].nearMines = nearMines;
      if (nearMines === 0) {
        // 스택에 현재 셀을 추가합니다.
        const stack = [{ x, y }];
        // 스택에는 안전지대인 셀이 추가되며, 더이상 안전지대가 없을 때까지 탐색합니다.
        while (stack.length > 0) {
          const { x, y } = stack.pop() as Coordinates;

          // 안전지대가 있다면 스택에 추가합니다.
          if (!state.board[y][x].isMine && nearMines === 0) {
            for (let dy = -1; dy <= 1; dy++) {
              for (let dx = -1; dx <= 1; dx++) {
                if (dx === 0 && dy === 0) continue;
                const newX = x + dx;
                const newY = y + dy;

                if (
                  newY >= 0 &&
                  newY < state.board.length &&
                  newX >= 0 &&
                  newX < state.board[0].length &&
                  !state.board[newY][newX].isOpen &&
                  !state.board[newY][newX].isMine
                ) {
                  // 셀 주변의 폭탄 수를 계산합니다.
                  const nearMines = calculateMineCount(state.board, {
                    x: newX,
                    y: newY,
                  });
                  // 셀에 방문 표시를 합니다.
                  state.board[newY][newX].isOpen = true;
                  state.board[newY][newX].nearMines = nearMines;
                  if (nearMines === 0) {
                    stack.push({ x: newX, y: newY });
                  }
                }
              }
            }
          }
        }
      }

      // 게임의 승리 조건을 검증합니다.
      const totalCells = state.board.length * state.board[0].length;
      if (
        getOpenCount(state.board) ===
        totalCells - state.boardSetting.minesCount
      ) {
        state.status = GameStatus.WIN;
      }
    },
    updateTimer: (state) => {
      state.time += 1;
    },
    flagCell: (state, action: PayloadAction<Coordinates>) => {
      const { x, y } = action.payload;
      state.status = GameStatus.RUN;
      state.board[y][x].isFlag = !state.board[y][x].isFlag;
    },
  },
});

// 셀 주변의 폭탄 수를 계산합니다.
const calculateMineCount = (board: Cell[][], { x, y }: Coordinates) => {
  console.log(x, y, "count");
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
        newX < board[0].length
      ) {
        if (board[newY][newX].isMine) {
          mineCount++;
        }
      }
    }
  }
  return mineCount;
};

// 오픈된 셀의 개수를 구합니다.
const getOpenCount = (board: Cell[][]) =>
  board.flat().filter((c) => c.isOpen === true).length;

export const gameAction = game.actions;
