import { H1 } from "@/components/Heading";
import Logo from "@/components/Logo";

export default function Header() {
  return (
    <div className="w-full h-fit flex flex-row items-center justify-start px-4 gap-4 py-2 bg-primary-500">
      <Logo />
      <H1 className="text-white">Dịch vụ xác thực tập trung</H1>
    </div>
  );
}
