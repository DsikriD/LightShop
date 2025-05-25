import React, { ReactNode } from "react";
import cls from "./Button.module.scss";
import classNames from "classnames";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  style?: "navbar" | "common";
  type?: "button" | "submit" | "reset";
  width?: "full" | "260";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  style,
  type = "button",
  width = "260",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={classNames(
        cls.button,
        cls[`button--${style}`],
        cls[`button--width-${width}`],
        {}
      )}
    >
      {children}
    </button>
  );
};
