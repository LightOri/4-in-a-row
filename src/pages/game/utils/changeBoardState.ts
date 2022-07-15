import { PlayerType } from "../../../enums/enums";
import { CONSTANTS } from "../../../enums/enums";
import { IColumn, IBoard, IWiningState } from "../../../interfaces/board";
import { IGameState } from "../../../interfaces/game";

export function paintItemOnClick(state: IGameState, columnIndex: number) {
  const column = state.board[columnIndex];
  const paintedItemIndex = findTopPaintedItem(column);
  const indexToUpdate = isColumnEmpty(paintedItemIndex)
    ? column.length - 1
    : paintedItemIndex - 1;

  if (isColumnFull(paintedItemIndex) || state.winStatus) {
    return;
  }
  updateColumnState(state, columnIndex, indexToUpdate);
  updateTurnsCount(state);

  if (checkForWin(state)) {
    updateWinStatus(state);
  } else {
    updatePlayerTurn(state);
  }
}

function isColumnEmpty(index: number) {
  return index === -1;
}
function isColumnFull(index: number) {
  return index === 0;
}

function findTopPaintedItem(column: IColumn) {
  return column.findIndex((item) => item.player !== PlayerType.neutral);
}

function updateColumnState(
  state: IGameState,
  columnIndex: number,
  indexToUpdate: number
) {
  state.board[columnIndex][indexToUpdate].player = state.playerTurn;
}

function updateTurnsCount(state: IGameState) {
  state.turns += 1;
}

function updatePlayerTurn(state: IGameState) {
  if (state.playerTurn === PlayerType.playerA) {
    state.playerTurn = PlayerType.playerB;
  } else {
    state.playerTurn = PlayerType.playerA;
  }
}

function checkForWin(state: IGameState): boolean {
  const status =
    checkHorizontally(state.board) ||
    checkVertically(state.board) ||
    checkDiagonally(state.board);

  return status;
}

function checkHorizontally(board: IBoard): boolean {
  const rowsMatrix = [];

  for (let i = 0; i < CONSTANTS.ROWS; i++) {
    const row = [];
    for (let j = 0; j < CONSTANTS.COLUMNS; j++) {
      row.push(board[j][i]);
    }
    rowsMatrix.push(row);
  }

  const trimmedBoard = trimmSmallRows(rowsMatrix);
  return checkForMatch(trimmedBoard);
}

function checkVertically(board: IBoard): boolean {
  const trimmedBoard = trimmSmallRows(trimmNeutralCells(board));
  return checkForMatch(trimmedBoard);
}

function checkDiagonally(board: IBoard): boolean {
  const diagonalMatrix = trimmFullyNeutralRows(
    trimmSmallRows(mapDiagonalMatrix(board))
  );
  const reverseDiagonalMatrix = trimmFullyNeutralRows(
    trimmSmallRows(mapReverseDiagonalMatrix(board))
  );

  return checkForMatch(diagonalMatrix) || checkForMatch(reverseDiagonalMatrix);
}

function mapDiagonalMatrix(board: IBoard): IBoard {
  const diagonalsList = [];
  // diagonals up to first main axis
  for (let row = 0; row < board.length; row++) {
    const diagonalItems = [];
    for (
      let col = 0, nextElementRow = row;
      nextElementRow >= 0;
      col++, nextElementRow--
    ) {
      if (board[nextElementRow][col] !== undefined) {
        diagonalItems.push(board[nextElementRow][col]);
      }
    }
    diagonalsList.push(diagonalItems);
  }

  // diagonals after first main axis
  for (let col = 1; col < board[0].length; col++) {
    let diagonal = [];
    for (
      let nextElementCol = col, nextElementRow = board.length - 1;
      nextElementRow >= 0 && nextElementCol < board[0].length;
      nextElementRow--, nextElementCol++
    ) {
      diagonal.push(board[nextElementRow][nextElementCol]);
    }
    diagonalsList.push(diagonal);
  }

  return diagonalsList;
}

function mapReverseDiagonalMatrix(board: IBoard): IBoard {
  const diagonalsList = [];
  // diagonals up to first main axis
  for (let row = 0; row < board.length; row++) {
    const diagonalItems = [];
    for (
      let col = board[0].length - 1, nextElementRow = row;
      nextElementRow >= 0;
      col--, nextElementRow--
    ) {
      if (board[nextElementRow][col] !== undefined) {
        diagonalItems.push(board[nextElementRow][col]);
      }
    }
    diagonalsList.push(diagonalItems);
  }

  // diagonals after first main axis
  for (let col = board[0].length - 2; col >= 0; col--) {
    let diagonal = [];
    for (
      let nextElementCol = col, nextElementRow = board.length - 1;
      nextElementRow >= 0 && nextElementCol >= 0;
      nextElementRow--, nextElementCol--
    ) {
      diagonal.push(board[nextElementRow][nextElementCol]);
    }
    diagonalsList.push(diagonal);
  }

  return diagonalsList;
}

function rowChecker(row: IColumn) {
  const initialValue = { matchCount: 0, prevPlayer: 0 };

  const scoreTable = row.reduce((acc, val) => {
    if (acc.matchCount === CONSTANTS.MATCH_COUNT) {
      return acc;
    } else if (val.player === PlayerType.neutral) {
      return initialValue;
    } else if (val.player !== acc.prevPlayer) {
      return { matchCount: 1, prevPlayer: val.player };
    } else {
      acc.matchCount += 1;
      return acc;
    }
  }, initialValue);

  return scoreTable.matchCount;
}

function checkForMatch(board: IBoard): boolean {
  let state = false;

  board.forEach((item) => {
    if (rowChecker(item) === CONSTANTS.MATCH_COUNT) {
      state = true;
    }
  });

  return state;
}

function trimmNeutralCells(board: IBoard): IBoard {
  const withoutNeutralCells = board.map((item) =>
    item.filter((item) => item.player)
  );
  return withoutNeutralCells;
}

function trimmSmallRows(board: IBoard): IBoard {
  const withoutSmallRows = board.filter(
    (item) => item.length >= CONSTANTS.MATCH_COUNT
  );
  return withoutSmallRows;
}

function trimmFullyNeutralRows(board: IBoard): IBoard {
  const withoutFullyNeutralRows = board.filter(
    (item) =>
      item.reduce((acc, item) => {
        const playerToNumber = item.player ? 1 : 0;
        return acc + playerToNumber;
      }, 0) >= CONSTANTS.MATCH_COUNT
  );
  return withoutFullyNeutralRows;
}

function updateWinStatus(state: IGameState) {
  state.winStatus = state.playerTurn as IWiningState;
}
