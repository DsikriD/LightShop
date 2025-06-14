import React, { ReactNode } from "react";
import cls from "./NavbarShared.module.scss";
import { HStack } from "../../../components";
import classNames from "classnames";

export type NavbarTheme = "white" | "black";

interface NavbarProps {
  children: ReactNode;
  theme?: NavbarTheme;
}

export const Navbar = (props: NavbarProps) => {
  const { children, theme = "" } = props;

  return (
    <HStack className={classNames(cls.Navbar, cls[`theme-${theme}`])}>
      <HStack maxHeight className={cls.icon}>
        Icon
      </HStack>
      {children}
    </HStack>
  );
};
