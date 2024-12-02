"use client";
import FlexBox from "@/components/Box/FlexBox";
import { H1, H2 } from "@/components/Heading";
import Image from "next/image";
import { Modal, ModalBody, ModalContent } from "@nextui-org/react";
import PrintedHistoryList from "./PrintedHistoryList";
import { User } from "@/types";
import PaymentHistoryList from "./PaymentHistoryList";

interface Props {
  user: User | null;
  isOpen: boolean;
  onOpenChange: () => void;
}

export default function UserDetailModal({ user, isOpen, onOpenChange }: Props) {
  if (!user) {
    return null;
  }

  return (
    <Modal
      disableAnimation
      size="full"
      radius="sm"
      placement="center"
      shouldBlockScroll
      isOpen={isOpen}
      onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalBody className="flex items-center start overflow-scroll">
          <FlexBox className="gap-12 w-9/12 pt-20 items-center">
            <Image
              src={"/user.svg"}
              alt="user"
              width={200}
              height={200}
              className="size-48 rounded-full"
            />
            <FlexBox className="flex-col gap-2">
              <FlexBox className="flex-row gap-1">
                <H2>{"Name: "}</H2>
                <H2>{user.name.toString()}</H2>
              </FlexBox>
              <FlexBox className="flex-col gap-1">
                <span>
                  <span className="font-bold">Username:</span>{" "}
                  {`${user.username}`}
                </span>
                <span>
                  <span className="font-bold">Email:</span> {user.email}
                </span>
                <span>
                  <span className="font-bold">Sđt:</span> {user.phone}
                </span>
              </FlexBox>
            </FlexBox>
            <FlexBox className="flex-1 h-fit justify-center gap-8">
              <FlexBox className="flex-col gap-1 items-center">
                <H2 className="font-bold">Số giấy miễn phí</H2>{" "}
                <H1 className="text-6xl">
                  {user.student?.currentFreePaper?.toString()}
                </H1>
              </FlexBox>
              <div className="h-28 border-1 border-neutral-400" />
              <FlexBox className="flex-col gap-1 items-center">
                <H2 className="font-bold">Số giấy trả phí</H2>{" "}
                <H1 className="text-6xl">
                  {user.student?.boughtPaper?.toString()}
                </H1>
              </FlexBox>
            </FlexBox>
          </FlexBox>
          <FlexBox className="w-9/12 flex-col">
            <H1 className="text-3xl">Lịch sử in</H1>
            {user && <PrintedHistoryList userPrintedHistory={user.history} />}
          </FlexBox>
          <FlexBox className="w-9/12 flex-col my-10">
            <H1 className="text-3xl">Lịch sử thanh toán</H1>
            {user.paymentHistory && (
              <PaymentHistoryList paymentHistory={user.paymentHistory} />
            )}
          </FlexBox>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
