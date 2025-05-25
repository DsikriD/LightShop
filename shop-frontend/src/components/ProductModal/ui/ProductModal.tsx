import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { HStack, Text, VStack } from "../../../components";
import { CloseIcon } from "../../../icons";
import cls from "./ProductModal.module.scss";
import { Product } from "../../../pages/ProductPage/models/typeProducts";

Modal.setAppElement("#root");

interface ProductModalProps {
  isOpen: boolean;
  closeModal: () => void;
  handleSubmit: (product: Product) => void;
  productToEdit?: Product;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  closeModal,
  productToEdit,
  handleSubmit,
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
    };

    return (
      <HStack className={cls.attributeContainer}>
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
      </HStack>
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

  return (
    <Modal
      className={cls.ProductModal}
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Product Modal"
    >
      <HStack justify="between" className={cls.header}>
        <Text
          size="35"
          weight="700"
          text={productToEdit ? "Редактировать карточку" : "Добавить карточку"}
        />
        <button className={cls.closeButton} onClick={closeModal}>
          <CloseIcon />
        </button>
      </HStack>
      <form onSubmit={onSubmit}>
        <HStack gap="16" className={cls.cardBody}>
          <VStack gap="16" maxHeight align="start">
            {[...textFields, ...boolFields]
              .slice(0, Math.ceil((textFields.length + boolFields.length) / 2))
              .map(([label, key, type]) =>
                renderField(label, key, type ?? "text")
              )}
          </VStack>
          <VStack gap="16" maxHeight align="start">
            {[...textFields, ...boolFields]
              .slice(Math.ceil((textFields.length + boolFields.length) / 2))
              .map(([label, key, type]) =>
                renderField(label, key, type ?? "text")
              )}
          </VStack>
        </HStack>
        <HStack gap="16" maxWidth maxHeight className={cls.prefooterContainer}>
          <VStack style={{ border: "1px solid red" }} maxHeight align="start">
            <HStack maxHeight className={cls.attributeContainer}>
              <Text
                className={cls.attributeLabel}
                size="15"
                weight="700"
                text="Изображение:"
              />
              <input
                className={cls.imageInput}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </HStack>
          </VStack>
          <HStack
            style={{ border: "1px solid red" }}
            maxHeight
            maxWidth
            align="start"
          >
            <Text
              className={cls.attributeLabel}
              size="15"
              weight="700"
              text="Описание карточки:"
            />
            <HStack maxHeight maxWidth>
              <textarea
                className={cls.description}
                value={formState.description || ""}
                onChange={(e) => onChange("description", e.target.value)}
                required
              />
            </HStack>
          </HStack>
        </HStack>
        <HStack justify="end" className={cls.footerContainer}>
          <button type="submit" className={cls.submitButton}>
            <Text
              size="15"
              weight="700"
              color="white"
              text={productToEdit ? "Обновить" : "Добавить"}
            />
          </button>
        </HStack>
      </form>
    </Modal>
  );
};

export default ProductModal;
