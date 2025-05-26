import React from 'react';
import { PlusIcon } from '../../../../icons';
import { HStack, Text } from '../../../../components';
import cls from './TableButtons.module.scss';

interface AddButtonProps {
    onClick: () => void;
}

export const AddButton = ({ onClick }: AddButtonProps) => {
    return (
        <HStack justify="between" className={cls.addCard} onClick={onClick}>
            <span
                className={cls.addCardResponsiveText}
            >
                Добавить карточку
            </span>
            <button className={cls.button}>
                <PlusIcon />
            </button>
        </HStack>
    );
}; 