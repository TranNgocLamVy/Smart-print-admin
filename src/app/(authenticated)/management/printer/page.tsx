import Container from "@/components/Container";
import NavLink from "@/layouts/private/NavLink";
import { HistoryOperation, PrinterOperation } from "@/libs";
import { Printer } from "@/types";
import { SearchCriteria, SearchPayload } from "@/types/main";
import PrinterManagement from "@/views/Printer/PrinterManagement";
import axios from "axios";
import { cookies } from "next/headers";

interface PageProps {
  searchParams: SearchParams;
}

export default async function Page({ searchParams }: PageProps) {
  const { printerList, printerCount } = await fetchPrinter(searchParams);

  return (
    <Container className="bg-neutral-50 py-20">
      <NavLink />
      <PrinterManagement
        printerList={printerList}
        printerCount={printerCount}
        defaultParams={searchParams}
      />
    </Container>
  );
}

async function fetchPrinter(params: SearchParams) {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    return { printerList: [], printerCount: 0 };
  }

  const searchCriteria: SearchCriteria = {
    field: params.field ?? "Location.building",
    operator: "~",
    value: params.value ?? "",
  };

  const searchPayload: SearchPayload = {
    criteria: [],
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

  const printer = new PrinterOperation();
  let printerList: Printer[] = [];
  let res = await printer.searchPrinter(searchPayload, token);

  if (res.success) {
    printerList = res.data as Printer[];
    const historyOperation = new HistoryOperation();
    printerList.forEach((printer) => {
      historyOperation.getPrinterHistory(printer.id, token).then((res) => {
        if (res.success) {
          printer.history = res.data;
        } else {
          printer.history = [];
        }
      });
    });
  }

  let printerCount = 0;
  res = await printer.getNumberOfPrinter(token);

  if (res.success) {
    printerCount = res.data;
  }

  return { printerList, printerCount };
}
