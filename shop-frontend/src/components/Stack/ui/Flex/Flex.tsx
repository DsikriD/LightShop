import {
  CSSProperties,
  DetailedHTMLProps,
  ForwardedRef,
  forwardRef,
  HTMLAttributes,
  MutableRefObject,
  ReactNode,
} from "react";

import cls from "./Flex.module.scss";
import classNames from "classnames";
import React from "react";

export type FlexJustify = "start" | "center" | "end" | "between";
export type FlexAlign = "start" | "center" | "end";
export type FlexDirection = "row" | "column";
export type FlexGap = "2" | "4" | "5" | "8" | "16" | "20" | "32";

const justifyClasses: Record<FlexJustify, string> = {
  start: cls.justifyStart,
  center: cls.justifyCenter,
  end: cls.justifyEnd,
  between: cls.justifyBetween,
};

const alignClasses: Record<FlexAlign, string> = {
  start: cls.alignStart,
  center: cls.alignCenter,
  end: cls.alignEnd,
};

const directionClasses: Record<FlexDirection, string> = {
  row: cls.directionRow,
  column: cls.directionColumn,
};

const gapClasses: Record<FlexGap, string> = {
  2: cls.gap2,
  4: cls.gap4,
  5: cls.gap5,
  8: cls.gap8,
  16: cls.gap16,
  20: cls.gap20,
  32: cls.gap32,
};

type DivProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export interface FlexProps extends DivProps {
  className?: string;
  children: ReactNode;
  justify?: FlexJustify;
  align?: FlexAlign;
  direction: FlexDirection;
  gap?: FlexGap;
  maxWidth?: boolean;
  maxHeight?: boolean;
  style?: CSSProperties;
  ref?: MutableRefObject<any>;
}

export const Flex = forwardRef(
  (props: FlexProps, ref: ForwardedRef<HTMLDivElement>) => {
    const {
      className,
      children,
      justify = "start",
      align = "center",
      direction = "row",
      gap,
      maxWidth,
      maxHeight,
      style,
      onClick,
      ...otherProps
    } = props;

    const classes = [
      className,
      justifyClasses[justify],
      alignClasses[align],
      directionClasses[direction],
      gap && gapClasses[gap],
    ];

    return (
      <div
        style={style}
        className={classNames(
          cls.Flex,
          { [cls.maxHeight]: maxHeight, [cls.maxWidth]: maxWidth },
          classes
        )}
        onClick={onClick}
        ref={ref}
        {...otherProps}
      >
        {children}
      </div>
    );
  }
);

Flex.displayName = "Flex";
