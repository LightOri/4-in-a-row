import React from "react";

import ActionButton from "../../components/actionButton/ActionButton";
import PlayerInfo from "../../components/playerInfo/PlayerInfo";
import Board from "../../components/board/Board";
import { board as boardSelector, resetGame } from "./gameSlice";
import { useSelectorHook, useDispatchHook } from "../../store/hooks";

import styles from "./Game.module.css";
import { PlayerType } from "../../enums/enums";

const Game = () => {
  const board = useSelectorHook(boardSelector);
  const dispatch = useDispatchHook();

  return (
    <>
      <div className={styles.header}>
        <ActionButton name="New Game" handler={() => dispatch(resetGame())} />
      </div>
      <div className={styles.mainArea}>
        <PlayerInfo name="Player A" playerId={PlayerType.playerA} />
        <Board board={board} />
        <PlayerInfo name="Player B" playerId={PlayerType.playerB} />
      </div>
      <div className={styles.controls}></div>
    </>
  );
};

export default Game;
