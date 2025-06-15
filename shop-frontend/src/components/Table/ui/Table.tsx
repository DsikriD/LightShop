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
  const [visibleColumns, setVisibleColumns] = useState<ColumnDefinition<T>[]>(columns);
  const tableContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
      setVisibleColumns(sortedColumns.slice(0, maxColumns));
    }
    updateVisibleColumns();
    window.addEventListener("resize", updateVisibleColumns);
    return () => window.removeEventListener("resize", updateVisibleColumns);
  }, [columns]);

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

            {data.map((item, rowIndex) => (
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
    </div>
  );
}
