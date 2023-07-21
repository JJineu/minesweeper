import { createSlice } from "@reduxjs/toolkit";

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
const initialState: Board = {
  board: [],
};

export const game = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGame: (state, action) => {
      const { width, height } = action.payload;
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
    },
    setMines: (state, action) => {
      const { minesCount, clickedX, clickedY } = action.payload;

      let count = minesCount;
      while (count > 0) {
        let i = Math.floor(Math.random() * state.board[0].length);
        let j = Math.floor(Math.random() * state.board.length);
        if (!state.board[i][j].isMine && !state.board[clickedY][clickedX]) {
          count--;
          state.board[i][j].isMine = true;
        }
      }
    },
    searchNearMines: (state, action) => {
      const { clickedX, clickedY } = action.payload;

    },
  },
});

export const gameAction = game.actions;
