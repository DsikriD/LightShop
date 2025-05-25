import { ForwardedRef, forwardRef } from "react";
import { Flex, FlexProps } from "../Flex/Flex";
import React from "react";

type VStackProps = Omit<FlexProps, "direction">;

export const VStack = forwardRef(
  (props: VStackProps, ref?: ForwardedRef<HTMLDivElement>) => {
    const { align = "start" } = props;
    return <Flex {...props} ref={ref} direction="column" align={align} />;
  }
);

VStack.displayName = "VStack";
