import type { Metadata } from "next";
import "../globals.css";
import GuestGuard from "@/auth/GuestGuard";
import { FallbackSpinner } from "@/components/ui/fallbackspinner";
export const metadata: Metadata = {
  title: "Đăng nhập",
  description: "Đăng nhập hệ thống KEPLER",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>
  <GuestGuard fallback={<FallbackSpinner fullScreen={true} />}>{children}</GuestGuard>
  </>;
}
