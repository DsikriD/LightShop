import React from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '../../../../icons';
import cls from './TableButtons.module.scss';
import { Text } from "../../../../components";

interface NumberButtonProps {
    number: number;
    onClick: () => void;
    disabled: boolean;
}

export const NumberButton = ({ onClick, number, disabled }: NumberButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={cls.buttonNumber}
            disabled={disabled}
        >
            <Text color={!disabled? "black" : "white"} weight="700" text={number.toLocaleString()}/>
        </button>
    );
}; 