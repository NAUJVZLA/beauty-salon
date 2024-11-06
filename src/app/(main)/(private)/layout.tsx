import React from "react";
import AuthGuard from "./guard/AuthGuard";
import PrimarySearchAppBar from "./navbar/page";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <PrimarySearchAppBar />
      {children}
    </AuthGuard>
  );
}
