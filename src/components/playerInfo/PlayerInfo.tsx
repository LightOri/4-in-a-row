import React from "react";

import {
  winStatus as winStatusSelector,
  playerTurn as playerTurnSelector,
} from "../../pages/game/gameSlice";
import { useSelectorHook } from "../../store/hooks";
import { IPlayerInfo } from "../../interfaces/player";
import { PlayerType } from "../../enums/enums";
import styles from "./PlayerInfo.module.css";

const PlayerInfo = (props: IPlayerInfo) => {
  const winStatus = useSelectorHook(winStatusSelector);
  const playerTurn = useSelectorHook(playerTurnSelector);

  const isPlayerWin = winStatus === props.playerId;
  const playerColor =
    props.playerId === PlayerType.playerA ? "playerA" : "playerB";
  const isPlayerTurn = props.playerId === playerTurn;

  return (
    <div className={`${styles.wrapper} ${isPlayerWin ? styles.winner : ""}`}>
      <div className={styles.name}>{props.name}</div>
      <div className={styles[playerColor]} />
      {isPlayerTurn && !isPlayerWin && <div className={styles.turn}>Your Turn:</div>}
      {isPlayerWin && <div className={styles.winMessage}>WIN</div>}
    </div>
  );
};

export default PlayerInfo;
