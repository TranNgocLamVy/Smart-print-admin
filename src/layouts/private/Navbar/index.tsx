"use client";
import Logo from "@/components/Logo";
import UserProfileModal from "@/views/UserProfileModal";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarContent,
  NavbarItem,
  useDisclosure,
} from "@nextui-org/react";
import { SignOut } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function PrivateNavbar() {
  const { isOpen, onOpenChange } = useDisclosure();
  const router = useRouter();

  const handleSignOut = async () => {
    Cookies.remove("token");
    router.push("/signin");
  };

  return (
    <Navbar
      isBlurred={false}
      maxWidth="full"
      className="fixed top-0 left-0 shadow-md py-1">
      <NavbarContent justify="start">
        <NavbarItem>
          <Logo className="size-12" />
        </NavbarItem>
        <NavbarItem className="flex flex-col h-full w-fit items-start justify-center">
          <h1 className="text-xl font-bold">Dịch vụ in thông minh</h1>
          <span className="text-sm font-medium">
            Trường Đại học Bách Khoa, Đại học Quốc gia Thành phố Hồ Chí Minh
          </span>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className="gap-4" justify="end">
        <Dropdown radius="md">
          <DropdownTrigger>
            <Avatar src="/user.svg" isBordered color="default" />
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem
              onClick={handleSignOut}
              color="danger"
              className="text-error-500"
              startContent={<SignOut />}>
              Sign out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <UserProfileModal isOpen={isOpen} onOpenChange={onOpenChange} />
      </NavbarContent>
    </Navbar>
  );
}
