"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const RedirectPage = ({ redirectTo, delay = 2500, userName }) => {
  const [counter, setCounter] = useState(Math.ceil(delay / 1000));
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const startTime = Date.now(); // when user lands
    const endTime = startTime + delay; // when redirection should happen

    const interval = setInterval(() => {
      const now = Date.now();
      const elapsed = now - startTime;
      const remaining = Math.max(endTime - now, 0);

      setProgress(Math.min((elapsed / delay) * 100, 100)); // Progress fills based on elapsed time
      setCounter(Math.ceil(remaining / 1000)); // Counter updates based on remaining time

      if (now >= endTime) {
        clearInterval(interval);
        router.push(redirectTo);
      }
    }, 100); // update every 100ms for smooth progress

    return () => clearInterval(interval);
  }, [router, redirectTo, delay]);

  const greeting = userName ? `Welcome back, ${userName}!` : "Welcome back!";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-md w-full p-8 mx-auto">
        <div className="flex flex-col items-center text-center">
          {/* Loading Spinner */}
          <div className="mb-6 flex justify-center items-center">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600 dark:text-blue-400" />
          </div>

          {/* Greeting */}
          <h1 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white animate-fade-in">
            {greeting}
          </h1>

          {/* Redirect Message */}
          <p className="text-gray-600 dark:text-gray-300 mb-8 animate-fade-in delay-150">
            Redirecting you to your dashboard
            {counter > 0 ? ` in ${counter}...` : "..."}
          </p>

          {/* Progress Bar */}
          <Progress value={progress} className="w-64 mb-8" />

          {/* Fallback Link */}
          <p className="text-sm text-gray-500 dark:text-gray-400">
            If you&apos;re not redirected automatically,{" "}
            <span
              onClick={() => router.push(redirectTo)}
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline cursor-pointer"
            >
              click here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RedirectPage;
