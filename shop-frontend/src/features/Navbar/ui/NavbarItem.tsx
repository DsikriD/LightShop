import React, { ReactNode } from "react";
import cls from "./NavbarShared.module.scss";
import { HStack } from "../../../components";

export interface NavbarItemProps {
  children: ReactNode;
}

export const NavbarItem = (props: NavbarItemProps) => {
  const { children } = props;

  return <HStack className={cls.NavbarItem}>{children}</HStack>;
};
