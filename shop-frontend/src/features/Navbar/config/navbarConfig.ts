import { NavbarItemConfig } from "../model/types";

export const navbarMainConfig: NavbarItemConfig[] = [
  { type: "text", size: "20", weight: "500", color: "black", text: "О нас", path: "/" },
  { type: "text", size: "20", weight: "500", color: "black", text: "Каталог", path: "/catalog" },
  {
    type: "text",
    size: "20",
    weight: "500",
    color: "black",
    text: "Доставка и оплата",
  },
  {
    type: "button",
    text: "Связаться с нами",
    buttonProps: {
      className: "navbar-button",
    },
  },
];

export const navbarProductConfig: NavbarItemConfig[] = [
  {
    type: "text",
    size: "35",
    weight: "700",
    color: "white",
    text: "Карточки товаров",
  },
];
