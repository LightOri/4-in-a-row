import { PlayerType } from "../enums/enums";

export type IWiningState =
  | PlayerType.neutral
  | PlayerType.playerA
  | PlayerType.playerB;

export interface ICell {
  index: number;
  player: PlayerType;
}

export type IColumn = ICell[];

export type IBoard = IColumn[];
