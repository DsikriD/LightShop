import React from "react";
import cls from "./Table.module.scss";
import { EditIcon, TrashIcon } from "../../../icons";
import { HStack, Text } from "../../../components";

interface ColumnDefinition<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
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
  const filteredData = data.filter((item) =>
    columns.some((col) => {
      const value = item[col.key];
      return (
        value &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
  );

  return (
    <div>
      <table className={cls.outerTable}>
        <colgroup>
          {columns.map((col, idx) => (
            <col
              key={`col-${col.key}-${idx}`}
              className={`${cls.col} ${cls["col-" + (idx + 1)]}`}
            />
          ))}
          <col key="col-edit" className={`${cls.col} ${cls["col-edit"]}`} />
          <col key="col-delete" className={`${cls.col} ${cls["col-delete"]}`} />
        </colgroup>

        <thead>
          <tr className={cls.rowTitle}>
            {columns.map((col, idx) => (
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
            <td colSpan={columns.length + 2} />
          </tr>

          {filteredData.map((item, rowIndex) => (
            <React.Fragment key={`row-${item.id}`}>
              <tr className={cls.row} key={`data-row-${item.id}`}>
                {columns.map((col, colIndex) => (
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
                    <button
                      onClick={() => edit?.(item.id)}
                      className={cls.buttonEdit}
                    >
                      <EditIcon />
                    </button>
                  </HStack>
                </td>

                <td key={`td-delete-${item.id}`} className={cls.col}>
                  <button
                    onClick={() => remove?.(item.id)}
                    className={cls.buttonTrash}
                  >
                    <TrashIcon />
                  </button>
                </td>
              </tr>

              <tr className={cls.spacerContentRow} key={`spacer-${item.id}`}>
                <td colSpan={columns.length + 2} />
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
