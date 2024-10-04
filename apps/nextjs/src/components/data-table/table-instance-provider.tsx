"use client";

import type { Table } from "@tanstack/react-table";
import { createContext, useContext, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface TableInstanceContextProps<T = any> {
  tableInstance: Table<T>;
  setTableInstance: React.Dispatch<React.SetStateAction<Table<T>>>;
}

const TableInstanceContext = createContext<TableInstanceContextProps>({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tableInstance: {} as Table<any>,
  setTableInstance: () => {
    void 0;
  },
});

export function useTableInstanceContext() {
  return useContext(TableInstanceContext);
}

export function TableInstanceProvider<T>({
  table,
  children,
}: {
  table: Table<T>;
  children: React.ReactNode;
}) {
  const [tableInstance, setTableInstance] = useState<Table<T>>(table);

  return (
    <TableInstanceContext.Provider value={{ tableInstance, setTableInstance }}>
      {children}
    </TableInstanceContext.Provider>
  );
}
