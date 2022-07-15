import { PlayerType } from "../../../enums/enums";
import { CONSTANTS } from "../../../enums/enums";
import { ICell, IBoard } from "../../../interfaces/board";

export const createInitialBoardState = () => {
  const rawCells = new Array(CONSTANTS.AREA).fill(null);

  const mappedCells = rawCells.map((item, i) => {
    return { index: i, player: PlayerType.neutral };
  });

  const initialBoard = mapBoardColumns(mappedCells);
  return initialBoard;
};

function isLatestItemInColumn(cellIndex: number) {
  if (!cellIndex) {
    return false;
  }
  return cellIndex % CONSTANTS.ROWS === 0;
}

function addBoardEmptyColumn(board: IBoard) {
  return [...board, []];
}

function mapBoardColumns(mappedCells: ICell[]) {
  let board: IBoard = addBoardEmptyColumn([]);

  let colunmIndex = 0;
  for (let i = 0; i < CONSTANTS.AREA; i++) {
    if (isLatestItemInColumn(i)) {
      board = addBoardEmptyColumn(board);
      colunmIndex++;
    }
    board[colunmIndex].push(mappedCells[i]);
  }

  return board;
}
