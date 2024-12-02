"use client";
import FlexBox from "@/components/Box/FlexBox";
import { H1 } from "@/components/Heading";
import { PrinterOperation } from "@/libs";
import { useAuth } from "@/provider/AuthProvider";
import { CreatePrinterDto } from "@/types/main";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
}

export default function AddPrinterModal({ isOpen, onOpenChange }: Props) {
  const { token } = useAuth();
  const router = useRouter();
  const [addPrinterForm, setAddPrinterForm] = useState<CreatePrinterDto>({
    status: false,
    A3PaperCount: 0,
    A4PaperCount: 0,
    A5PaperCount: 0,
    building: "",
    floor: 0,
    room: 0,
    brand: "",
    model: "",
  });

  const onChangeForm = (changed: Partial<CreatePrinterDto>) => {
    setAddPrinterForm((prev) => ({ ...prev, ...changed }));
  };

  const submitForm = () => {
    if (!token) {
      toast.error("Không tìm thấy token");
      return;
    }
    const printer = new PrinterOperation();
    printer.createPrinter(addPrinterForm, token).then((res) => {
      if (res.success) {
        toast.success("Thêm máy in thành công");
        router.refresh();
        onOpenChange();
      } else {
        toast.error("Thêm máy in thất bại");
      }
    });
  };

  const resetForm = () => {
    setAddPrinterForm({
      status: false,
      A3PaperCount: 0,
      A4PaperCount: 0,
      A5PaperCount: 0,
      building: "",
      floor: 0,
      room: 0,
      brand: "",
      model: "",
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
          <H1>Thêm máy in mới</H1>
        </ModalHeader>
        <ModalBody className="flex flex-col gap-4">
          <Input
            value={addPrinterForm.building}
            onChange={(e) => onChangeForm({ building: e.target.value })}
            type="text"
            radius="sm"
            id="building"
            label="Tòa"
          />
          <FlexBox className="gap-4">
            <Input
              value={addPrinterForm.floor.toString()}
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
              value={addPrinterForm.room.toString()}
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
              value={addPrinterForm.model}
              onChange={(e) => onChangeForm({ model: e.target.value })}
              type="text"
              radius="sm"
              id="model"
              label="Mẫu máy in"
            />
            <Input
              value={addPrinterForm.brand}
              onChange={(e) => onChangeForm({ brand: e.target.value })}
              type="text"
              radius="sm"
              id="brand"
              label="Hãng máy in"
            />
          </FlexBox>
          <FlexBox className="gap-4">
            <Input
              value={addPrinterForm.A3PaperCount.toString()}
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
              value={addPrinterForm.A4PaperCount.toString()}
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
              value={addPrinterForm.A5PaperCount.toString()}
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
        </ModalBody>
        <ModalFooter>
          <FlexBox className="gap-4 w-full justify-between">
            <Button radius="sm" onClick={resetForm} color="default">
              Xóa
            </Button>
            <Button radius="sm" onClick={submitForm} color="primary">
              Thêm máy in
            </Button>
          </FlexBox>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
