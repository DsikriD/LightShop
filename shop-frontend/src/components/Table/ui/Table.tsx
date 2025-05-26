import React, { useState, useEffect, useRef } from "react";
import cls from "./Table.module.scss";
import { EditIcon, TrashIcon } from "../../../icons";
import { HStack, Text } from "../../../components";
import { EditButton } from "./TableButtons/EditButton";
import { DeleteButton } from "./TableButtons/DeleteButton";
import { ArrowLeftButton } from "./TableButtons/ArrowLeftButton";
import { NumberButton } from "./TableButtons/NumberButtom";
import { ArrowRightButton } from "./TableButtons/ArrowRightButton";

interface ColumnDefinition<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  priority?: number; // Lower number means higher priority (less likely to be hidden)
  minWidth?: string;
  maxWidth?: string;
}

interface TableProps<T> {
  data: T[];
  columns: ColumnDefinition<T>[];
  searchTerm: string;
  edit?: (id: string) => void;
  remove?: (id: string) => void;
}

export function Table<T extends Record<string, any>>({
  data,
  columns,
  searchTerm = "",
  edit,
  remove,
}: TableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [visibleColumns, setVisibleColumns] = useState<ColumnDefinition<T>[]>(columns);
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const filteredData = data.filter((item) =>
    columns.some((col) => {
      const value = item[col.key];
      return (
        value &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
  );

  useEffect(() => {
    function calculateRowsPerPage() {
      if (!tableContainerRef.current) return;
      const headerHeight = 60;
      const rowHeight = 61 + 20;
      const availableHeight = window.innerHeight - tableContainerRef.current.getBoundingClientRect().top - 40;
      const count = Math.max(1, Math.floor((availableHeight - headerHeight) / rowHeight));
      setRowsPerPage(count);
    }

    function updateVisibleColumns() {
      if (!tableContainerRef.current) return;
      
      const containerWidth = tableContainerRef.current.offsetWidth;
      const minColumnWidth = 100;
      const actionColumnsWidth = 120;
      
      const availableWidth = containerWidth - actionColumnsWidth;
      const maxColumns = Math.floor(availableWidth / minColumnWidth);
      
      const sortedColumns = [...columns].sort((a, b) => {
        const priorityA = a.priority ?? 999;
        const priorityB = b.priority ?? 999;
        return priorityA - priorityB;
      });
      
      // Take only the columns that can fit
      setVisibleColumns(sortedColumns.slice(0, maxColumns));
    }

    calculateRowsPerPage();
    updateVisibleColumns();
    
    window.addEventListener("resize", () => {
      calculateRowsPerPage();
      updateVisibleColumns();
    });
    
    return () => window.removeEventListener("resize", () => {
      calculateRowsPerPage();
      updateVisibleColumns();
    });
  }, [columns]);

  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(filteredData.length / rowsPerPage));
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [rowsPerPage, filteredData.length]);

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
    <div ref={tableContainerRef} className={cls.tableContainer}>
      <HStack>
        <table className={cls.outerTable}>
          <colgroup>
            {visibleColumns.map((col, idx) => (
              <col
                key={`col-${col.key}-${idx}`}
                className={`${cls.col} ${cls["col-" + (idx + 1)]}`}
                style={{ minWidth: col.minWidth, maxWidth: col.maxWidth }}
              />
            ))}
            <col key="col-edit" className={`${cls.col} ${cls["col-edit"]}`} />
            <col key="col-delete" className={`${cls.col} ${cls["col-delete"]}`} />
          </colgroup>

          <thead>
            <tr className={cls.rowTitle}>
              {visibleColumns.map((col, idx) => (
                <th key={`th-${col.key}-${idx}`} className={cls.colTitle}>
                  <HStack justify="center" maxHeight maxWidth>
                    <Text text={col.header} size="20" weight="700" />
                  </HStack>
                </th>
              ))}
              <th key="th-edit" className={cls.colTitle}>
                <Text text="Ред" size="20" weight="700" />
              </th>
              <th key="th-delete" className={cls.colTitle}>
                <Text text="Уд" size="20" weight="700" />
              </th>
            </tr>
          </thead>

          <tbody>
            <tr className={cls.spacerRow}>
              <td colSpan={visibleColumns.length + 2} />
            </tr>

            {paginatedData.map((item, rowIndex) => (
              <React.Fragment key={`row-${item.id}`}>
                <tr className={cls.row} key={`data-row-${item.id}`}>
                  {visibleColumns.map((col, colIndex) => (
                    <td
                      key={`td-${item.id}-${col.key}-${colIndex}`}
                      className={cls.col}
                    >
                      <HStack maxWidth justify="center" className={cls.content}>
                        <Text
                          align="center"
                          className={cls.text}
                          ellipsis
                          size="15"
                          weight="700"
                          text={col.render ? col.render(item) : item[col.key]}
                        />
                      </HStack>
                    </td>
                  ))}

                  <td key={`td-edit-${item.id}`} className={cls.col}>
                    <HStack
                      justify="center"
                      maxHeight
                      maxWidth
                      className={cls.content}
                    >
                      <EditButton onClick={() => edit?.(item.id)} />
                    </HStack>
                  </td>

                  <td key={`td-delete-${item.id}`} className={cls.col}>
                    <DeleteButton onClick={() => remove?.(item.id)} />
                  </td>
                </tr>

                <tr className={cls.spacerContentRow} key={`spacer-${item.id}`}>
                  <td colSpan={visibleColumns.length + 2} />
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </HStack>
      {totalPages > 1 && (
        <div className={cls.pagination}>
          <ArrowLeftButton onClick={() => goToPage(currentPage - 1)}  disabled={currentPage === 1}/>
          {Array.from(
            { length: Math.min(3, totalPages) },
            (_, i) => {
              const page = Math.max(1, currentPage - 1) + i;
              if (page > totalPages) return null;
              return (
                <NumberButton key={page}
                number={page}
                onClick={() => goToPage(page)}
                disabled={currentPage === page }
                />
              );
            }
          )}
          <ArrowRightButton onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}/>
        </div>
      )}
    </div>
  );
}
