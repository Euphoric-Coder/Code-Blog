"use client";

import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
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

const page = () => {
  const { user, isSignedIn } = useUser();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    profileImage: "",
    userType: "",
    gender: "",
    age: "",
    location: "",
    bio: "",
    linkedInUrl: "",
    resumeURL: null,
    resumeId: "",
    resumeName: "",

    organisationName: "",
    recruiterPosition: "",
    companyWebsite: "",
    industry: "",

    currentStatus: "",
    education: [
      {
        degree: "",
        university: "",
        fieldOfStudy: "",
        website: "",
        customDegree: "",
        customUniversity: "",
        startDate: "",
        endDate: "",
        customStartDate: "",
        customEndDate: "",
      },
    ],
    preferredRoles: [],
    keySkills: [],

    isOnboarded: false,
  });
  const [formErrors, setFormErrors] = useState({});

  const [submitted, setSubmitted] = useState(false);

  const [onboarded, setOnboarded] = useState(false);

  const storageKey = `pendingOnboarding-${user?.id}`;

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
      const type = localStorage.getItem("userType");
      if (type) {
        setFormData((prev) => ({
          ...prev,
          userType: type,
        }));
        // Optionally: clear it after reading
        // localStorage.removeItem("userType");
      }
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

  const handleInputChange = (field, value) => {
    const updatedBlogData = {
      // title: field === "title" ? value : title,
      // description: field === "description" ? value : description,
      fileId: field === "coverImage" ? value.fileId : fileId,
      uploadData: field === "coverImage" ? value.data : uploadData,
      // content: field === "content" ? value : content,
      // category: field === "category" ? value : category,
      // subcategories: field === "subcategories" ? value : selectedSubCategories,
    };
    // console.log("Updated blog data:", updatedBlogData);
    localStorage.setItem(storageKey, JSON.stringify(updatedBlogData));
  };

  const handleMultiSelectChange = (field, values) => {
    setFormData((prev) => ({
      ...prev,
      [field]: values,
    }));

    if (formErrors[field]) {
      setFormErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

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

  const updateEducationField = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.education];
      updated[index][field] = value;
      return { ...prev, education: updated };
    });

    const errorKey = `${field}-${index}`;
    if (formErrors[errorKey]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[errorKey];
        return newErrors;
      });
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
        {formData.userType === "recruiter" ? (
          <RedirectPage redirectTo="/recruiter" userName={user.firstName} />
        ) : (
          <RedirectPage redirectTo="/applicant" userName={user.firstName} />
        )}
      </div>
    );
  if (submitted)
    return (
      <div>
        <OnboardingSuccess userType={formData.userType} />
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
              Let's get to know you better
            </p>
          </div>
          <ModeToggle />
        </header>

        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-200"
            >
              Full Name
            </label>
            <Input
              id="fullName"
              label="Full Name"
              value={fullName || ""}
              onChange={() => {}}
              readOnly
              icon={<User size={18} />}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-200"
            >
              Email Address
            </label>
            <Input
              id="email"
              label="Email Address"
              type="email"
              value={email || ""}
              onChange={() => {}}
              readOnly
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>
              }
            />
          </div>
        </div> */}

        <BasicInfoSection
          fullName={formData.fullName}
          email={formData.email}
          profileImage={formData.profileImage}
          user={user}
        />

        {formData.userType && (
          <div className="mt-10">
            <CommonFieldsSection
              formState={formData}
              formErrors={formErrors}
              handleChange={handleChange}
              handleFileChange={(file) =>
                setFormData((prev) => ({
                  ...prev,
                  resume: file,
                }))
              }
              handleInputChange={handleInputChange}
              userType={"recruiter"}
            />
          </div>
        )}

        {formData.userType !== "" && (
          <div className="mt-6 flex gap-4">
            <Button className="w-full rounded-3xl">Skip for now</Button>
            <Button
              onClick={handleSubmit}
              className="w-full btn10 rounded-full"
              disabled={!formData.userType}
            >
              Submit
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
