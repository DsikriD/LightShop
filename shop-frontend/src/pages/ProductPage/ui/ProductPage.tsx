import React, { useEffect, useState } from "react";
import cls from "./ProductPage.module.scss";
import {
  HStack,
  ProductModal,
  Table,
  VStack,
} from "../../../components";
import { Product } from "../models/typeProducts";
import { fetchProducts } from "../services/fetchProducts";
import { useAppDispatch, useAppSelector } from "../../../store";
import { getProducts } from "../slice/productSelector";
import { deleteProduct } from "../services/deleteProduct ";
import { updateProduct } from "../services/updateProduct";
import { addProduct } from "../services/addProduct";
import { Text } from "../../../components";
import { AddButton } from "../../../components/Table/ui/TableButtons/AddButton";
import { ArrowLeftButton } from '../../../components/Table/ui/TableButtons/ArrowLeftButton';
import { ArrowRightButton } from '../../../components/Table/ui/TableButtons/ArrowRightButton';
import { NumberButton } from '../../../components/Table/ui/TableButtons/NumberButtom';

const productColumns = [
  { key: "id", header: "ID", priority: 99, minWidth: "40px", maxWidth: "50px" },
  { key: "name", header: "Название", priority: 1 },
  { key: "description", header: "Описание", priority: 2 },
  { key: "quantity", header: "Кол-во", priority: 3 },
];

export const ProductPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationModal, setIsConfirmationModal] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [modalAction, setModalAction] = useState<"Add" | "Edit" | "Delete">("Add");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 6;

  const products = useAppSelector(getProducts);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const openModal = (product?: Product) => {
    setProductToEdit(product || null);
    setModalAction(product ? "Edit" : "Add");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setProductToEdit(null);
    setIsModalOpen(false);
    setModalAction("Add");
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

    if (modalAction === "Edit") {
      dispatch(updateProduct(product))
        .unwrap()
        .then(() => closeModal())
        .catch((error) => console.error("Ошибка обновления:", error));
    } else if (modalAction === "Add") {
      dispatch(addProduct(product))
        .unwrap()
        .then(() => closeModal())
        .catch((error) => console.error("Ошибка добавления:", error));
    } else if (modalAction === "Delete") {
      dispatch(deleteProduct(product.id))
        .unwrap()
        .then(() => closeModal())
        .catch((error) => console.error("Ошибка удаления:", error));
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
      setProductToEdit(product);
      setModalAction("Delete");
      setIsModalOpen(true);
    }
  };

  const removeAction = (id: string | undefined | null) => {
    if (!id) return;

    dispatch(deleteProduct(id)).unwrap();
  };

  const filteredData = products.filter((item) =>
    productColumns.some((col) => {
      const value = item[col.key as keyof Product];
      return (
        value &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
  );

  const totalPages = Math.max(1, Math.ceil(filteredData.length / rowsPerPage));
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <VStack className={cls.ProductPage}>
      <ProductModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        handleSubmit={saveProduct}
        productToEdit={productToEdit || undefined}
        action={modalAction}
      />

      <VStack gap="8" className={cls.header}>
        <HStack maxWidth className={cls.headerChild}>       
          <input
          className={cls.input}
          type="text"
          placeholder="Поиск..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        </HStack>
        <HStack maxWidth className={cls.headerChild}>
          <AddButton onClick={() => openModal()} /> 
        </HStack>
      </VStack>

      <VStack maxHeight className={cls.tableWrapper}>    
          <Table
            edit={edit}
            remove={remove}
            searchTerm={searchTerm}
            data={paginatedData}
            columns={productColumns}
          />
      </VStack>


        {totalPages > 1 && (
          <HStack gap="8" className={cls.pagination} maxHeight maxWidth justify="center">
            <ArrowLeftButton onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} />
            {Array.from(
              { length: Math.min(3, totalPages) },
              (_, i) => {
                const page = Math.max(1, currentPage - 1) + i;
                if (page > totalPages) return null;
                return (
                  <NumberButton
                    key={page}
                    number={page}
                    onClick={() => goToPage(page)}
                    disabled={currentPage === page}
                  />
                );
              }
            )}
            <ArrowRightButton onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} />
          </HStack>
        )}

    </VStack>
  );
};
