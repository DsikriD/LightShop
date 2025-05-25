import React from "react";
import cls from "./Text.module.scss";
import classNames from "classnames";

export type TextColor = "black" | "white";
export type TextSize = "20" | "35" | "55";
export type TextWeight = "500" | "700";

interface TextProps {
  text: string;
  color?: TextColor;
  size?: "15" | "20" | "35" | "55";
  weight?: "700" | "500";
  className?: string;
  align?: "center" | "start" | "end";
  wrap?: boolean;
  ellipsis?: boolean;
}

export const Text = ({
  text,
  size = "20",
  color = "black",
  weight = "500",
  className = "",
  align = "start",
  wrap = false,
  ellipsis = false,
}: TextProps) => {
  return (
    <span
      className={classNames(
        cls.text,
        cls[`text--color-${color}`],
        cls[`text--size-${size}`],
        cls[`text--weight-${weight}`],
        cls[`text--align-${align}`],
        { [cls["text--nowrap"]]: !wrap },
        { [cls["text--ellipsis"]]: ellipsis },
        className
      )}
    >
      {text}
    </span>
  );
};
