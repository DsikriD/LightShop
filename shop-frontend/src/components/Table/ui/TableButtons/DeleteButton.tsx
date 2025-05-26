import React from 'react';
import { TrashIcon } from '../../../../icons';
import cls from './TableButtons.module.scss';

interface DeleteButtonProps {
    onClick: () => void;
}

export const DeleteButton = ({ onClick }: DeleteButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={cls.buttonTrash}
        >
            <TrashIcon />
        </button>
    );
}; 