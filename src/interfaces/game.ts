import { PlayerType } from "../enums/enums";
import { IWiningState, IBoard } from "./board";

export interface IGameState {
  board: IBoard;
  turns: number;
  playerTurn: PlayerType.playerA | PlayerType.playerB;
  winStatus: IWiningState;
}