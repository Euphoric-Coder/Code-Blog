"use client";

import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import BasicInfoSection from "@/components/Form/BasicInfoSection";
import UserTypeSelector from "@/components/Form/UserTypeSelector";
import ApplicantFieldsSection from "@/components/Form/ApplicantFieldsSection";
import CommonFieldsSection from "@/components/Form/CommonFieldsSection";
import RecruiterFieldsSection from "@/components/Form/RecruiterFieldsSection";
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

  const handleUserTypeChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      userType: value,
    }));
    if (value === "recruiter") {
      setFormData((prev) => ({
        ...prev,
        organisationName: "",
        recruiterPosition: "",
        companyWebsite: "",
        industry: "",
      }));
    }
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

  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          degree: "",
          university: "",
          fieldOfStudy: "",
          website: "", // initialize to empty string
          customDegree: "", // initialize to empty string
          customUniversity: "", // initialize to empty string
          startDate: "",
          endDate: "",
          customStartDate: "",
          customEndDate: "",
        },
      ],
    }));
  };

  const removeEducation = (index) => {
    setFormData((prev) => {
      const updated = [...prev.education];
      updated.splice(index, 1);
      return { ...prev, education: updated };
    });
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.currentStatus) {
      errors.currentStatus = "This field is required";
    }

    formData.education.forEach((edu, index) => {
      if (!edu.degree) {
        errors[`degree-${index}`] = "Degree is required";
      } else if (edu.degree === "other" && !edu.customDegree) {
        errors[`customDegree-${index}`] = "Please specify your degree";
      }

      if (!edu.fieldOfStudy) {
        errors[`fieldOfStudy-${index}`] = "Major is required";
      }

      if (!edu.university) {
        errors[`university-${index}`] = "University is required";
      } else if (edu.university === "other" && !edu.customUniversity) {
        errors[`customUniversity-${index}`] = "Please specify your university";
      }

      if (!edu.startDate) {
        errors[`startDate-${index}`] = "Start Date is required";
      } else if (edu.startDate === "other" && !edu.customStartDate) {
        errors[`customStartDate-${index}`] = "Please enter your start date";
      }

      if (!edu.endDate) {
        errors[`endDate-${index}`] = "End Date is required";
      } else if (edu.endDate === "other" && !edu.customEndDate) {
        errors[`customEndDate-${index}`] = "Please enter your end date";
      }
    });

    if (formData.preferredRoles.length === 0) {
      errors.preferredRoles = "Please add at least one preferred role";
    }

    if (formData.keySkills.length === 0) {
      errors.keySkills = "Please add at least one skill";
    }

    if (!formData.gender) errors.gender = "Gender is required";

    if (!formData.age || formData.age < 18)
      errors.age = "Valid age is required";

    if (!formData.location) errors.location = "Location is required";

    if (!formData.bio) errors.bio = "Bio is required";

    if (
      formData.linkedInUrl.trim() &&
      !/^(https:\/\/)?(www\.|[a-z]{2}\.)linkedin\.com\/in\/[A-Za-z0-9_-]+\/?$/.test(
        formData.linkedInUrl.trim()
      )
    ) {
      errors.linkedInUrl =
        "Enter a valid LinkedIn profile URL (e.g., www.linkedin.com/country-code/your-name)";
    }

    if (formData.userType === "recruiter") {
      if (!formData.organisationName)
        errors.organisationName = "Organisation Name is required";

      if (!formData.recruiterPosition)
        errors.recruiterPosition = "Your position is required";

      if (formData.companyWebsite?.trim()) {
        const urlPattern =
          /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/i;
        if (!urlPattern.test(formData.companyWebsite.trim())) {
          errors.companyWebsite = "Enter a valid company website URL";
        }
      }

      if (!formData.industry)
        errors.industry = "Industry selection is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitted form data:", formData);

    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }

    const loadingToastId = toast.loading("Submitting your profile...");

    try {
      setFormData((prev) => ({
        ...prev,
        isOnboarded: true,
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
          setSubmitted(true);
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

        <UserTypeSelector
          selectedType={formData.userType}
          onChange={handleUserTypeChange}
        />

        {formData.userType && (
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
            userType={formData.userType}
          />
        )}

        {formData.userType === "recruiter" && (
          <RecruiterFieldsSection
            formState={formData}
            formErrors={formErrors}
            handleChange={handleChange}
          />
        )}

        {formData.userType === "applicant" && (
          <ApplicantFieldsSection
            formState={formData}
            formErrors={formErrors}
            handleChange={handleChange}
            updateEducationField={updateEducationField}
            handleMultiSelectChange={handleMultiSelectChange}
            addEducation={addEducation}
            removeEducation={removeEducation}
          />
        )}
        {formData.userType !== "" && (
          <div className="mt-6">
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
