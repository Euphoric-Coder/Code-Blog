"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function FooterWrapper() {
  const pathname = usePathname();

  // Define routes where the footer should be hidden
  const hiddenRoutes = ["/onboarding"];

  if (hiddenRoutes.includes(pathname)) {
    return null; // Don't show footer
  }

  return <Footer />;
}
