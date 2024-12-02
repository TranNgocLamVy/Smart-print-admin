import Container from "@/components/Container";
import NavLink from "@/layouts/private/NavLink";
import { HistoryOperation, Payment, User } from "@/libs";
import { User as UserType } from "@/types";
import { SearchCriteria, SearchPayload, UserRole } from "@/types/main";
import UserManagement from "@/views/User/UserManagement";
import { cookies } from "next/headers";

interface PageProps {
  searchParams: SearchParams;
}

export default async function Page({ searchParams }: PageProps) {
  const { userList, userCount } = await fetchUserList(searchParams);

  return (
    <Container className="bg-white py-20">
      <NavLink />
      <UserManagement
        userList={userList}
        defaultParams={searchParams}
        userCount={userCount}
      />
    </Container>
  );
}

async function fetchUserList(params: SearchParams) {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    return { userList: [], userCount: 0 };
  }

  const searchCriteria: SearchCriteria = {
    field: params.field ?? "name",
    operator: "~",
    value: params.value ?? "",
  };

  const searchPayload: SearchPayload = {
    criteria: [
      {
        field: "role",
        operator: "=",
        value: UserRole.STUDENT,
      },
    ],
    addition: {
      sort: [],
      page: params.page || 1,
      size: 10,
      group: [],
    },
  };

  if (searchCriteria.value !== "") {
    searchPayload.criteria.push(searchCriteria);
  }

  const user = new User();

  let res = await user.searchUser(searchPayload, token);

  let userList: UserType[] = [];
  if (res.success) {
    userList = res.data as UserType[];
    const historyOperation = new HistoryOperation();
    const paymentOperation = new Payment();

    //Fetch both history and payment history for each user at the same time
    for (const user of userList) {
      const [historyRes, paymentRes] = await Promise.all([
        historyOperation.getPrintingStudentHistory(user.ssoId, token),
        paymentOperation.getStudentPayment(user.ssoId, token),
      ]);

      if (historyRes.success) {
        user.history = historyRes.data;
      } else {
        user.history = [];
      }

      if (paymentRes.success) {
        user.paymentHistory = paymentRes.data;
      } else {
        user.paymentHistory = [];
      }
    }
  }

  let userCount = 0;
  res = await user.countStudent(token);
  if (res.success) {
    userCount = res.data as number;
  }

  return { userList, userCount };
}
