import React from "react";
import { Briefcase, GraduationCap, CheckCircle2 } from "lucide-react";

const UserTypeSelector = ({ selectedType, onChange }) => {
  return (
    <div className="mt-8 mb-6">
      <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300 tracking-wide">
        I am a<span className="text-red-500 ml-1">*</span>
      </label>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          {
            type: "recruiter",
            title: "Recruiter",
            description: "I want to find candidates",
            icon: <Briefcase size={28} />,
          },
          {
            type: "applicant",
            title: "Applicant",
            description: "I am looking for opportunities / career guidance",
            icon: <GraduationCap size={28} />,
          },
        ].map(({ type, title, description, icon }) => {
          const isSelected = selectedType === type;

          return (
            <div
              key={type}
              onClick={() => onChange(type)}
              className={`relative transition-all duration-500 group rounded-2xl cursor-pointer transform border-[3px] border-blue-500 hover:shadow-lg mb-5 ${
                isSelected && "shadow-xl scale-[1.02]"
              }`}
            >
              {/* Glowing selection ring */}
              {isSelected && (
                <div className="absolute top-2 right-2">
                  <CheckCircle2 className="text-green-600 dark:text-green-400 drop-shadow" size={30}/>
                </div>
              )}

              <div
                className={`flex items-center gap-4 p-5 rounded-2xl transition-all duration-200 h-full w-full
                  ${
                    isSelected
                      ? "bg-gradient-to-br from-blue-100 to-indigo-100 via-white dark:from-indigo-800 dark:to-blue-900/10 dark:via-[#111827] ring-4 ring-blue-300 dark:ring-indigo-400"
                      : "bg-white dark:bg-[#111827] group-hover:bg-gradient-to-br group-hover:from-blue-100 group-hover:to-indigo-200 dark:group-hover:from-blue-950 dark:group-hover:to-indigo-900"
                  }
                `}
              >
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-full shadow-md transition-all duration-200 border-2 border-blue-500
                    ${
                      isSelected
                        ? "bg-gradient-to-br text-white from-blue-600 to-indigo-600 dark:from-indigo-600 dark:to-blue-500"
                        : "bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-gray-700 dark:to-gray-800 text-blue-600"
                    }
                  `}
                >
                  {icon}
                </div>

                <div className="flex flex-col">
                  <h3
                    className={`text-base font-bold tracking-wide transition-all ${
                      isSelected
                        ? "text-blue-900 dark:text-white"
                        : "text-gray-700 dark:text-gray-400"
                    }`}
                  >
                    {title}
                  </h3>
                  <p
                    className={`text-sm transition-all ${
                      isSelected
                        ? "text-blue-700 dark:text-indigo-300"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserTypeSelector;
