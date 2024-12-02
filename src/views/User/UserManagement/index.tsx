"use client";
import FlexBox from "@/components/Box/FlexBox";
import { H1 } from "@/components/Heading";
import Searchbar from "@/components/Searchbar";
import {
  Button,
  Pagination,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import { Fragment, useState } from "react";
import UserList from "../UserList";
import { useRouter } from "next/navigation";
import { User } from "@/types";
import { Plus } from "@phosphor-icons/react";
import AddUserModal from "../AddUserModal";

interface Props {
  userList: User[];
  userCount: number;
  defaultParams: SearchParams;
}

export default function UserManagement({
  userList,
  userCount,
  defaultParams,
}: Props) {
  const router = useRouter();
  const { isOpen, onOpenChange } = useDisclosure();

  const [searchParam, setSearchParam] = useState<SearchParams>({
    field: defaultParams.field || "name",
    value: defaultParams.value || "",
    page: defaultParams.page || 1,
  });

  const onChangeSearchParam = (changed: SearchParams) => {
    setSearchParam({
      ...searchParam,
      ...changed,
    });
  };

  const onChangePage = (page: number) => {
    router.push(
      `/management/user?field=${searchParam.field}&value=${searchParam.value}&page=${page}`
    );
  };

  const onSearch = () => {
    router.push(
      `/management/user?field=${searchParam.field}&value=${searchParam.value}`
    );
  };

  return (
    <Fragment>
      <FlexBox className="flex-col w-9/12 gap-4">
        <FlexBox className="justify-between items-center">
          <FlexBox className="flex-col">
            <H1 className="text-4xl">Quản lý người dùng</H1>
            <span className="text-xl font-medium">{userCount} người dùng</span>
          </FlexBox>
          <Button
            endContent={<Plus weight="bold" />}
            radius="sm"
            color="primary"
            onClick={onOpenChange}
            className="text-white font-bold items-center justify-center">
            Thêm người dùng
          </Button>
          <AddUserModal isOpen={isOpen} onOpenChange={onOpenChange} />
        </FlexBox>

        <FlexBox className="justify-center gap-4">
          <Select
            placeholder="Tìm kiếm bằng"
            radius="sm"
            variant="bordered"
            defaultSelectedKeys={["name"]}
            onChange={(e) => {
              onChangeSearchParam({
                field: e.target.value,
              });
            }}
            className="w-48 bg-white rounded-md">
            <SelectItem key="name" value="name">
              Tìm bằng tên
            </SelectItem>
            <SelectItem key="email" value="email">
              Tìm bằng email
            </SelectItem>
            <SelectItem key="username" value="username">
              Tìm bằng username
            </SelectItem>
            <SelectItem key="ssoId" value="username">
              Tìm bằng ID
            </SelectItem>
          </Select>
          <Searchbar
            placeholder="Tìm kiếm người dùng"
            className="w-1/2 bg-white rounded-md"
            value={searchParam.value}
            onChange={(value) => {
              onChangeSearchParam({
                value: value,
              });
            }}
            onSearch={onSearch}
          />
        </FlexBox>

        <UserList userList={userList} />

        <FlexBox className="justify-center">
          {userCount > 0 && (
            <Pagination
              disableAnimation
              radius="sm"
              variant="faded"
              color="primary"
              showControls
              initialPage={1}
              page={searchParam.page ? searchParam.page : 1}
              total={Math.ceil(userCount / 10)}
              onChange={onChangePage}
            />
          )}
        </FlexBox>
      </FlexBox>
    </Fragment>
  );
}
