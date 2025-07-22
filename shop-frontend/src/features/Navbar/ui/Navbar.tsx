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
  
  const handleOpenMenu = useCallback(() => {
    setMenuOpen(true);
  }, []);

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
      <div className={cls.desktopMenu}>{children}</div>
      {/* Бургер-меню для мобильных (справа) */}
      <div className={cls.burgerWrapper}>
        <button
          className={cls.burger}
          aria-label="Открыть меню"
          onClick={handleOpenMenu}
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
              ref={menuRef}
            >
              {React.Children.map(children, (child, idx) => {
                if (React.isValidElement(child)) {
                  const childProps = child.props as any;
                  // Рекурсивно навешиваем onClick на NavLink и Button внутри
                  const processSubtree = (node: any): any => {
                    if (React.isValidElement(node)) {
                      const type = (node.type as any)?.name;
                      if (type === 'NavLink' || type === 'Button') {
                        const prevOnClick = (node.props as any).onClick;
                        const handleClick = (e: any) => {
                          if (typeof prevOnClick === 'function') prevOnClick(e);
                          handleCloseMenu();
                        };
                        return React.cloneElement(node, { ...(prevOnClick ? { onClick: handleClick } : {}) });
                      }
                      // Рекурсивно для вложенных
                      if (node.props && (node.props as any).children) {
                        const children = (node.props as any).children;
                        return React.cloneElement(node, {}, children ? React.Children.map(children, processSubtree) : undefined);
                      }
                    }
                    return node;
                  };
                  return React.createElement(
                    child.type,
                    { ...childProps, key: child.key ?? idx, onClick: handleCloseMenu },
                    childProps.children ? React.Children.map(childProps.children, processSubtree) : undefined
                  );
                }
                return child;
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};
