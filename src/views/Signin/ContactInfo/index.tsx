import { H3 } from "@/components/Heading";
import { Spacer } from "@nextui-org/react";

export default function ContactInfo() {
  return (
    <div className="w-full h-fit flex flex-col gap-4">
      <div>
        <H3 className="text-error-500">Ngôn ngữ</H3>
        <p>Tiếng việt</p>
      </div>

      <div>
        <H3 className="text-error-500">Lưu ý</H3>
        <p>
          Trang đăng nhập này cho phép đăng nhập một lần đến nhiều hệ thống web
          ở trường Đại học Bách Khoa Tp.HCM. Điều này có nghĩa là bạn chỉ đăng
          nhập một lần cho những hệ thống web đã đăng ký với hệ thống xác thực
          quản lý truy cập tập trung.
          <br />
          Bạn cần dùng tài khoản HCMUT để đăng nhập. Tài khoản HCMUT cho phép
          truy cập đến nhiều tài nguyên bao gồm hệ thống thông tin, thư điện tử,
          ...
          <br />
          Vì lý do an ninh, bạn hãy Thoát khỏi trình duyệt Web khi bạn kết thúc
          việc truy cập các dịch vụ đòi hỏi xác thực!
        </p>
      </div>

      <div>
        <H3 className="text-error-500">Hỗ trợ kỹ thuật</H3>
        <span>E-mail: support@hcmut.edu.vn ĐT: 90909009009</span>
      </div>
    </div>
  );
}
