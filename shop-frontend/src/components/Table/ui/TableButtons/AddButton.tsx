import React from 'react';
import { PlusIcon } from '../../../../icons';
import { HStack } from '../../../../components';
import cls from './TableButtons.module.scss';

interface AddButtonProps {
    onClick: () => void;
}

export const AddButton = ({ onClick }: AddButtonProps) => {
    return (
        <HStack gap="8" justify="between" className={cls.addCard} onClick={onClick}>
            <span>
                Добавить карточку
            </span>
            <button className={cls.button}>
                <PlusIcon />
            </button>
        </HStack>
    );
}; 