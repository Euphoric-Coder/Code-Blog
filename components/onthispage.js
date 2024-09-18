"use client";
import React, { useEffect, useState } from "react";
import parse from "html-react-parser";

const OnThisPage = ({ htmlContent }) => {
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    // Parse the HTML content and extract h2 headings
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlContent;
    const h2Elements = tempDiv.querySelectorAll("h2");
    const h2Data = Array.from(h2Elements).map((h2) => ({
      text: h2.textContent,
      id: h2.id,
    }));
    setHeadings(h2Data);
  }, [htmlContent]);

  return (
    <div className="on-this-page fixed top-24 left-4 w-64 p-4 bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-y-auto max-h-screen border-l-4 border-purple-500">
      {/* Sidebar Heading */}
      <h2 className="text-lg font-bold mb-4 text-purple-700">INTRODUCTION</h2>

      {/* Sidebar Links */}
      <ul className="text-sm space-y-2">
        {headings.map((heading, index) => (
          <li key={index} className="hover:underline">
            <a
              href={`#${heading.id}`}
              className="text-gray-700 dark:text-gray-300"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OnThisPage;
