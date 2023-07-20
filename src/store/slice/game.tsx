import { createSlice } from "@reduxjs/toolkit";

const initialState = {
};

export const game = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGame: (state, action) => {
      const { id, content } = action.payload;
    },
  },
});

export const gameAction = game.actions;
