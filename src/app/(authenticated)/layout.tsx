"use client";
import PrivateNavbar from "@/layouts/private/Navbar";
import { Fragment } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Fragment>
      <PrivateNavbar />
      {children}
    </Fragment>
  );
}
