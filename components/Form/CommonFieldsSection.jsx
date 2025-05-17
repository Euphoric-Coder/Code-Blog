"use client";

import React, { useEffect, useState } from "react";
import { MapPin, User2, LinkedinIcon, Hourglass } from "lucide-react";
import FormSelect from "./UI/FormSelect";
import FormInput from "./UI/FormInput";
import FormTextarea from "./UI/FormTextArea";
import ResumeUpload from "./UI/ResumeUpload";
import FormBackgroundEffect from "../Effect/FormBackgroundEffect";

const CommonFieldsSection = ({
  formState,
  formErrors,
  handleChange,
  handleFileChange,
  handleInputChange,
  userType,
}) => {
  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];
  const [uploadData, setUploadData] = useState();
  const [fileId, setFileId] = useState(formState.resumeId || null);

  useEffect(() => {
    if (uploadData && fileId) {
      handleChange("resumeURL", uploadData.url || "");
      handleChange("resumeId", fileId || "");
      handleChange(
        "resumeName",
        uploadData.name.replace(/_(?!.*_)[^_]+(?=\.\w+$)/, "") || ""
      );
    }
  }, [uploadData, fileId]);

  console.log("File ID:", fileId);
  console.log("Upload Data:", uploadData);

  return (
    <div className="form-layout mb-10">
      {/* Background Effects */}
      <FormBackgroundEffect />

      <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
        Personal Details
      </h2>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Please fill in your personal details. This information will help us
        understand your background and preferences better.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
        <FormSelect
          id="gender"
          label="Gender"
          value={formState.gender}
          onChange={handleChange}
          options={genderOptions}
          error={formErrors.gender}
          required
          icon={<User2 size={18} />}
        />

        <FormInput
          id="age"
          label="Age"
          type="number"
          value={formState.age}
          onChange={(e) => handleChange("age", e.target.value)}
          error={formErrors.age}
          required
          icon={<Hourglass size={24} />}
          min={18}
          max={100}
        />

        <div className="md:col-span-2">
          <FormInput
            id="location"
            label="Location"
            value={formState.location}
            onChange={(e) => handleChange("location", e.target.value)}
            error={formErrors.location}
            required
            placeholder="City, State, Country"
            icon={<MapPin size={24} />}
          />
        </div>

        <div className="md:col-span-2">
          <FormTextarea
            id="bio"
            label="Bio"
            value={formState.bio}
            onChange={(e) => handleChange("bio", e.target.value)}
            error={formErrors.bio}
            required
            placeholder="Tell us about yourself..."
            rows={4}
          />
        </div>

        <div className="md:col-span-2">
          <FormInput
            id="linkedInUrl"
            label="LinkedIn Profile URL"
            type="url"
            value={formState.linkedInUrl}
            onChange={(e) => handleChange("linkedInUrl", e.target.value)}
            error={formErrors.linkedInUrl}
            placeholder="https://linkedin.com/in/yourprofile"
            icon={<LinkedinIcon size={24} />}
          />
        </div>

        {userType === "applicant" && (
          <div className="md:col-span-2">
            {/* <FileUpload
              id="resume"
              label="Upload Resume"
              onChange={handleFileChange}
              error={formErrors.resume}
              selectedFile={formState.resume}
            /> */}
            <ResumeUpload
              uploadData={uploadData}
              setUploadData={setUploadData}
              fileId={fileId}
              setFileId={setFileId}
              handleInputChange={handleInputChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CommonFieldsSection;
