"use client";
import FlexBox from "@/components/Box/FlexBox";
import { PaymentHistory } from "@/types";
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
  paymentHistory: PaymentHistory[];
}

export default function PaymentHistoryList({ paymentHistory }: Props) {
  const renderCell = useCallback((history: any, columnKey: ColumnKey) => {
    const cellValue = history[columnKey];

    if (columnKey === "dateTime") {
      return new Date(cellValue).toLocaleString();
    }

    if (columnKey === "status") {
      return cellValue ? "Thành công" : "Thất bại";
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
          emptyContent={"No user's payment history to display."}
          items={paymentHistory}>
          {(history) => (
            <TableRow className="cursor-pointer" key={history.transactionId}>
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
  | "transactionId"
  | "dateTime"
  | "studentId"
  | "value"
  | "numberOfPages"
  | "status";

type Column = {
  key: ColumnKey;
  label: string;
  align: "start" | "center" | "end";
};

const columns: Column[] = [
  {
    key: "transactionId",
    label: "ID Thanh toán",
    align: "start",
  },
  {
    key: "dateTime",
    label: "Ngày thanh toán",
    align: "center",
  },

  {
    key: "value",
    label: "Tổng tiền",
    align: "center",
  },
  {
    key: "numberOfPages",
    label: "Tổng số trang",
    align: "center",
  },
  {
    key: "status",
    label: "Trạng thái",
    align: "center",
  },
];
