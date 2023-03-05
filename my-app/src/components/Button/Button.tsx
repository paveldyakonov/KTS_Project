import React from "react";

import styles from "./Button.module.scss";

export type ButtonProps = React.PropsWithChildren<{
  children?: React.ReactNode;
  size?: string;
  color?: string;
}> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({ ...props }): any => {
  let classBtn: string = styles.button;
  if (props.size === "big") {
    classBtn = styles.big_button;
  }
  if (props.color === "white") {
    classBtn += " " + styles.white;
  }

  return (
    <button {...props} className={classBtn}>
      <div>{props.children}</div>
    </button>
  );
};

export default Button;
