import React from "react";
import FormSelect from "./UI/FormSelect";
import FormInput from "./UI/FormInput";
import MultiSelect from "./UI/MultiSelect";
import ComboBox from "./UI/FormComboBox";
import { Button } from "../ui/button";
import FormBackgroundEffect from "../Effect/FormBackgroundEffect";
import SingleSelect from "./UI/SingleSelect";
import {
  degreeOptions,
  fieldOfStudyOptions,
  roleOptions,
  skillOptions,
  statusOptions,
  universityOptions,
} from "@/lib/data";

const ApplicantFieldsSection = ({
  formState,
  formErrors,
  handleChange,
  handleMultiSelectChange,
  updateEducationField,
  addEducation,
  removeEducation,
}) => {
  return (
    <div className="form-layout mb-8">
      {/* Background Effects */}
      <FormBackgroundEffect />

      <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
        Professional Details
      </h2>

      <div className="grid grid-cols-1 gap-y-3">
        <FormSelect
          id="currentStatus"
          label="Current Status"
          value={formState.currentStatus}
          onChange={handleChange}
          options={statusOptions}
          error={formErrors.currentStatus}
          required
          placeholder="Select your current status"
        />

        <div>
          {formState.education.map((edu, index) => (
            <div key={index} className=" mb-4">
              {/* University Input */}
              <SingleSelect
                id={`university-${index}`}
                label="University"
                selectedOption={edu.university}
                onChange={(val) => {
                  updateEducationField(index, "university", val);

                  const uni = universityOptions.find((u) => u.value === val);
                  const website = uni?.website || "";

                  updateEducationField(index, "website", website); // store it in state if needed
                }}
                options={universityOptions}
                error={formErrors[`university-${index}`]}
                required
                placeholder="Choose University"
                allowCustom
              />
              <div className="grid md:grid-cols-2 gap-4 items-end mb-4">
                {/* Degree Select */}
                <SingleSelect
                  id={`degree-${index}`}
                  label="Degree"
                  selectedOption={edu.degree}
                  onChange={(val) => {
                    updateEducationField(index, "degree", val);
                  }}
                  options={degreeOptions}
                  error={formErrors[`degree-${index}`]}
                  required
                  placeholder="Choose Degree"
                  allowCustom
                />

                {/* Major Select */}
                <SingleSelect
                  id={`fieldOfStudy-${index}`}
                  label="Major/Field of Study"
                  selectedOption={edu.fieldOfStudy}
                  onChange={(val) => {
                    updateEducationField(index, "fieldOfStudy", val);
                  }}
                  options={fieldOfStudyOptions}
                  error={formErrors[`fieldOfStudy-${index}`]}
                  required
                  placeholder="Choose Major"
                  allowCustom
                />
              </div>

              {/* Year of Passing Input */}
              <div className="grid md:grid-cols-2 gap-4 items-end">
                <div>
                  <ComboBox
                    id={`startDate-${index}`}
                    value={edu.startDate}
                    onChange={(val) =>
                      updateEducationField(index, "startDate", val)
                    }
                    options={[
                      { value: "2020", label: "2020" },
                      { value: "2021", label: "2021" },
                      { value: "2022", label: "2022" },
                      { value: "2023", label: "2023" },
                      { value: "2024", label: "2024" },
                      { value: "2025", label: "2025" },
                      { value: "2026", label: "2026" },
                      { value: "2027", label: "2027" },
                      { value: "2028", label: "2028" },
                      { value: "2029", label: "2029" },
                      { value: "2030", label: "2030" },
                      { value: "2031", label: "2031" },
                      { value: "2032", label: "2032" },
                      { value: "2033", label: "2033" },
                      { value: "2034", label: "2034" },
                      { value: "2035", label: "2035" },
                      { value: "2036", label: "2036" },
                      { value: "2037", label: "2037" },
                      { value: "2038", label: "2038" },
                      { value: "2039", label: "2039" },
                      { value: "2040", label: "2040" },
                      { value: "other", label: "Other" },
                    ]}
                    placeholder="Select Start Date"
                    className="md:col-span-1"
                    searchMessage="Search Start Date"
                    error={formErrors[`startDate-${index}`]}
                  />
                </div>
                <div>
                  <ComboBox
                    id={`endDate-${index}`}
                    value={edu.endDate}
                    onChange={(val) =>
                      updateEducationField(index, "endDate", val)
                    }
                    options={[
                      { value: "2020", label: "2020" },
                      { value: "2021", label: "2021" },
                      { value: "2022", label: "2022" },
                      { value: "2023", label: "2023" },
                      { value: "2024", label: "2024" },
                      { value: "2025", label: "2025" },
                      { value: "2026", label: "2026" },
                      { value: "2027", label: "2027" },
                      { value: "2028", label: "2028" },
                      { value: "2029", label: "2029" },
                      { value: "2030", label: "2030" },
                      { value: "2031", label: "2031" },
                      { value: "2032", label: "2032" },
                      { value: "2033", label: "2033" },
                      { value: "2034", label: "2034" },
                      { value: "2035", label: "2035" },
                      { value: "2036", label: "2036" },
                      { value: "2037", label: "2037" },
                      { value: "2038", label: "2038" },
                      { value: "2039", label: "2039" },
                      { value: "2040", label: "2040" },
                      { value: "other", label: "Other" },
                    ]}
                    placeholder="Select End Date"
                    searchMessage="Search End Date"
                    className="md:col-span-1"
                    error={formErrors[`endDate-${index}`]}
                  />
                </div>
              </div>

              {/* Custom University Input */}
              {edu.degree === "other" && (
                <FormInput
                  id={`customDegree-${index}`}
                  label="Custom Degree"
                  value={edu.customDegree}
                  onChange={(e) =>
                    updateEducationField(index, "customDegree", e.target.value)
                  }
                  placeholder="Enter your Degree name"
                  className="md:col-span-2"
                  error={formErrors[`customDegree-${index}`]}
                />
              )}

              {/* Custom University Input */}
              {edu.university === "other" && (
                <FormInput
                  id={`customUniversity-${index}`}
                  label="Custom University"
                  value={edu.customUniversity}
                  onChange={(e) =>
                    updateEducationField(
                      index,
                      "customUniversity",
                      e.target.value
                    )
                  }
                  placeholder="Enter your university name"
                  className="md:col-span-2"
                  error={formErrors[`customUniversity-${index}`]}
                />
              )}

              {/* Custom Year of Passing Input */}
              {edu.startDate === "other" && (
                <FormInput
                  id={`customStartDate-${index}`}
                  type="number"
                  min={1900}
                  label="Starting Date"
                  value={edu.customStartDate}
                  onChange={(e) =>
                    updateEducationField(
                      index,
                      "customStartDate",
                      e.target.value
                    )
                  }
                  placeholder="Enter your Starting Date"
                  className="md:col-span-2"
                  error={formErrors[`customStartDate-${index}`]}
                />
              )}
              {edu.endDate === "other" && (
                <FormInput
                  id={`customEndDate-${index}`}
                  label="Graduation Date"
                  type="number"
                  min={1900}
                  value={edu.customEndDate}
                  onChange={(e) =>
                    updateEducationField(index, "customEndDate", e.target.value)
                  }
                  placeholder="Enter your End Date"
                  className="md:col-span-2"
                  error={formErrors[`customEndDate-${index}`]}
                />
              )}

              {/* Remove Button */}
              {formState.education.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeEducation(index)}
                  className="del3"
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          <Button type="button" onClick={addEducation} className="btn4">
            + Add another qualification
          </Button>
        </div>

        <MultiSelect
          id="preferredRoles"
          label="Preferred Roles"
          selectedOptions={formState.preferredRoles}
          onChange={(values) =>
            handleMultiSelectChange("preferredRoles", values)
          }
          options={roleOptions}
          error={formErrors.preferredRoles}
          required
          placeholder="Add preferred roles"
          allowCustom
        />

        <MultiSelect
          id="keySkills"
          label="Key Skills"
          selectedOptions={formState.keySkills}
          onChange={(values) => handleMultiSelectChange("keySkills", values)}
          options={skillOptions}
          error={formErrors.keySkills}
          required
          placeholder="Add your skills"
          allowCustom
        />
      </div>
    </div>
  );
};

export default ApplicantFieldsSection;
