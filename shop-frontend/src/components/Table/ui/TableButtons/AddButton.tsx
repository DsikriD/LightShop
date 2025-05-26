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
            <Text 
                text="Добавить карточку" 
                weight="700" 
                size="20" 
                className={cls.addCardText}
            />
            <button className={cls.button}>
                <PlusIcon />
            </button>
        </HStack>
    );
}; 