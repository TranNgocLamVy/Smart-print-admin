"use client";
import FlexBox from "@/components/Box/FlexBox";
import { H1 } from "@/components/Heading";
import { User } from "@/libs";
import { useAuth } from "@/provider/AuthProvider";
import { CreateUserDto, UserRole } from "@/types/main";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
}

export default function AddUserModal({ isOpen, onOpenChange }: Props) {
  const { token } = useAuth();
  const [addUserForm, setAddUserForm] = useState<CreateUserDto>({
    username: "",
    password: "",
    name: "",
    email: "",
    phoneNumber: "",
    role: UserRole.STUDENT,
  });

  const onChangeForm = (changed: Partial<CreateUserDto>) => {
    setAddUserForm((prev) => ({ ...prev, ...changed }));
  };

  const submitForm = async () => {
    if (!token) return;
    const user = new User();
    const res = await user.createUser(addUserForm, token);
    if (res.success) {
      toast.success("Thêm người dùng thành công");
    } else {
      toast.error("Thêm người dùng thất bại");
    }
  };

  const resetForm = () => {
    setAddUserForm({
      username: "",
      password: "",
      name: "",
      email: "",
      phoneNumber: "",
      role: UserRole.STUDENT,
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
          <H1>Thêm người dùng mới</H1>
        </ModalHeader>
        <ModalBody className="flex flex-col gap-4">
          <Input
            value={addUserForm.name}
            onChange={(e) => onChangeForm({ name: e.target.value })}
            type="text"
            radius="sm"
            id="name"
            label="Họ và tên"
          />
          <Input
            value={addUserForm.username}
            onChange={(e) => onChangeForm({ username: e.target.value })}
            type="text"
            radius="sm"
            id="username"
            label="Username"
          />
          <Input
            value={addUserForm.email}
            onChange={(e) => onChangeForm({ email: e.target.value })}
            type="text"
            radius="sm"
            id="email"
            label="Email"
          />
          <Input
            value={addUserForm.phoneNumber}
            onChange={(e) => onChangeForm({ phoneNumber: e.target.value })}
            type="text"
            radius="sm"
            id="phone"
            label="Số điện thoại"
          />
          <Input
            value={addUserForm.password}
            onChange={(e) => onChangeForm({ password: e.target.value })}
            type="text"
            radius="sm"
            id="password"
            label="Mật khẩu"
          />
        </ModalBody>
        <ModalFooter>
          <FlexBox className="gap-4 w-full justify-between">
            <Button radius="sm" onClick={resetForm} color="default">
              Xóa
            </Button>
            <Button radius="sm" onClick={submitForm} color="primary">
              Thêm người dùng
            </Button>
          </FlexBox>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
