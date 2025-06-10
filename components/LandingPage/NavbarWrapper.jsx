"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();

  // List of routes where Navbar should NOT be shown
  const hiddenRoutes = ["/onboarding", "/demo", "/demo/landing"];

  if (hiddenRoutes.includes(pathname)) {
    return null; // Hide navbar
  }

  return <Navbar />;
}
