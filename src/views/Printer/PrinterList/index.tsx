"use client";
import FlexBox from "@/components/Box/FlexBox";
import List from "@/components/List";
import ListItem from "@/components/ListItem";
import { Printer } from "@/types";
import { useDisclosure } from "@nextui-org/react";
import { MapPin } from "@phosphor-icons/react";
import Image from "next/image";
import { useState } from "react";
import PrinterDetailModal from "../PrinterDetailModal";

interface Props {
  printerList: Printer[];
}

export default function PrinterList({ printerList }: Props) {
  const { isOpen, onOpenChange } = useDisclosure();
  const [currentPrinter, setCurrentPrinter] = useState<Printer | null>(null);

  return (
    <FlexBox className="flex-col gap-2 w-full">
      <PrinterDetailModal
        printer={currentPrinter}
        isOpenMainModal={isOpen}
        onOpenChangeMainModal={onOpenChange}
      />
      <List className="w-fit h-fit flex-row flex-wrap gap-4 justify-center">
        {printerList.map((printer, index) => (
          <ListItem
            key={index}
            onClick={() => {
              setCurrentPrinter(printer);
              onOpenChange();
            }}
            className="bg-white shadow-sm p-4 min-w-fit flex flex-col rounded-md cursor-pointer hover:shadow-xl border">
            <Image
              src={"/printer.svg"}
              alt="logo"
              width={100}
              height={100}
              className="size-40 bg-neutral-300 rounded-md"
            />
            <span className="flex gap-1 items-center text-md font-bold mt-4">
              {`ID: ${printer.id} -`}
              <MapPin />
              {`${printer.location.building} - ${printer.location.room}`}
            </span>
            <span className="flex gap-1 items-center text-xs px-1">
              {printer.brand} - {printer.model}
            </span>
            <span className="flex gap-2 items-center text-xs px-1">
              <span>
                <span className="font-semibold">A3:</span>{" "}
                {printer.A3PaperCount}
              </span>
              <span>
                <span className="font-semibold">A4:</span>{" "}
                {printer.A4PaperCount}
              </span>
              <span>
                <span className="font-semibold">A5:</span>{" "}
                {printer.A5PaperCount}
              </span>
            </span>
          </ListItem>
        ))}
      </List>
    </FlexBox>
  );
}
