import React from "react";

import Column from "../column/Column";
import {IBoard} from '../../interfaces/board';
import styles from "./Board.module.css";

interface BoardProps {
  board: IBoard;
}

const Board = (props: BoardProps) => {
  const renderBoard = () => {
    return props.board.map((item, i) => (
      <Column key={i} columnIndex={i} columnItems={item}/>
    ));
  };

  return <div className={styles.wrapper}>{renderBoard()}</div>;
};

export default Board;
