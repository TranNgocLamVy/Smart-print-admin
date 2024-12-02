import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/provider/AuthProvider";
import { Toaster } from "sonner";
import { ThemeProviders } from "@/provider/ThemeProvider";
import { cookies } from "next/headers";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Smart printing system",
  description: "Smart printing system",
};

const getSidFromCookies = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  return token?.value;
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = await getSidFromCookies();
  return (
    <html suppressHydrationWarning lang="en">
      <body className={roboto.className}>
        <ThemeProviders>
          <AuthProvider token={token}>
            <Toaster closeButton position="top-center" richColors />
            <main>{children}</main>
          </AuthProvider>
        </ThemeProviders>
      </body>
    </html>
  );
}
