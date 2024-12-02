"use client";
import FlexBox from "@/components/Box/FlexBox";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
  User,
} from "@nextui-org/react";
import { useCallback, useState } from "react";
import UserDetailModal from "../UserDetailModal";
import { User as UserType } from "@/types";

interface Props {
  userList: UserType[];
}

export default function UserList({ userList }: Props) {
  const { isOpen, onOpenChange } = useDisclosure();
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);

  const renderCell = useCallback((user: any, columnKey: ColumnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "full", src: "/user.svg" }}
            description={user.email}
            name={cellValue}>
            {user.email}
          </User>
        );
      case "free_paper":
        return user.student.currentFreePaper;
      case "paid_paper":
        return user.student.boughtPaper;
      default:
        return cellValue;
    }
  }, []);

  return (
    <FlexBox className="flex-col gap-4 w-full p-4 bg-neutral-100 shadow-md rounded-md">
      <UserDetailModal
        user={currentUser}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
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
        <TableBody emptyContent={"No user to display."} items={userList}>
          {(user) => (
            <TableRow
              onClick={() => {
                setCurrentUser(user);
                onOpenChange();
              }}
              className="cursor-pointer hover:bg-neutral-200"
              key={user.ssoId}>
              {(columnKey) => (
                <TableCell>
                  {renderCell(user, columnKey as ColumnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </FlexBox>
  );
}

type ColumnKey = "ssoId" | "name" | "username" | "free_paper" | "paid_paper";

type Column = {
  key: ColumnKey;
  label: string;
  align: "start" | "center" | "end";
};

const columns: Column[] = [
  {
    key: "name",
    label: "Họ và tên",
    align: "start",
  },
  {
    key: "username",
    label: "Username",
    align: "start",
  },
  {
    key: "ssoId",
    label: "Sso ID",
    align: "center",
  },
  {
    key: "free_paper",
    label: "SL giấy miễn phí",
    align: "center",
  },
  {
    key: "paid_paper",
    label: "SL giấy mua",
    align: "center",
  },
];
