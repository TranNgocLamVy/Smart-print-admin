"use client";
import FlexBox from "@/components/Box/FlexBox";
import { H1, H2 } from "@/components/Heading";
import Image from "next/image";
import { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from "@nextui-org/react";
import PrintedHistoryList from "./PrintedHistoryList";
import { SearchAddition } from "@/types/main";
import { Printer } from "@/types";
import UpdatePrinterModal from "../UpdatePrinterModal";
import { useAuth } from "@/provider/AuthProvider";
import { useRouter } from "next/navigation";
import { PrinterOperation } from "@/libs";
import { toast } from "sonner";

interface Props {
  printer: Printer | null;
  isOpenMainModal: boolean;
  onOpenChangeMainModal: () => void;
}

export default function PrinterDetailModal({
  printer,
  isOpenMainModal,
  onOpenChangeMainModal,
}: Props) {
  const { token } = useAuth();
  const router = useRouter();

  const { isOpen, onOpenChange } = useDisclosure();

  if (!printer) {
    return <div />;
  }

  const onDeletePrinter = async () => {
    if (!printer) return;
    if (!token) return;

    const printerOp = new PrinterOperation();
    const res = await printerOp.deletePrinter(printer.id, token);
    if (res.success) {
      toast.success("Xóa máy in thành công");
      onOpenChangeMainModal();
      router.refresh();
    } else {
      toast.error("Xóa máy in thất bại");
    }
  };

  return (
    <Modal
      disableAnimation
      size="full"
      radius="sm"
      placement="center"
      shouldBlockScroll
      isOpen={isOpenMainModal}
      onOpenChange={onOpenChangeMainModal}>
      <ModalContent>
        <ModalBody className="flex items-center start">
          <FlexBox className="gap-12 w-9/12 pt-20 items-center">
            <Image
              src={"/printer.svg"}
              alt="printer"
              width={200}
              height={200}
              className="size-64 rounded-full"
            />
            <FlexBox className="flex-col gap-2">
              <FlexBox className="flex-row gap-1">
                <H2>{"ID: "}</H2>
                <H2>{printer.id.toString()}</H2>
              </FlexBox>
              <FlexBox className="flex-col gap-1">
                <span>
                  <span className="font-bold">Vị trí:</span>{" "}
                  {`${printer.location.building} - ${printer.location.room}`}
                </span>
                <span>
                  <span className="font-bold">Hãng:</span> {printer.brand}
                </span>
                <span>
                  <span className="font-bold">Mẫu:</span> {printer.model}
                </span>
              </FlexBox>
              <FlexBox className="gap-2">
                <Button
                  radius="sm"
                  disableAnimation
                  variant="bordered"
                  className="font-bold"
                  onClick={onOpenChange}>
                  Cập nhật máy in
                </Button>
                <Button
                  radius="sm"
                  disableAnimation
                  variant="bordered"
                  color="danger"
                  className="font-bold"
                  onClick={onDeletePrinter}>
                  Xóa máy in
                </Button>
              </FlexBox>
              <UpdatePrinterModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                onOpenChangeMainModal={onOpenChangeMainModal}
                printer={printer}
              />
            </FlexBox>
            <FlexBox className="flex-1 h-fit justify-center gap-8">
              <FlexBox className="flex-col gap-1 items-center">
                <H2 className="font-bold">Số giấy A3</H2>{" "}
                <H1 className="text-6xl">{printer.A3PaperCount.toString()}</H1>
              </FlexBox>
              <div className="h-28 border-1 border-neutral-400" />
              <FlexBox className="flex-col gap-1 items-center">
                <H2 className="font-bold">Số giấy A4</H2>{" "}
                <H1 className="text-6xl">{printer.A4PaperCount.toString()}</H1>
              </FlexBox>
              <div className="h-28 border-1 border-neutral-400" />
              <FlexBox className="flex-col gap-1 items-center">
                <H2 className="font-bold">Số giấy A5</H2>{" "}
                <H1 className="text-6xl">{printer.A5PaperCount.toString()}</H1>
              </FlexBox>
            </FlexBox>
          </FlexBox>
          <FlexBox className="w-9/12 flex-col">
            <H1 className="text-3xl">Lịch sử in</H1>
            {printer && (
              <PrintedHistoryList printerPrintedHistory={printer.history} />
            )}
          </FlexBox>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
