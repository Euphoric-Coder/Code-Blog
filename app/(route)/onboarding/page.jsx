"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import BasicInfoSection from "@/components/Form/BasicInfoSection";
import CommonFieldsSection from "@/components/Form/CommonFieldsSection";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import OnboardingSuccess from "@/components/Onboarding/OnboardingSuccessPage";
import RedirectPage from "@/components/Onboarding/RedirectPage";
import { db } from "@/lib/dbConfig";
import { Users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { ModeToggle } from "@/components/theme-btn";
import BlogPreferencesSection from "@/components/Blog/BlogPreferencesSection";

const Page = () => {
  const { user, isSignedIn } = useUser();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    profileImage: "",
    gender: "",
    age: "",
    location: "",
    bio: "",
    linkedInUrl: "",
    websites: [],
    aboutMe: {},
    blogPreferences: [],

    isOnboarded: false,
  });

  const [currentPage, setCurrentPage] = useState(1);

  const [willSkip, setWillSkip] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const [submitted, setSubmitted] = useState(false);

  const [onboarded, setOnboarded] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const result = await fetch("/api/add-user");
      const resp = await result.json();
      console.log(resp.userAdded);
      setIsLoggedIn(resp.userAdded ? true : false);
      setFormData((prev) => ({
        ...prev,
        isOnboarded: resp.isOnboarded,
      }));
      setOnboarded(resp.isOnboarded);
    };

    if (isSignedIn && user) {
      checkUser();
      setFormData((prev) => ({
        ...prev,
        email: user?.primaryEmailAddress?.emailAddress,
        fullName: user?.fullName,
        profileImage: user?.imageUrl,
      }));
    } else {
      redirect("/sign-in");
    }
  }, [isSignedIn, user]);

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitted form data:", formData);

    const loadingToastId = toast.loading("Submitting your profile...");

    try {
      setFormData((prev) => ({
        ...prev,
        // isOnboarded: true,
      }));

      const result = await db
        .update(Users)
        .set(formData)
        .where(eq(Users.email, formData.email))
        .returning();

      if (result) {
        setTimeout(() => {
          toast.dismiss(loadingToastId);
          toast.success("Profile submitted successfully!");
          console.log("Form submitted:", formData);
          // setSubmitted(true);
        }, 1000);
      } else {
        setTimeout(() => {
          toast.dismiss(loadingToastId);
          toast.error("Something went wrong. Please try again.");
        }, 1000);
      }
    } catch (error) {
      toast.dismiss(loadingToastId);
      toast.error("Something went wrong. Please try again.", error);
    }
  };

  if (!isLoggedIn) return <div>Please sign in again to continue.</div>;
  if (onboarded && isLoggedIn)
    return (
      <div>
        <RedirectPage redirectTo="/" userName={user.firstName} />
      </div>
    );
  if (submitted)
    return (
      <div>
        <OnboardingSuccess />
      </div>
    );

  return (
    <div className="min-h-screen w-full bg-gradient-to-tr from-[#e0f2ff] to-[#f8fbff] dark:from-[#0b1625] dark:to-[#112030] transition-colors duration-500 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl bg-[#e8f4ff]/60 dark:bg-[#1e2e44]/60 backdrop-blur-xl border border-blue-200 dark:border-blue-800 rounded-3xl shadow-2xl p-8 md:p-12">
        {/* Step Header */}
        <header className="flex justify-between items-start mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-blue-900 dark:text-blue-200">
              {currentPage === 1
                ? "Let Us Know You"
                : "Choose Your Interests"}
            </h1>
            <p className="text-gray-700 dark:text-gray-300 mt-2 text-sm md:text-base">
              {currentPage === 1
                ? "Tell us about yourself to personalize your journey."
                : "Select your interests so we can recommend blogs tailored to you."}
            </p>
          </div>
          <ModeToggle />
        </header>

        {/* Page Indicator */}
        <div className="mb-6 text-right">
          <span className="inline-block px-4 py-1 text-xs font-medium rounded-full bg-blue-200 text-blue-900 dark:bg-blue-800 dark:text-blue-100">
            Page {currentPage} of 2
          </span>
        </div>

        {/* Form Body */}
        <div className="space-y-10 transition-opacity duration-500 ease-in-out animate-fade-in">
          {currentPage === 1 && (
            <>
              <BasicInfoSection
                fullName={formData.fullName}
                email={formData.email}
                profileImage={formData.profileImage}
                user={user}
              />
              <CommonFieldsSection
                formState={formData}
                formErrors={formErrors}
                handleChange={handleChange}
              />
            </>
          )}

          {currentPage === 2 && (
            <BlogPreferencesSection
              preferences={formData.blogPreferences}
              handleChange={handleChange}
            />
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="mt-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-4 w-full md:w-auto">
            {currentPage > 1 && (
              <Button
                variant="outline"
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="rounded-full border-blue-500 text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900"
              >
                Back
              </Button>
            )}
            <Button
              variant="ghost"
              onClick={() => setWillSkip(true)}
              className="rounded-full text-blue-700 dark:text-blue-400 hover:underline"
            >
              Skip for now
            </Button>
          </div>

          {currentPage < 2 ? (
            <Button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="rounded-full bg-blue-600 hover:bg-blue-700 text-white w-full md:w-auto"
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white w-full md:w-auto"
            >
              Submit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
