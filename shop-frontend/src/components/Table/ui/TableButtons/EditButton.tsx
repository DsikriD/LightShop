import React from 'react';
import { EditIcon } from '../../../../icons';
import cls from './TableButtons.module.scss';

interface EditButtonProps {
    onClick: () => void;
}

export const EditButton = ({ onClick }: EditButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={cls.buttonEdit}
        >
            <EditIcon />
        </button>
    );
}; 