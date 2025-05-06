"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

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
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700"
    >
      {/* Toggle between Sun and Moon icons based on resolvedTheme */}
      {resolvedTheme === "light" ? (
        <Moon className="h-[1.7rem] w-[1.7rem] transition-transform" />
      ) : (
        <Sun className="h-[1.7rem] w-[1.7rem] transition-transform" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
