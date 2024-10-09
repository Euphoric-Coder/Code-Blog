"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme(); // Use resolvedTheme for correct theme detection
  const [mounted, setMounted] = React.useState(false); // Track when the component is mounted

  // Set the mounted state to true when the component mounts
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent rendering the icon until the component is mounted (fix hydration error)
  if (!mounted) {
    return null;
  }

  // Function to toggle between 'light' and 'dark' themes
  const toggleTheme = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme}>
      {/* Toggle between Sun and Moon icons based on resolvedTheme */}
      {resolvedTheme === "light" ? (
        <MoonIcon className="h-[1.2rem] w-[1.2rem] transition-transform" />
      ) : (
        <SunIcon className="h-[1.2rem] w-[1.2rem] transition-transform" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
