import React from "react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import cls from "./ConfirmationModal.module.scss";
import classNames from "classnames";

// Настроим Modal для правильного отображения
Modal.setAppElement("#root");

interface ProductModalProps {
  isOpen: boolean;
  closeModal: () => void;
  action: () => void;
  text: string;
}

export const ConfirmationModal: React.FC<ProductModalProps> = ({
  isOpen,
  closeModal,
  action,
  text,
}) => {
  return (
    <Modal
      className={cls.ConfirmationModal}
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Confirmation Modal"
    >
      <div className={cls.header}>
        <span className={cls.titleheader}>Подтвердите действие</span>
        <button className={cls.closeButton} onClick={closeModal}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>

      <div className={cls.textContainer}>
        <p>{text}</p>
      </div>

      <div className={cls.buttonContainer}>
        <button
          className={classNames(cls.confirmationButton)}
          onClick={() => {
            action();
            closeModal();
          }}
        >
          Подтвердить
        </button>

        <button
          className={classNames(cls.cancellationButton)}
          onClick={closeModal}
        >
          Отмена
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
