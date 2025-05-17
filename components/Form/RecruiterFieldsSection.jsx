"use client";

import React from "react";
import { Building2, Briefcase, Globe } from "lucide-react";
import FormInput from "./UI/FormInput";
import FormSelect from "./UI/FormSelect";
import FormBackgroundEffect from "../Effect/FormBackgroundEffect";

const RecruiterFieldsSection = ({ formState, formErrors, handleChange }) => {
  const industryOptions = [
    { value: "technology", label: "Technology" },
    { value: "healthcare", label: "Healthcare" },
    { value: "finance", label: "Finance" },
    { value: "education", label: "Education" },
    { value: "retail", label: "Retail" },
    { value: "manufacturing", label: "Manufacturing" },
    { value: "consulting", label: "Consulting" },
    { value: "media", label: "Media & Entertainment" },
    { value: "hospitality", label: "Hospitality & Tourism" },
    { value: "nonprofit", label: "Non-profit" },
    { value: "other", label: "Other" },
  ];

  return (
    <div className="form-layout">
      <FormBackgroundEffect />
      <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
        Recruiter Details
      </h2>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Please fill in your professional information to help us connect you with
        suitable candidates.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
        <FormInput
          id="organisationName"
          label="Organisation Name"
          value={formState.organisationName}
          onChange={(e) => handleChange("organisationName", e.target.value)}
          error={formErrors.organisationName}
          required
          placeholder="Your company name"
          icon={<Building2 size={18} />}
        />

        <FormInput
          id="recruiterPosition"
          label="Your Position"
          value={formState.recruiterPosition}
          onChange={(e) => handleChange("recruiterPosition", e.target.value)}
          error={formErrors.recruiterPosition}
          required
          placeholder="e.g., HR Manager, Technical Recruiter"
          icon={<Briefcase size={18} />}
        />

        <div className="md:col-span-2">
          <FormInput
            id="companyWebsite"
            label="Company Website"
            type="url"
            value={formState.companyWebsite}
            onChange={(e) => handleChange("companyWebsite", e.target.value)}
            error={formErrors.companyWebsite}
            placeholder="https://yourcompany.com"
            icon={<Globe size={18} />}
          />
        </div>

        <div className="md:col-span-2">
          <FormSelect
            id="industry"
            label="Industry"
            value={formState.industry}
            onChange={handleChange}
            options={industryOptions}
            error={formErrors.industry}
            required
            placeholder="Select your industry"
          />
        </div>
      </div>
    </div>
  );
};

export default RecruiterFieldsSection;
