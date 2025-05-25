import React from "react";
import cls from "./HomePage.module.scss";
import { HStack, VStack, Text, Button } from "../../../components";
import { Footer } from "../../../features/Footer/ui/Footer";

export const HomePage = () => {
  return (
    <VStack maxHeight maxWidth className={cls.HomePage}>
      <VStack
        justify="center"
        align="center"
        maxWidth
        className={cls.Rectangle1}
      >
        <VStack
          gap="20"
          justify="center"
          align="center"
          className={cls.content1}
        >
          <Text
            wrap
            align="center"
            color="white"
            size="55"
            weight="700"
            text="Современное освещение для вашего дома и бизнеса"
          />
          <Text
            wrap
            align="center"
            color="white"
            size="20"
            text="Стильные и энергоэффективные светильники подчеркивают уникальность вашего пространства и создают идеальную атмосферу"
          />
        </VStack>
      </VStack>

      <HStack className={cls.content2}>
        <HStack maxHeight className={cls.content21}>
          <Text
            wrap
            weight="700"
            size="35"
            text="Тристар Люкс —  ваш надежный партнер в мире светотехники"
          />
        </HStack>
        <HStack maxHeight className={cls.content22}>
          <Text
            wrap
            align="start"
            weight="700"
            size="20"
            text="Мы предлагаем широкий ассортимент продукции для создания уюта и уникальной атмосферы в вашем интерьере"
          />
        </HStack>
        <HStack maxHeight className={cls.content23}>
          <Text
            wrap
            align="start"
            weight="700"
            size="20"
            text="В нашем каталоге только стильные, качественные светильники и аксессуары для их установки и обслуживания"
          />
        </HStack>
      </HStack>
      <HStack className={cls.content3}>
        <HStack maxHeight justify="between" maxWidth className={cls.content31}>
          <VStack maxHeight>INFO</VStack>
          <VStack
            maxHeight
            gap="20"
            justify="center"
            align="center"
            className={cls.content311}
          >
            <Text
              size="20"
              weight="500"
              text="Мы специализируемся на продаже различных видов освещения: от изысканных светильников и люстр до элегантных торшеров и настольных ламп, которые могут стать как основным акцентом, так и дополнительным источником света"
            />
            <Button width="full" style="navbar">
              <Text
                size="20"
                weight="700"
                color="white"
                text="Получить консультацию менеджера"
              />
            </Button>
          </VStack>
        </HStack>
      </HStack>
      <HStack align="start" justify="between" className={cls.content4}>
        <VStack gap="20">
          <Button width="260">
            <Text size="20" weight="700" text="Премиум" />
          </Button>
          <Button width="260">
            <Text size="20" weight="700" text="Люстры" />
          </Button>
          <Button width="260">
            <Text size="20" weight="700" text="Светильники" />
          </Button>
          <Button width="260">
            <Text size="20" weight="700" text="Бра" />
          </Button>
          <Button width="260">
            <Text size="20" weight="700" text="Встраиваемые" />
          </Button>
          <Button width="260">
            <Text size="20" weight="700" text="Настольные" />
          </Button>
          <Button width="260">
            <Text size="20" weight="700" text="Подвесные" />
          </Button>
          <Button width="260">
            <Text size="20" weight="700" text="Подвесные" />
          </Button>
          <Button width="260">
            <Text size="20" weight="700" text="Споты" />
          </Button>
          <Button width="260">
            <Text size="20" weight="700" text="Торшеры" />
          </Button>
          <Button width="260">
            <Text size="20" weight="700" text="Трековые" />
          </Button>
          <Button width="260">
            <Text size="20" weight="700" text="Уличные" />
          </Button>
          <Button width="260">
            <Text size="20" weight="700" text="Аксессуары" />
          </Button>
        </VStack>
        <VStack gap="20">
          <HStack
            style={{ width: "760px", height: "740px", background: "purple" }}
          >
            info
          </HStack>
          <Button width="full" style="navbar">
            <Text
              size="20"
              weight="700"
              color="white"
              text="Открыть полный каталог товаров"
            />
          </Button>
        </VStack>
      </HStack>

      <HStack align="start" justify="between" className={cls.content5}>
        <Text weight="700" size="35" text="Доставка и оплата" />
      </HStack>

      <HStack className={cls.content6}>content6</HStack>

      <Footer />
    </VStack>
  );
};
