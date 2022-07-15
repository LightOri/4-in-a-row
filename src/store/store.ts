import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "../pages/game/gameSlice";

export const store = configureStore({
  reducer: {
    game: gameReducer,
  },
});

export type GameDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
