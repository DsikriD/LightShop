import { ForwardedRef, forwardRef } from "react";
import { Flex, FlexProps } from "../Flex/Flex";
import React from "react";

type HStackProps = Omit<FlexProps, "direction">;

export const HStack = forwardRef(
  (props: HStackProps, ref?: ForwardedRef<HTMLDivElement>) => {
    return <Flex direction="row" ref={ref} {...props} />;
  }
);

HStack.displayName = "HStack";
