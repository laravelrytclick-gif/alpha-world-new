"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ConsultationModal from "./ConsultationModal";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');
  const isAuthRoute = pathname === '/login' || pathname === '/sign-up';
  const shouldShowNavbarFooter = !isAdminRoute && !isAuthRoute;

  return (
    <>
      {shouldShowNavbarFooter && <Navbar />}
      <div className={shouldShowNavbarFooter ? "pt-20 lg:pt-28" : ""}>
        {children}
      </div>
      {shouldShowNavbarFooter && <Footer />}
      <ConsultationModal />
    </>
  );
}
