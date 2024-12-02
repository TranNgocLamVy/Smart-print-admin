"use client";
import FlexBox from "@/components/Box/FlexBox";
import { H1, H2 } from "@/components/Heading";
import { SystemConfig, SystemConfigHistory } from "@/types";
import {
  Button,
  Chip,
  DatePicker,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from "@nextui-org/react";
import { parseAbsoluteToLocal } from "@internationalized/date";
import {
  File,
  FileDoc,
  FilePdf,
  FilePlus,
  FileXls,
  X,
} from "@phosphor-icons/react";
import { Fragment, useState } from "react";
import ConfigHistoryList from "../ConfigHistoryList";
import { CreateSystemConfigDto, FileType } from "@/types/main";
import { SystemConfiguration } from "@/libs";
import { useAuth } from "@/provider/AuthProvider";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Props {
  systemConfig: SystemConfig | null;
  historyList: SystemConfigHistory[];
}

export default function SystemManagement({ systemConfig, historyList }: Props) {
  const { token } = useAuth();
  const router = useRouter();

  const [updateSystem, setUpdateSystemConfig] = useState<SystemConfig | null>(
    systemConfig
  );

  const updateSystemConfig = async () => {
    if (!updateSystem) return;
    if (!isChangeConfig()) return;
    if (!token) return;

    const payload: CreateSystemConfigDto = {
      historyClearTime: updateSystem.historyClearTime,
      allowedFiles: updateSystem.allowedFiles,
      freePaperResetDate: updateSystem.freePaperResetDate,
      defaultFreePaper: updateSystem.defaultFreePaper,
    };

    const systemOperation = new SystemConfiguration();
    const res = await systemOperation.createSystemConfiguration(payload, token);
    console.log(res);
    if (res.success) {
      toast.success("Cập nhật cấu hình hệ thống thành công");
      router.refresh();
    } else {
      toast.error("Cập nhật cấu hình hệ thống thất bại");
    }
  };

  const isChangeConfig = () => {
    return JSON.stringify(systemConfig) !== JSON.stringify(updateSystem);
  };

  const isVisibled = systemConfig && updateSystem;

  return (
    <Fragment>
      <FlexBox className="flex-col w-9/12 gap-12">
        <FlexBox className="justify-between items-center">
          <H1 className="text-4xl">Quản lý hệ thống</H1>
        </FlexBox>

        {isVisibled && (
          <FlexBox className="gap-2 flex-col">
            <H2>Loại file cho phép</H2>
            <FlexBox className="w-1/2 flex-col gap-2 bg-neutral-200 p-4 rounded-md">
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    color="success"
                    className="w-40"
                    startContent={<FilePlus size={20} weight="bold" />}>
                    Thêm loại file
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  {fileList.map((type, index) => {
                    return (
                      <DropdownItem
                        key={index}
                        onClick={() => {
                          if (
                            updateSystem.allowedFiles.includes(type as string)
                          )
                            return;
                          setUpdateSystemConfig({
                            ...updateSystem,
                            allowedFiles: [
                              ...updateSystem.allowedFiles,
                              type,
                            ] as any,
                          });
                        }}>
                        {getAllowFileName(type)}
                      </DropdownItem>
                    );
                  })}
                </DropdownMenu>
              </Dropdown>
              <Divider />
              <FlexBox className="gap-4 flex-wrap">
                {updateSystem.allowedFiles.map((type, index) => (
                  <Chip
                    key={index}
                    variant="faded"
                    color="success"
                    size="lg"
                    radius="sm"
                    className="cursor-pointer"
                    startContent={getAllowFileIcon(type)}
                    endContent={<X size={15} weight="bold" />}
                    onClose={() => {
                      const newAllowedFiles = updateSystem.allowedFiles.filter(
                        (_, i) => i !== index
                      );
                      setUpdateSystemConfig({
                        ...updateSystem,
                        allowedFiles: newAllowedFiles as any,
                      });
                    }}>
                    {getAllowFileName(type)}
                  </Chip>
                ))}
              </FlexBox>
            </FlexBox>
          </FlexBox>
        )}

        {isVisibled && (
          <FlexBox className="gap-2 flex-col">
            <H2>Ngày reset</H2>
            <FlexBox className="gap-2">
              <DatePicker
                label="Ngày reset số trang miễn phí"
                className="w-96"
                defaultValue={parseAbsoluteToLocal(
                  systemConfig.freePaperResetDate
                )}
                onChange={(value) => {
                  setUpdateSystemConfig({
                    ...updateSystem,
                    freePaperResetDate: value.toAbsoluteString(),
                  });
                }}
              />
              <DatePicker
                label="Ngày xóa lịch sử"
                className="w-96"
                defaultValue={parseAbsoluteToLocal(
                  systemConfig.historyClearTime
                )}
                onChange={(value) => {
                  setUpdateSystemConfig({
                    ...updateSystem,
                    historyClearTime: value.toAbsoluteString(),
                  });
                }}
              />
            </FlexBox>
          </FlexBox>
        )}

        {isVisibled && (
          <FlexBox className="gap-2 flex-col">
            <H2>Số trang miễn phí mặc định</H2>
            <Input
              defaultValue={systemConfig.defaultFreePaper.toString()}
              onChange={(e) => {
                if (parseInt(e.target.value) == undefined) {
                  setUpdateSystemConfig({
                    ...updateSystem,
                    defaultFreePaper: 0,
                  });
                }
                if (isNaN(parseInt(e.target.value))) return;
                setUpdateSystemConfig({
                  ...updateSystem,
                  defaultFreePaper: parseInt(e.target.value),
                });
              }}
              value={updateSystem.defaultFreePaper.toString()}
              radius="sm"
              placeholder="20"
              className="w-96"
            />
          </FlexBox>
        )}

        <FlexBox className="">
          <Button
            disabled={!isChangeConfig()}
            onClick={updateSystemConfig}
            className="w-28 font-bold"
            color={isChangeConfig() ? "primary" : "default"}>
            Lưu
          </Button>
        </FlexBox>

        <FlexBox className="gap-2 flex-col">
          <H2>Lịch sử chỉnh sửa</H2>
          <ConfigHistoryList historyList={historyList} />
        </FlexBox>
      </FlexBox>
    </Fragment>
  );
}

const fileList = [
  FileType.PDF.toString(),
  FileType.DOCX.toString(),
  FileType.EXCEL.toString(),
];

const getAllowFileName = (type: string) => {
  switch (type) {
    case FileType.PDF.toString():
      return "PDF";
    case FileType.DOCX.toString():
      return "DOCX";
    case FileType.EXCEL.toString():
      return "EXCEL";
    default:
      return "FILE";
  }
};

const getAllowFileIcon = (type: string) => {
  switch (type) {
    case FileType.PDF.toString():
      return <FilePdf size={20} weight="bold" />;
    case FileType.DOCX.toString():
      return <FileDoc size={20} weight="bold" />;
    case FileType.EXCEL.toString():
      return <FileXls size={20} weight="bold" />;
    default:
      return <File size={20} weight="bold" />;
  }
};
