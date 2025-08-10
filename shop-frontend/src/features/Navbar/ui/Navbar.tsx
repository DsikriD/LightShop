import React, { ReactNode, useCallback, useState, useRef, useEffect } from "react";
import cls from "./NavbarShared.module.scss";
import { HStack } from "../../../components";
import classNames from "classnames";
import { MainIcon } from "../../../icons";
import { motion, AnimatePresence } from "framer-motion";

export type NavbarTheme = "white" | "black";

interface NavbarProps {
  children: ReactNode;
  theme?: NavbarTheme;
}

export const Navbar = (props: NavbarProps) => {
  const { children, theme = "" } = props;
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  const handleCloseMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);
  
  const handleToggleMenu = useCallback(() => {
    setMenuOpen(!menuOpen);
  }, [menuOpen]);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (!menuOpen) return;
    const menu = menuRef.current;
    const burger = burgerRef.current;
    if (
      menu &&
      !menu.contains(event.target as Node) &&
      burger &&
      !burger.contains(event.target as Node)
    ) {
      setMenuOpen(false);
    }
  }, [menuOpen]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  return (
    <nav className={classNames(cls.Navbar, cls[`theme-${theme}`])}>
      <HStack maxHeight className={cls.icon}>
        <MainIcon />
      </HStack>
      {/* Основное меню для десктопа */}
      <HStack gap="32" className={cls.desktopMenu}>{children}</HStack>
      {/* Бургер-меню для мобильных (справа) */}
      <div className={cls.burgerWrapper}>
        <button
          className={cls.burger}
          aria-label="Открыть меню"
          onClick={handleToggleMenu}
          ref={burgerRef}
        >
          {/* Классическая SVG-иконка бургера */}
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect y="7" width="32" height="3" rx="1.5" fill="#222" />
            <rect y="15" width="32" height="3" rx="1.5" fill="#222" />
            <rect y="23" width="32" height="3" rx="1.5" fill="#222" />
          </svg>
        </button>
        {/* Выпадающее меню */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className={cls.mobileMenu}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              style={{ pointerEvents: 'auto' }}
              onClick={handleCloseMenu}
              ref={menuRef}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};
