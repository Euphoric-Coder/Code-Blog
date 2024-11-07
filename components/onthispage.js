"use client";
import React, { useEffect, useState, useRef } from "react";

const OnThisPage = ({ htmlContent }) => {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState("");
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
    <div className="on-this-page fixed top-24 left-4 w-64 p-6 bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-y-auto max-h-[80vh] border-l-4 border-purple-500">
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
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default OnThisPage;
