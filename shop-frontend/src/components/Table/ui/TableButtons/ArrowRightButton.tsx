import React from 'react';
import {ArrowRightIcon } from '../../../../icons';
import cls from './TableButtons.module.scss';

interface ArrowRightButtonProps {
    onClick: () => void;
    disabled: boolean;
}

export const ArrowRightButton = ({ onClick, disabled }: ArrowRightButtonProps) => {

    return (
        <button
            onClick={onClick}
            className={cls.buttonRightArrow}
            disabled={disabled}
        >
           {<ArrowRightIcon/>}
        </button>
    );
}; 