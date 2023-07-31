import { configureStore } from "@reduxjs/toolkit";
import { game } from "./slice/game";

export const store = configureStore({
  reducer: {
    game: game.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;