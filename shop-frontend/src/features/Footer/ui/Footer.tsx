import React from "react";
import { Button, HStack, VStack, Text } from "../../../components";
import cls from "./Footer.module.scss";

interface FooterProps {}

export const Footer = (props: FooterProps) => {
  const {} = props;

  return (
    <HStack maxWidth className={cls.Footer}>
      <VStack maxHeight align="start" className={cls["Footer-item-1"]}>
        ЛОГО
      </VStack>
      <VStack maxHeight align="start" gap="20" className={cls["Footer-item-2"]}>
        <Button>
          <Text size="20" text="О нас" />
        </Button>
        <Button>
          <Text size="20" text="Каталог" />
        </Button>
        <Button>
          <Text size="20" text="Доставка и оплата" />
        </Button>
        <Button>
          <Text size="20" text="Связаться с нами" />
        </Button>
      </VStack>
      <VStack gap="20" maxHeight align="start" className={cls["Footer-item-3"]}>
        <Text size="20" weight="500" text="Aдрес" />
        <Text
          size="20"
          weight="500"
          text="Москва, Нахимовский просп., 24, стр. 1 Центр дизайна и интерьера “Экспострой”"
        />
      </VStack>
    </HStack>
  );
};
