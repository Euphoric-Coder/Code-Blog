"use client";
import React, { useEffect, useState } from "react";

const OnThisPage = ({ htmlContent }) => {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState("");
  const [lastScrollY, setLastScrollY] = useState(0); // Track scroll direction

  useEffect(() => {
    // Parse the HTML content and extract h1 and h2 headings
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlContent;

    const h1Elements = tempDiv.querySelectorAll("h1");
    const h2Elements = tempDiv.querySelectorAll("h2");

    // Create structured data for the sidebar
    const structuredHeadings = [];
    let currentH1 = null;

    h1Elements.forEach((h1) => {
      const h1Id = h1.id;
      currentH1 = {
        h1: {
          text: h1.textContent,
          id: h1Id,
        },
        h2: [],
      };

      // Collect all h2 that follow this h1, until we encounter another h1
      for (let j = 0; j < h2Elements.length; j++) {
        const h2 = h2Elements[j];
        if (h2.compareDocumentPosition(h1) & Node.DOCUMENT_POSITION_PRECEDING) {
          currentH1.h2.push({
            text: h2.textContent,
            id: h2.id,
          });
        }
      }

      structuredHeadings.push(currentH1);
    });

    setHeadings(structuredHeadings);
  }, [htmlContent]);

  useEffect(() => {
    const handleIntersection = (entries) => {
      const visibleEntries = entries.filter((entry) => entry.isIntersecting);

      // Determine scroll direction
      const scrollDirection = window.scrollY > lastScrollY ? "down" : "up";
      setLastScrollY(window.scrollY);

      if (visibleEntries.length > 0) {
        // Sort based on scroll direction
        visibleEntries.sort((a, b) => {
          if (scrollDirection === "down") {
            return a.target.offsetTop - b.target.offsetTop;
          } else {
            return b.target.offsetTop - a.target.offsetTop;
          }
        });

        setActiveId(visibleEntries[0].target.id);
      } else if (window.scrollY === 0 && headings.length > 0) {
        // Fallback for small content or no scroll: Highlight the first element by default
        setActiveId(headings[0].h1.id);
      }
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "-10px", // Adjust margin to trigger earlier
      threshold: 0.1, // Lower threshold for small content
    });

    // Observe both h1 and h2 elements
    headings.forEach((section) => {
      const h1Element = document.getElementById(section.h1.id);
      if (h1Element) observer.observe(h1Element);

      section.h2.forEach((heading) => {
        const h2Element = document.getElementById(heading.id);
        if (h2Element) observer.observe(h2Element);
      });
    });

    // Cleanup observer on unmount
    return () => {
      observer.disconnect();
    };
  }, [headings, lastScrollY]);

  return (
    <div className="on-this-page fixed top-24 left-4 w-64 p-6 bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-y-auto max-h-screen border-l-4 border-purple-500">
      {/* Sidebar Heading */}
      <h2 className="text-lg font-bold mb-6 text-purple-700">On This Page</h2>
      {headings.map((section, index) => (
        <div key={index} className="mb-6">
          {/* Block for each h1 element */}
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

          {/* Nested h2 elements under the respective h1 */}
          <ul className="pl-4 text-sm space-y-2">
            {section.h2.map((heading, index) => (
              <li
                key={index}
                className={`hover:underline transition-colors duration-200 ${
                  activeId === heading.id
                    ? "font-bold text-purple-600"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                <a href={`#${heading.id}`} className="block py-1">
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default OnThisPage;
