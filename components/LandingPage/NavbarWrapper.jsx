"use client";

import { usePathname } from "next/navigation";
import { Header } from "../HomePage/Header";

export default function NavbarWrapper() {
  const pathname = usePathname();

  // List of routes where Navbar should NOT be shown
  const hiddenRoutes = ["/onboarding", "/demo", "/demo/landing"];

  if (hiddenRoutes.includes(pathname)) {
    return null; // Hide navbar
  }

  return <Header />;
}
