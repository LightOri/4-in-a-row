import React from "react";

import Cell from "../cell/Cell";
import { useDispatchHook } from "../../store/hooks";
import {changeBoardState} from '../../pages/game/gameSlice';
import {IColumn} from '../../interfaces/board';
import styles from "./Column.module.css";


interface ColumnProps {
  columnIndex: number;
  columnItems: IColumn;
}

const Column = (props: ColumnProps) => {
  const dispatch = useDispatchHook();

  const handleColumnClick = () => {
    dispatch(changeBoardState(props.columnIndex))
  }

  return (
    <div className={styles.wrapper} onClick={handleColumnClick}>
      {props.columnItems.map((item, i) => (
        <Cell key={i} index={item.index} player={item.player} />
      ))}
    </div>
  );
};

export default Column;
