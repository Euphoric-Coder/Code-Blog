"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./Footer";

export default function FooterWrapper() {
  const pathname = usePathname();

  // Shows the footer only on the landing page ("/")
  const hiddenRoutes = ["/", "/demo/landing", "/demo/landing/"];

  if (!hiddenRoutes.includes(pathname)) {
    return null; // Don't show footer
  }

  return <Footer />;
}
