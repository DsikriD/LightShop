import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { HStack, Text, VStack } from "../../../components";
import { CloseIcon } from "../../../icons";
import cls from "./ProductModal.module.scss";
import { Product } from "../../../pages/ProductPage/models/typeProducts";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

Modal.setAppElement("#root");

type Action = "Delete" | "Edit" | "Add";

interface ProductModalProps {
  isOpen: boolean;
  closeModal: () => void;
  handleSubmit: (product: Product) => void;
  productToEdit?: Product;
  action: Action;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  closeModal,
  productToEdit,
  handleSubmit,
  action,
}) => {
  const [formState, setFormState] = useState<Partial<Product>>({});

  useEffect(() => {
    setFormState(productToEdit || {});
  }, [productToEdit]);

  const onChange = (key: keyof Product, value: any) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit({
      ...formState,
      id: productToEdit?.id || "",
      power: Number(formState.power),
      illuminated_area: Number(formState.illuminated_area),
      quantity: Number(formState.quantity),
      height: Number(formState.height),
      diameter: Number(formState.diameter),
      length: Number(formState.length),
      width: Number(formState.width),
      weight: Number(formState.weight),
      luminous_flux: Number(formState.luminous_flux),
      color_temperature: Number(formState.color_temperature),
      cri_index: Number(formState.cri_index),
    } as Product);
    closeModal();
  };

  const handleImageUpload = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          onChange("image", reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const renderField = (label: string, key: keyof Product, type = "text") => {
    const value = formState[key];

    const commonProps = {
      className: cls.input,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        onChange(key, type === "checkbox" ? e.target.checked : e.target.value),
      disabled: action === "Delete",
    };

    return (
      <VStack
        maxWidth
        className={cls.attributeContainer}
        key={String(label) + String(key)}
      >
        <Text
          className={cls.attributeLabel}
          size="15"
          weight="700"
          text={label}
        />
        {type === "checkbox" ? (
          <input {...commonProps} type="checkbox" checked={!!value} />
        ) : (
          <input
            {...commonProps}
            type={type}
            value={typeof value === "boolean" ? "" : value ?? ""}
          />
        )}
      </VStack>
    );
  };

  const textFields: [string, keyof Product, string?][] = [
    ["Название", "name"],
    ["Артикул", "article"],
    ["Производитель", "manufacturer"],
    ["Категория", "category"],
    ["Стиль", "style"],
    ["Интерьер", "interior"],
    ["Длина, мм", "length", "number"],
    ["Высота, мм", "height", "number"],
    ["Ширина, мм", "width", "number"],
    ["Диаметр, мм", "diameter", "number"],
    ["Вес, грамм", "weight", "number"],
    ["Мощность, Вт", "power", "number"],
    ["Освещение, кв.м", "illuminated_area", "number"],
    ["Форма", "form"],
    ["Кол-во", "quantity", "number"],
    ["Коллекция", "collection"],
    ["Тип", "type"],
    ["Материал", "material"],
    ["Типы ламп", "lamp_types"],
    ["Световой поток, Lm", "luminous_flux", "number"],
    ["Температура, K", "color_temperature", "number"],
    ["Индекс CRI", "cri_index", "number"],
    ["IP-защита", "ip_rating"],
    ["Арматура - материал", "frame_material"],
    ["Арматура - цвет", "frame_color"],
    ["Арматура - поверхность", "frame_surface"],
    ["Плафон - материал", "shade_material"],
    ["Плафон - цвет", "shade_color"],
    ["Плафон - поверхность", "shade_surface"],
  ];

  const boolFields: [string, keyof Product][] = [
    ["Любой потолок", "any_ceiling"],
    ["С диммером", "has_dimmer"],
    ["Регулировка высоты", "adjustable_height"],
    ["Управляемый светильник", "has_controller"],
    ["Управление пультом", "has_remote"],
    ["Пульт в комплекте", "has_remote_included"],
    ["Встроенные светодиоды", "built_in_led"],
    ["Wi-Fi управление", "wifi_control"],
  ];

  const actionName: Record<string, string> = {
    Delete: "Удалить",
    Add: "Добавить",
    Edit: "Обновить",
  };

  const actionTitle: Record<string, string> = {
    Delete: "Удалить карточку",
    Add: "Добавить карточку",
    Edit: "Редактировать карточку",
  };

  return (
    <Modal
      className={cls.ProductModal}
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Product Modal"
    >
      <HStack className={cls.header} maxWidth>
        <HStack justify="start" maxHeight maxWidth>
          <span className={cls.headerTitle}>{actionTitle[action]}</span>
        </HStack>
        <HStack style={{ width: "60px" }} maxHeight>
          <button className={cls.closeButton} onClick={closeModal}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </HStack>
      </HStack>

      <div className={cls.modalContent}>
        <form id="productForm" onSubmit={onSubmit}>
          <HStack gap="16" className={cls.cardBody}>
            <VStack gap="16" maxWidth maxHeight align="start">
              {[...textFields, ...boolFields].map(([label, key, type]) =>
                renderField(label, key, type ?? "text")
              )}
              {action != "Delete" && (
                <VStack maxHeight maxWidth className={cls.attributeContainer}>
                  <Text
                    className={cls.attributeLabel}
                    size="15"
                    weight="700"
                    text="Изображение:"
                  />
                  <label className={`${cls.imageInput} ${cls[action]}`}>
                    {formState.image ? "Изменить изображение" : "Выбрать изображение"}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      style={{ display: "none" }}
                    />
                  </label>
                </VStack>
              )}
              <VStack maxHeight maxWidth align="start" className={cls.descriptionContainer}>
                <Text
                  className={cls.attributeLabel}
                  size="15"
                  weight="700"
                  text="Описание карточки:"
                />
                <textarea
                  className={cls.description}
                  value={formState.description || ""}
                  onChange={(e) => onChange("description", e.target.value)}
                  required
                  disabled={action === "Delete"}
                />
              </VStack>
            </VStack>
          </HStack>
        </form>
      </div>

      <HStack className={cls.footer} justify="center" maxWidth>
        <button
          type="submit"
          form="productForm"
          className={`${cls.submitButton} ${cls[action]}`}
        >
          <span>{actionName[action]}</span>
        </button>
      </HStack>
    </Modal>
  );
};

export default ProductModal;
