"use client";

import React, { Suspense } from "react";
import { usePathname } from "next/navigation";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import LoginModal from "@/components/LoginModal";
import BulkEnquiryModal from "@/components/BulkEnquiryModal";
import ToastNotification from "@/components/ToastNotification";

function StoreLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return (
      <>
        {children}
        <LoginModal />
        <ToastNotification />
      </>
    );
  }

  return (
    <>
      <TopBar />
      <Navbar />
      <div className="flex-1 flex flex-col">{children}</div>
      <Footer />
      <CartDrawer />
      <LoginModal />
      <BulkEnquiryModal />
      <ToastNotification />
    </>
  );
}

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white">{children}</div>}>
      <StoreLayoutContent>{children}</StoreLayoutContent>
    </Suspense>
  );
}
