import type { ReactNode } from "react"
import { HStack } from "../../../components"
import styles from "./NavbarShared.module.scss"
import React from "react"

export interface NavbarItemProps {
  children: ReactNode
  className?: string
}

export const NavbarItem = (props: NavbarItemProps) => {
  const { children, className } = props

  return <HStack className={`${styles.navbarItem} ${className || ""}`}>{children}</HStack>
}
