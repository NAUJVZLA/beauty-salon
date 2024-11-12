import React from "react";
import AuthGuard from "./guard/AuthGuard";
import PrimarySearchAppBar from "./navbar/page";
import { ToastContainer } from "react-toastify";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <AuthGuard>
        <PrimarySearchAppBar />
        {children}
        <ToastContainer />
      </AuthGuard>
    </div>
  );
}
