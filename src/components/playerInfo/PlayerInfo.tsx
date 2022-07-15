import React from "react";

import { winStatus as winStatusSelector } from "../../pages/game/gameSlice";
import { useSelectorHook } from "../../store/hooks";
import { IPlayerInfo } from "../../interfaces/player";
import styles from "./PlayerInfo.module.css";

const PlayerInfo = (props: IPlayerInfo) => {
  const winStatus = useSelectorHook(winStatusSelector);

  const isPlayerWin = winStatus === props.playerId;

  return (
    <div className={`${styles.wrapper} ${isPlayerWin ? styles.winner : ""}`}>
      <div className={styles.name}>{props.name}</div>
      {isPlayerWin && <div className={styles.winMessage}>WIN</div>}
    </div>
  );
};

export default PlayerInfo;
