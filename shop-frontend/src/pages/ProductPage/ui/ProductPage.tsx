import React, { useEffect, useState } from "react";
import cls from "./ProductPage.module.scss";
import {
  ConfirmationModal,
  HStack,
  ProductModal,
  Table,
} from "../../../components";
import { Product } from "../models/typeProducts";
import { fetchProducts } from "../services/fetchProducts";
import { useAppDispatch, useAppSelector } from "../../../store";
import { getProducts } from "../slice/productSelector";
import { deleteProduct } from "../services/deleteProduct ";
import { updateProduct } from "../services/updateProduct";
import { addProduct } from "../services/addProduct";
import { Text } from "../../../components";
import { PlusIcon } from "../../../icons";

const productColumns = [
  { key: "id", header: "ID" },
  { key: "name", header: "Название" },
  { key: "description", header: "Описание" },
  {
    key: "quantity",
    header: "Кол-во",
  },
];

export const ProductPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationModal, setIsConfirmationModal] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  const products = useAppSelector(getProducts);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const openModal = (product?: Product) => {
    setProductToEdit(product || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setProductToEdit(null);
    setIsModalOpen(false);
  };

  const openConfirmationModal = (product: Product) => {
    setProductToEdit(product);
    setIsConfirmationModal(true);
  };

  const closeConfirmationModal = () => {
    setProductToEdit(null);
    setIsConfirmationModal(false);
  };

  const saveProduct = (product: Product) => {
    if (!product) return;

    if (productToEdit) {
      dispatch(updateProduct(product))
        .unwrap()
        .then(() => {
          setProductToEdit(null);
        })
        .catch((error) => console.error("Ошибка обновления:", error));
    } else {
      dispatch(addProduct(product))
        .unwrap()
        .then(() => {
          setProductToEdit(null);
        })
        .catch((error) => console.error("Ошибка добавления:", error));
    }
  };

  const edit = (id: string) => {
    const product = products.find((p) => p.id === id);

    if (product) {
      openModal(product);
    }
  };

  const remove = (id: string) => {
    const product = products.find((p) => p.id === id);

    if (product) {
      openConfirmationModal(product);
    }
  };

  const removeAction = (id: string | undefined | null) => {
    if (!id) return;

    dispatch(deleteProduct(id)).unwrap();
  };

  return (
    <div className={cls.ProductPage}>
      <ProductModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        handleSubmit={saveProduct}
        productToEdit={productToEdit || undefined}
      />

      <ConfirmationModal
        text={`Удалить ${productToEdit?.name} ?`}
        isOpen={isConfirmationModal}
        closeModal={closeConfirmationModal}
        action={() => removeAction(productToEdit?.id)}
      />

      <HStack maxWidth justify="between" className={cls.header}>
        <input
          className={cls.input}
          type="text"
          placeholder="Поиск..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <HStack justify="between" maxHeight className={cls.addCard}>
          <Text text="Добавить карточку" weight="700" size="20" />
          <button className={cls.button} onClick={() => openModal()}>
            <PlusIcon />
          </button>
        </HStack>
      </HStack>

      <HStack className={cls.tableWrapper}>
        <Table
          edit={edit}
          remove={remove}
          searchTerm={searchTerm}
          data={products}
          columns={productColumns}
        />
      </HStack>
    </div>
  );
};
