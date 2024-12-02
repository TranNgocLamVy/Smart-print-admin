"use client";
import FlexBox from "@/components/Box/FlexBox";
import { H1 } from "@/components/Heading";
import {
  Button,
  Pagination,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import { Plus } from "@phosphor-icons/react";
import { Fragment, useState } from "react";
import AddPrinterModal from "../AddPrinterModal";
import Searchbar from "@/components/Searchbar";
import PrinterList from "../PrinterList";
import { useRouter } from "next/navigation";
import { Printer } from "@/types";

interface Props {
  printerList: Printer[];
  printerCount: number;
  defaultParams: SearchParams;
}

export default function PrinterManagement({
  printerList,
  printerCount,
  defaultParams,
}: Props) {
  const router = useRouter();
  const { isOpen, onOpenChange } = useDisclosure();

  const [searchParam, setSearchParam] = useState<SearchParams>({
    field: defaultParams.field || "Location.building",
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
      `/management/printer?field=${searchParam.field}&value=${searchParam.value}&page=${page}`
    );
  };

  const onSearch = () => {
    router.push(
      `/management/printer?field=${searchParam.field}&value=${searchParam.value}`
    );
  };

  return (
    <Fragment>
      <FlexBox className="flex-col w-9/12 gap-4">
        <FlexBox className="justify-between items-center">
          <FlexBox className="flex-col">
            <H1 className="text-4xl">Quản lý máy in</H1>
            <span className="text-xl font-medium">{printerCount} máy in</span>
          </FlexBox>
          <Button
            endContent={<Plus weight="bold" />}
            radius="sm"
            color="primary"
            onClick={onOpenChange}
            className="text-white font-bold items-center justify-center">
            Thêm máy in
          </Button>
          <AddPrinterModal isOpen={isOpen} onOpenChange={onOpenChange} />
        </FlexBox>
        <FlexBox className="justify-center gap-4">
          <Select
            placeholder="Tìm kiếm bằng"
            radius="sm"
            variant="bordered"
            defaultSelectedKeys={[defaultParams.field || "Location.building"]}
            onChange={(e) => {
              onChangeSearchParam({
                field: e.target.value,
              });
            }}
            className="w-40 bg-white rounded-md">
            <SelectItem key="Location.building">Tìm bằng tòa</SelectItem>
            <SelectItem key="Location.floor">Tìm bằng tầng</SelectItem>
            <SelectItem key="Location.room">Tìm bằng phòng</SelectItem>
            <SelectItem key="brand">Tìm bằng hãng</SelectItem>
            <SelectItem key="model">Tìm bằng mẫu</SelectItem>
            <SelectItem key="id">Tìm bằng ID</SelectItem>
          </Select>
          <Searchbar
            placeholder="Tìm kiếm máy in"
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
        <PrinterList printerList={printerList} />
        <FlexBox className="justify-center">
          {printerCount > 0 && (
            <Pagination
              disableAnimation
              radius="sm"
              variant="faded"
              color="primary"
              showControls
              initialPage={1}
              page={searchParam.page}
              total={Math.ceil(printerCount / 10)}
              onChange={onChangePage}
            />
          )}
        </FlexBox>
      </FlexBox>
    </Fragment>
  );
}
