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

    isOnboarded: false,
  });

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
    <div className="min-h-screen bg-blue-50 dark:bg-slate-950 transition-colors duration-500">
      <div className="container max-w-5xl mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Complete Your Profile
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Let&apos;s get to know you better
            </p>
          </div>
          <ModeToggle />
        </header>

        <BasicInfoSection
          fullName={formData.fullName}
          email={formData.email}
          profileImage={formData.profileImage}
          user={user}
        />

        <div className="mt-10">
          <CommonFieldsSection
            formState={formData}
            formErrors={formErrors}
            handleChange={handleChange}
          />
        </div>

        <div className="mt-6 flex gap-4">
          <Button className="w-full rounded-3xl">Skip for now</Button>
          <Button onClick={handleSubmit} className="w-full btn10 rounded-full">
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
