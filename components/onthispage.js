"use client";
import React, { useEffect, useState, useRef } from "react";
import { FaBars } from "react-icons/fa"; // Import an icon for the button

const OnThisPage = ({ htmlContent }) => {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to handle sidebar visibility
  const activeElementRef = useRef(null); // Ref for the currently active heading element

  useEffect(() => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlContent;

    const allHeadings = Array.from(tempDiv.querySelectorAll("h1, h2"));
    const structuredHeadings = [];
    let currentH1 = null;

    allHeadings.forEach((heading) => {
      if (heading.tagName.toLowerCase() === "h1") {
        currentH1 = {
          h1: {
            text: heading.textContent,
            id: heading.id,
          },
          h2: [],
        };
        structuredHeadings.push(currentH1);
      } else if (heading.tagName.toLowerCase() === "h2" && currentH1) {
        currentH1.h2.push({
          text: heading.textContent,
          id: heading.id,
        });
      }
    });

    setHeadings(structuredHeadings);
  }, [htmlContent]);

  useEffect(() => {
    const handleIntersection = (entries) => {
      const visibleEntries = entries.filter((entry) => entry.isIntersecting);
      if (visibleEntries.length > 0) {
        visibleEntries.sort((a, b) => a.target.offsetTop - b.target.offsetTop);
        setActiveId(visibleEntries[0].target.id);
      }
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    });

    headings.forEach((section) => {
      const h1Element = document.getElementById(section.h1.id);
      if (h1Element) observer.observe(h1Element);

      section.h2.forEach((heading) => {
        const h2Element = document.getElementById(heading.id);
        if (h2Element) observer.observe(h2Element);
      });
    });

    return () => {
      observer.disconnect();
    };
  }, [headings]);

  useEffect(() => {
    if (activeElementRef.current) {
      activeElementRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [activeId]);

  return (
    <>
      {/* Button to toggle sidebar on smaller displays */}
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-full shadow-lg lg:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 p-6 bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-y-auto transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:top-24 lg:w-64 lg:max-h-[80vh] border-l-4 border-purple-500 z-40`}
      >
        <h2 className="text-lg font-bold mb-6 text-purple-700">On This Page</h2>
        {headings.map((section, index) => (
          <div key={index} className="mb-6">
            <h3
              className={`font-semibold mb-2 text-md transition-colors duration-200 ${
                activeId === section.h1.id
                  ? "text-purple-600"
                  : "text-gray-800 dark:text-gray-300"
              }`}
            >
              <a
                href={`#${section.h1.id}`}
                className="hover:underline block py-1"
              >
                {section.h1.text}
              </a>
            </h3>

            {section.h2.length > 0 && (
              <ul className="pl-4 text-sm space-y-2">
                {section.h2.map((heading, subIndex) => (
                  <li
                    key={subIndex}
                    className={`hover:underline transition-colors duration-200 ${
                      activeId === heading.id
                        ? "font-bold text-purple-600"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                    ref={activeId === heading.id ? activeElementRef : null}
                  >
                    <a href={`#${heading.id}`} className="block py-1">
                      {heading.text}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={`#comments`}
                    className="block py-1 text-gray-500 hover:text-purple-600"
                  >
                    {/* This should be the ID of your comments section */}
                    {/* Replace with the actual ID of your comments section */}
                    View Blog BlogComments
                  </a>
                </li>
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Overlay for small screens */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </>
  );
};

export default OnThisPage;
