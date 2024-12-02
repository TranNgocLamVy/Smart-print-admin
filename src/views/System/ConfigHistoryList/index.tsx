"use client";
import FlexBox from "@/components/Box/FlexBox";
import {
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { SystemConfigHistory } from "@/types";
import { useCallback } from "react";
import { FileType } from "@/types/main";

interface Props {
  historyList: SystemConfigHistory[];
}

export default function ConfigHistoryList({ historyList }: Props) {
  const renderCell = useCallback((history: any, columnKey: ColumnKey) => {
    const cellValue = history[columnKey];

    if (columnKey === "historyClearTime") {
      return new Date(cellValue).toLocaleString();
    }

    if (columnKey === "freePaperResetDate") {
      return new Date(cellValue).toLocaleString();
    }

    if (columnKey === "createdAt") {
      return new Date(cellValue).toLocaleString();
    }

    if (columnKey === "allowedFiles") {
      const lable = cellValue.map((item: string) => {
        switch (item) {
          case FileType.PDF.toString():
            return "PDF";
          case FileType.DOCX:
            return "DOCX";
          case FileType.EXCEL:
            return "EXCEL";
        }
      });
      return lable.join(", ");
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
        <TableBody emptyContent={"No history to display."} items={historyList}>
          {(history) => (
            <TableRow
              className="cursor-pointer hover:bg-neutral-200"
              key={history.versionId}>
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

type ColumnKey = keyof SystemConfigHistory;

type Column = {
  key: ColumnKey;
  label: string;
  align: "start" | "center" | "end";
};

const columns: Column[] = [
  { key: "versionId", label: "ID Version", align: "start" },
  {
    key: "defaultFreePaper",
    label: "Số trang miễn phí mặc định",
    align: "center",
  },
  {
    key: "freePaperResetDate",
    label: "Ngày reset số trang miễn phí",
    align: "center",
  },
  { key: "historyClearTime", label: "Ngày xóa lịch sử", align: "center" },
  { key: "allowedFiles", label: "Loại file cho phép", align: "center" },
  { key: "createdAt", label: "Cập nhật vào", align: "center" },
];
