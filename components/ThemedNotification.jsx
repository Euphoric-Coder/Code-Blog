"use client";

import { Toaster } from "@/components/ui/sonner";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemedNotification = () => {
  const { resolvedTheme } = useTheme(); // gets the actual theme being used (even for system)
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <Toaster richColors theme={resolvedTheme} />;
};

export default ThemedNotification;
