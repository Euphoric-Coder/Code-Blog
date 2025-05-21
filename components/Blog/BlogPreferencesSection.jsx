// components/Form/BlogPreferencesSection.jsx
"use client";
import React from "react";

const blogOptions = [
  "Technology",
  "Health",
  "Finance",
  "Travel",
  "Education",
  "Gaming",
];

const BlogPreferencesSection = ({ preferences, handleChange }) => {
  const togglePreference = (topic) => {
    const newPrefs = preferences.includes(topic)
      ? preferences.filter((item) => item !== topic)
      : [...preferences, topic];
    handleChange("blogPreferences", newPrefs);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
        Choose Your Blog Preferences
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Pick the topics you&apos;re interested in reading or writing about.
      </p>
      <div className="flex flex-wrap gap-3">
        {blogOptions.map((topic) => (
          <button
            key={topic}
            type="button"
            onClick={() => togglePreference(topic)}
            className={`px-4 py-2 rounded-full border ${
              preferences.includes(topic)
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-transparent text-gray-700 dark:text-gray-300 border-gray-400 dark:border-gray-600"
            }`}
          >
            {topic}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BlogPreferencesSection;
