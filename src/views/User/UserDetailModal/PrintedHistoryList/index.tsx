"use client";
import FlexBox from "@/components/Box/FlexBox";
import { PrintedHistory } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useCallback } from "react";

interface Props {
  userPrintedHistory: PrintedHistory[];
}

export default function PrintedHistoryList({ userPrintedHistory }: Props) {
  const renderCell = useCallback((history: any, columnKey: ColumnKey) => {
    const cellValue = history[columnKey];

    if (columnKey === "date") {
      return new Date(cellValue).toLocaleString();
    }

    return cellValue;
  }, []);

  return (
    <FlexBox className="flex-col gap-4 w-full p-4 bg-neutral-100 shadow-md rounded-md">
      <Table
        color="primary"
        removeWrapper
        aria-label="Example table with dynamic content">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn align={column.align} key={column.key}>
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={"No user's printed history to display."}
          items={userPrintedHistory}>
          {(history) => (
            <TableRow className="cursor-pointer" key={history.printerId}>
              {(columnKey) => (
                <TableCell>
                  {renderCell(history, columnKey as ColumnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </FlexBox>
  );
}

type ColumnKey =
  | "printingId"
  | "studentId"
  | "printerId"
  | "copies"
  | "fileId"
  | "pagePrint"
  | "filename"
  | "date"
  | "pageSize";

type Column = {
  key: ColumnKey;
  label: string;
  align: "start" | "center" | "end";
};

const columns: Column[] = [
  { key: "printerId", label: "ID máy in", align: "start" },
  { key: "filename", label: "Tên file", align: "center" },
  { key: "copies", label: "Số bản", align: "center" },
  { key: "pagePrint", label: "Số trang", align: "center" },
  { key: "pageSize", label: "Cỡ trang", align: "center" },
  { key: "date", label: "Ngày in", align: "center" },
];
