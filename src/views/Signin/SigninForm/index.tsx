"use client";

import { useState } from "react";
import Form from "@/components/Form";
import { H2 } from "@/components/Heading";
import { Button, Checkbox, Divider, Input } from "@nextui-org/react";
import { toast } from "sonner";
import { LoginInfoDto, UserRole } from "@/types/main";
import { Auth } from "@/libs";
import { User } from "@/types";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function SigninForm() {
  const router = useRouter();
  const [signInFormData, setSignInFormData] = useState<LoginInfoDto>({
    username: "",
    password: "",
  });

  const handleSubmit = async () => {
    if (signInFormData.username === "" || signInFormData.password === "") {
      toast.error("Vui lòng nhập đầy đủ thông tin tài khoản");
      return;
    }
    const auth = new Auth();
    const res = await auth.login(signInFormData);
    if (res.success) {
      const user = res.data.user as User;
      const token = res.data.token as string;
      if (user.role == UserRole.ADMIN) {
        toast.success("Đăng nhập thành công");
        Cookies.set("token", token);
        router.push("/management/printer");
      } else {
        toast.error("Học sinh không thể đăng nhập vào trang này");
      }
    } else {
      console.log(res);
      toast.error(res.status);
    }
  };

  return (
    <Form className="bg-neutral-200 p-4 gap-3 w-[32rem] items-start">
      <H2 className="text-error-500">Hãy nhập thông tin tài khoản của bạn</H2>
      <Divider />
      <div className="flex flex-col gap-3 w-96">
        <Input
          id="username"
          radius="sm"
          label="Tên tài khoản"
          placeholder="Enter your username"
          labelPlacement="outside"
          variant="bordered"
          value={signInFormData.username}
          onChange={(e) =>
            setSignInFormData((prev) => ({ ...prev, username: e.target.value }))
          }
          className="bg-white rounded-md"
        />
        <Input
          id="password"
          radius="sm"
          label="Mật khẩu"
          placeholder="Enter your password"
          labelPlacement="outside"
          variant="bordered"
          type="password"
          value={signInFormData.password}
          onChange={(e) =>
            setSignInFormData((prev) => ({ ...prev, password: e.target.value }))
          }
          className="bg-white rounded-md"
        />
        <Checkbox color="success" radius="sm">
          Cảnh báo trước khi tôi đăng nhập vào các trang web khác
        </Checkbox>
      </div>
      <Divider />
      <div className="flex gap-4">
        <Button
          radius="sm"
          size="md"
          onClick={handleSubmit}
          className="bg-primary-500 text-white font-bold">
          Đăng nhập
        </Button>
        <Button
          radius="sm"
          size="md"
          variant="flat"
          className="text-black font-bold">
          Xóa
        </Button>
      </div>
    </Form>
  );
}
