import React from "react";
import { NavbarItemConfig } from "../model/types";
import { Button, Text } from "../../../components";
import { NavbarItem } from "../ui/NavbarItem";
import { TextSize } from "../../../components/Text/ui/Text";

const sizsed = (windowWidth?: number) : TextSize => {
if (windowWidth && windowWidth < 456) {
    return "20";
  } else {
    return "35";
  }
};

export const renderNavbarItems = (config: NavbarItemConfig[], windowWidth?: number) =>
  
  config.map((item, index) => (
    <NavbarItem key={index}>
      {item.type === "text" && (
        <Text
          color={item.color}
          size={sizsed(windowWidth)}
          weight={item.weight}
          text={item.text!}
        />
      )}
      {item.type === "button" && (
        <Button style="navbar">
          <Text color="white" size="20" weight="500" text={item.text!} />
        </Button>
      )}
    </NavbarItem>
  ));
