import React, { ReactNode, useState, useEffect } from "react";
import cls from "./NavbarShared.module.scss";
import { HStack } from "../../../components";
import classNames from "classnames";
import { MainIcon } from "../../../icons";

export type NavbarTheme = "white" | "black";

interface NavbarProps {
  children: ReactNode;
  theme?: NavbarTheme;
}

export const Navbar = (props: NavbarProps) => {
  const { children, theme = "" } = props;

  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <HStack className={classNames(cls.Navbar, cls[`theme-${theme}`])}>
      <HStack maxHeight className={cls.icon}>
        <MainIcon />
      </HStack>
      {children}
    </HStack>
  );
};
