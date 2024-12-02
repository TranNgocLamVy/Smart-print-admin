import Container from "@/components/Container";
import NavLink from "@/layouts/private/NavLink";
import { SystemConfiguration } from "@/libs";
import { SystemConfig, SystemConfigHistory } from "@/types";
import SystemManagement from "@/views/System/SystemManagement";
import { cookies } from "next/headers";

export default async function Page() {
  const { systemConfig, historyList } = await fetchAllowFiles();

  return (
    <Container className="bg-white py-20">
      <NavLink />
      <SystemManagement systemConfig={systemConfig} historyList={historyList} />
    </Container>
  );
}

async function fetchAllowFiles() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    return { systemConfig: null, historyList: [] };
  }

  const systemConfigOp = new SystemConfiguration();
  let res = await systemConfigOp.getNewestSystemConfiguration(token);
  if (!res) {
    return { systemConfig: null, historyList: [] };
  }

  const systemConfig = res.data as SystemConfig;

  const historyOp = new SystemConfiguration();
  res = await historyOp.getAllSystemConfiguration(token);
  if (!res) {
    return { systemConfig, historyList: [] };
  }

  const historyList: SystemConfigHistory[] = res.data;

  return { systemConfig, historyList };
}
