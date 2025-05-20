"use client";

import React, { useEffect, useState } from "react";
import SuccessIcon from "./SuccessIcon";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";

const OnboardingSuccess = () => {
  const [visible, setVisible] = useState(false);
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    // Trigger the animation after component mounts
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Start countdown after animation completes
    if (visible && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (countdown === 0) {
      handleGoToDashboard();
    }
  }, [visible, countdown]);

  const handleGoToDashboard = () => {
    // Navigate to dashboard (placeholder function)
    console.log("Navigating to dashboard");
    // In a real app, you'd use router navigation here
    // e.g., router.push('/dashboard')
    // redirect("/test");
    redirect("/");
  };

  return (
    <div
      className={`
      min-h-screen flex items-center justify-center
      bg-gradient-to-b from-blue-50 to-slate-50
      dark:from-slate-900 dark:to-blue-950
      transition-all duration-500 ease-in-out p-4
      ${visible ? "opacity-100" : "opacity-0"}
    `}
    >
      <div
        className="
        max-w-md w-full bg-white dark:bg-slate-800
        rounded-2xl shadow-card dark:shadow-card-dark
        backdrop-blur-sm backdrop-saturate-150
        bg-opacity-95 dark:bg-opacity-90
        p-8 sm:p-10 text-center
      "
      >
        <div className="space-y-6">
          {/* Success Icon */}
          <div
            className={`
            mx-auto transform transition-all duration-700 ease-out
            ${visible ? "translate-y-0 scale-100" : "translate-y-4 scale-95"}
          `}
          >
            <SuccessIcon className="dark:text-emerald-400 flex justify-center" />
          </div>

          {/* Heading */}
          <h1
            className={`
            text-2xl sm:text-3xl font-bold
            text-slate-900 dark:text-white
            transform transition-all duration-700 delay-100 ease-out
            ${visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}
          `}
          >
            Onboarding Complete!
          </h1>

          {/* Message */}
          <p
            className={`
            text-slate-600 dark:text-slate-300 mt-2
            transform transition-all duration-700 delay-200 ease-out
            ${visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}
          `}
          >
            Thank you for signing up. You&apos;re all set to get started!
          </p>

          {/* Countdown Message */}
          <p
            className={`
            text-sm text-slate-500 dark:text-slate-400
            transform transition-all duration-700 delay-200 ease-out
            ${visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}
          `}
          >
            Redirecting to Dashboard in {countdown} seconds...
          </p>

          {/* Button */}
          <div
            className={`
            mt-8 sm:mt-10
            transform transition-all duration-700 delay-300 ease-out
            ${visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}
          `}
          >
            <Button onClick={handleGoToDashboard}>Go to Dashboard</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingSuccess;
