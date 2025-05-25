import React from "react";
import { NavbarItemConfig } from "../model/types";
import { Button, Text } from "../../../components";
import { NavbarItem } from "../ui/NavbarItem";

export const renderNavbarItems = (config: NavbarItemConfig[]) =>
  config.map((item, index) => (
    <NavbarItem key={index}>
      {item.type === "text" && (
        <Text
          color={item.color}
          size={item.size}
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
