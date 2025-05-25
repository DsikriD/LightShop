import React, { Children } from "react";
import cls from "./FooterItem.module.scss";

export interface FooterItemProps {
  children: React.ReactNode;
}

export const FooterItem = (props: FooterItemProps) => {
  const { children } = props;

  return <div className={cls.FooterItem}>{children}</div>;
};
