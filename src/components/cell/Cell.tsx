import React from "react";

import { PlayerType } from "../../enums/enums";
import { ICell } from "../../interfaces/board";
import styles from "./Cell.module.css";

const Cell = (props: ICell) => {
  const circleColor = (): string => {
    return props.player === PlayerType.playerA
      ? styles.circlePlayerA
      : props.player === PlayerType.playerB
      ? styles.circlePlayerB
      : styles.circle;
  };

  return (
    <div className={styles.wrapper}>
      <div className={circleColor()} />
    </div>
  );
};

export default Cell;
