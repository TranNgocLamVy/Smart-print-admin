"use client";
import FlexBox from "@/components/Box/FlexBox";
import { Gear, Printer, Users } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const path = [
  {
    name: "Quản lý máy in",
    path: "/management/printer",
    icon: <Printer size={20} weight="bold" />,
  },
  {
    name: "Quản lý người dùng",
    path: "/management/user",
    icon: <Users size={20} weight="bold" />,
  },
  {
    name: "Quản lý hệ thống",
    path: "/management/system",
    icon: <Gear size={20} weight="bold" />,
  },
];

export default function NavLink() {
  const pathName = usePathname();

  return (
    <FlexBox className="gap-8">
      {path.map((item, index) => (
        <Link
          href={item.path}
          key={index}
          className="p-2 font-bold flex items-center justify-center gap-2 border-0 border-b-2 cursor-pointer"
          style={{
            borderColor: pathName === item.path ? "black" : "transparent",
          }}>
          {item.icon}
          {item.name}
        </Link>
      ))}
    </FlexBox>
  );
}
