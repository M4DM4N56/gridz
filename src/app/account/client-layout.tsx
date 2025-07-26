"use client";

import { UserProvider } from "../../contexts/userContext";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return <UserProvider>{children}</UserProvider>;
}