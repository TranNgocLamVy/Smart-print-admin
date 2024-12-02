import { FileType, UserRole } from "./main";

export type Student = {
  id: number;
  ssoId: number;
  boughtPaper: number;
  currentFreePaper: number;
  createdAt: string;
  updatedAt: string;
};

export type Admin = {
  ssoId: number;
  lastLogin: string;
};

export type User = {
  ssoId: number;
  password?: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  role: UserRole;
  student?: Student;
  admin?: Admin;
  history: PrintedHistory[];
  paymentHistory: PaymentHistory[];
};

export type Location = {
  building: string;
  floor: number;
  room: number;
};

export type Printer = {
  id: number;
  status: boolean;
  A3PaperCount: number;
  A4PaperCount: number;
  A5PaperCount: number;
  locationId: number;
  location: Location;
  brand: string;
  model: string;
  history: PrintedHistory[];
};

export type PrintedHistory = {
  printingId: number;
  studentId: number;
  printerId: number;
  copies: number;
  fileId: number;
  pagePrint: number;
  filename: string;
  date: string;
  pageSize: string;
};

export type PaymentHistory = {
  transactionId: number;
  dateTime: Date;
  studentId: number;
  value: number;
  numberOfPages: number;
  status: boolean;
};

export type SystemConfig = {
  versionId: number;
  historyClearTime: string;
  allowedFiles: string[];
  freePaperResetDate: string;
  defaultFreePaper: number;
};

export type SystemConfigHistory = {
  versionId: number;
  historyClearTime: string;
  allowedFiles: FileType[];
  freePaperResetDate: string;
  defaultFreePaper: number;
  createdAt: string;
  updatedAt: string;
};
