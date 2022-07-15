import React from "react";

import styles from "./ActionButton.module.css";

interface ActionButtonProps {
  name: string;
  handler: () => void;
}

const ActionButton = (props: ActionButtonProps) => {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={props.handler}
    >{props.name}</button>
  );
};

export default ActionButton;
