import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { PlayerType } from "../../enums/enums";
import { IGameState } from "../../interfaces/game";
import { paintItemOnClick } from "./utils/changeBoardState";
import { createInitialBoardState } from "./utils/initialBoardState";

const initialBoardState = createInitialBoardState();

const initialState: IGameState = {
  board: initialBoardState,
  turns: 0,
  playerTurn: PlayerType.playerA,
  winStatus: PlayerType.neutral,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    incrementTurn: (state) => {
      state.turns += 1;
    },
    changeBoardState: (state, { payload: columnIndex }) => {
      paintItemOnClick(state, columnIndex);
    },
    resetGame: () => {
      return initialState;
    },
  },
});

export const { incrementTurn, changeBoardState, resetGame } = gameSlice.actions;

export const board = (state: RootState) => state.game.board;
export const turns = (state: RootState) => state.game.turns;
export const playerTurn = (state: RootState) => state.game.playerTurn;
export const winStatus = (state: RootState) => state.game.winStatus;

export default gameSlice.reducer;
