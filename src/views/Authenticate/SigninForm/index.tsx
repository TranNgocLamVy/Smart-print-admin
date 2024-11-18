"use client";

import { useState } from "react";
import Form from "@/components/Form";
import { H1 } from "@/components/Heading";
import { Button, Checkbox, Divider, Input, Radio } from "@nextui-org/react";
import CustomButton from "@/components/CustomButton";

type FormData = {
  username: string;
  password: string;
};

export default function SigninForm() {
  const [signInFormData, setSignInFormData] = useState<FormData>({
    username: "",
    password: "",
  });

  return (
    <Form className="bg-neutral-200 p-4 gap-3 w-[32rem] items-start">
      <H1 className="text-error-500">Enter your username and password</H1>
      <Divider />
      <div className="flex flex-col gap-3 w-96">
        <Input
          id="username"
          radius="sm"
          label="Username"
          placeholder="Enter your username"
          labelPlacement="outside"
          variant="bordered"
          className="bg-white rounded-md"
        />
        <Input
          id="password"
          radius="sm"
          label="Password"
          placeholder="Enter your password"
          labelPlacement="outside"
          className="bg-white rounded-md"
          variant="bordered"
        />
        <Checkbox color="success" radius="sm">
          Warn me before logging into other site
        </Checkbox>
      </div>
      <Divider />
      <div className="flex gap-4">
        <Button
          radius="sm"
          size="sm"
          className="bg-primary-500 text-white font-bold">
          Sign in
        </Button>
        <Button
          radius="sm"
          size="sm"
          variant="flat"
          className="text-black font-bold">
          Clear
        </Button>
      </div>
    </Form>
  );
}
