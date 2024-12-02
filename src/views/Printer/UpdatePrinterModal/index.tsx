"use client";
import FlexBox from "@/components/Box/FlexBox";
import { H1 } from "@/components/Heading";
import { PrinterOperation } from "@/libs";
import { useAuth } from "@/provider/AuthProvider";
import { Printer } from "@/types";
import { CreatePrinterDto, UpdatePrinter } from "@/types/main";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
  onOpenChangeMainModal: () => void;
  printer: Printer;
}

export default function UpdatePrinterModal({
  isOpen,
  onOpenChange,
  printer,
  onOpenChangeMainModal,
}: Props) {
  const { token } = useAuth();
  const router = useRouter();
  const [updatePrinter, setUpdatePrinterForm] = useState<UpdatePrinter>({
    id: printer.id,
  });

  const onChangeForm = (changed: Partial<UpdatePrinter>) => {
    setUpdatePrinterForm((prev) => ({ ...prev, ...changed }));
  };

  const submitForm = () => {
    if (!token) {
      toast.error("Không tìm thấy token");
      return;
    }
    console.log(updatePrinter);
    const printer = new PrinterOperation();
    printer.updatePrinter(updatePrinter, token).then((res) => {
      if (res.success) {
        toast.success("Cập nhật máy in thành công");
        router.refresh();
        onOpenChange();
        onOpenChangeMainModal();
      } else {
        toast.error("Cập nhật máy in thất bại");
      }
    });
  };

  const resetForm = () => {
    setUpdatePrinterForm({
      id: printer.id,
    });
  };

  return (
    <Modal
      disableAnimation
      size="lg"
      radius="sm"
      placement="center"
      isOpen={isOpen}
      onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 text-2xl">
          <H1>Cập nhật in mới</H1>
        </ModalHeader>
        <ModalBody className="flex flex-col gap-4">
          <Input
            value={updatePrinter.building ?? printer.location.building}
            onChange={(e) => {
              onChangeForm({ building: e.target.value });
            }}
            type="text"
            radius="sm"
            id="building"
            label="Tòa"
          />
          <FlexBox className="gap-4">
            <Input
              value={
                updatePrinter.floor?.toString() ??
                printer.location.floor.toString()
              }
              onChange={(e) => {
                if (isNaN(Number(e.target.value))) return;
                onChangeForm({ floor: Number(e.target.value) });
              }}
              type="text"
              radius="sm"
              id="floor"
              label="Tầng"
            />
            <Input
              value={
                updatePrinter.room?.toString() ??
                printer.location.room.toString()
              }
              onChange={(e) => {
                if (isNaN(Number(e.target.value))) return;
                onChangeForm({ room: Number(e.target.value) });
              }}
              type="text"
              radius="sm"
              id="room"
              label="Số phòng"
            />
          </FlexBox>
          <FlexBox className="gap-4">
            <Input
              value={updatePrinter.model ?? printer.model}
              onChange={(e) => onChangeForm({ model: e.target.value })}
              type="text"
              radius="sm"
              id="model"
              label="Mẫu máy in"
            />
            <Input
              value={updatePrinter.brand ?? printer.brand}
              onChange={(e) => onChangeForm({ brand: e.target.value })}
              type="text"
              radius="sm"
              id="brand"
              label="Hãng máy in"
            />
          </FlexBox>
          <FlexBox className="gap-4">
            <Input
              value={
                updatePrinter.A3PaperCount?.toString() ??
                printer.A3PaperCount.toString()
              }
              onChange={(e) => {
                if (isNaN(Number(e.target.value))) return;
                onChangeForm({ A3PaperCount: Number(e.target.value) });
              }}
              type="text"
              radius="sm"
              id="A3"
              label="Số lượng A3"
            />
            <Input
              value={
                updatePrinter.A4PaperCount?.toString() ??
                printer.A4PaperCount.toString()
              }
              onChange={(e) => {
                if (isNaN(Number(e.target.value))) return;
                onChangeForm({ A4PaperCount: Number(e.target.value) });
              }}
              type="text"
              radius="sm"
              id="A4"
              label="Số lượng A4"
            />
            <Input
              value={
                updatePrinter.A5PaperCount?.toString() ??
                printer.A5PaperCount.toString()
              }
              onChange={(e) => {
                if (isNaN(Number(e.target.value))) return;
                onChangeForm({ A5PaperCount: Number(e.target.value) });
              }}
              type="text"
              radius="sm"
              id="A5"
              label="Số lượng A5"
            />
          </FlexBox>
          <Select
            defaultSelectedKeys={[printer.status ? "true" : "false"]}
            onChange={(e) => {
              onChangeForm({ status: e.target.value === "true" });
            }}
            label="Trạng thái"
            radius="sm">
            <SelectItem key="false">Khả dụng</SelectItem>
            <SelectItem key="true">Không khả dụng</SelectItem>
          </Select>
        </ModalBody>
        <ModalFooter>
          <FlexBox className="gap-4 w-full justify-between">
            <Button
              disableAnimation
              radius="sm"
              onClick={resetForm}
              color="default">
              Xóa chỉnh sửa
            </Button>
            <Button
              disableAnimation
              radius="sm"
              onClick={submitForm}
              color="primary">
              Cập nhật máy in
            </Button>
          </FlexBox>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
