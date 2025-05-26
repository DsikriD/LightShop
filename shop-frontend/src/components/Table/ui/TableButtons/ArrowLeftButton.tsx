import React from 'react';
import { ArrowLeftIcon } from '../../../../icons';
import cls from './TableButtons.module.scss';

interface ArrowLeftButtonProps {
    onClick: () => void;
    disabled: boolean;
}

export const ArrowLeftButton = ({ onClick, disabled }: ArrowLeftButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={cls.buttonLeftArrow}
            disabled={disabled}
        >
            <ArrowLeftIcon/>
        </button>
    );
}; 