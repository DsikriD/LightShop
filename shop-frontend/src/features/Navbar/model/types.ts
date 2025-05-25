import {
  TextColor,
  TextSize,
  TextWeight,
} from "../../../components/Text/ui/Text";

export type NavbarItemType = "title" | "text" | "button";

export interface NavbarItemConfig {
  type: NavbarItemType;
  text?: string;
  className?: string;
  color?: TextColor;
  size?: TextSize;
  weight?: TextWeight;
  buttonProps?: {};
}
