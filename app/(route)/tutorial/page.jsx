"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { TutorialFetch } from "@/components/Tutorial/TutorialFetch";

const Page = () => {
  const [tutorialData, setTutorialData] = useState([]);

  // Fetch tutorial data from an API or database
  useEffect(() => {
    const fetchTutorials = async () => {
      try {
        const response = await fetch("/api/fetch-tutorial"); // Replace with your API endpoint
        const data = await response.json();
        console.log("Fetched tutorials:", data);
        setTutorialData(data);
      } catch (error) {
        console.error("Error fetching tutorials:", error);
      }
    };
    fetchTutorials();
  }, []);

  return (
    <main className="relative w-full min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100 dark:from-gray-700 dark:via-gray-800 dark:to-blue-950 text-gray-900 dark:text-gray-100 transition-all duration-700">
      {/* Hero Section Heading */}
      <section className="py-20 bg-gradient-to-b from-blue-100 via-blue-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800">
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
          {/* Main Text Section */}
          <div className="lg:w-3/5 text-center lg:text-left mb-12 lg:mb-0">
            <h1 className="text-5xl sm:text-6xl lg:text-6xl xl:text-7xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-500 to-teal-400 dark:from-teal-300 dark:via-blue-400 dark:to-indigo-500 mb-6 drop-shadow-md">
              Master Coding with Expert Tutorials
            </h1>
            <p className="text-lg sm:text-xl lg:text-lg xl:text-xl font-mono leading-relaxed mb-8 text-gray-800 font-extrabold dark:text-gray-300 max-w-2xl lg:max-w-full">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400">
                Discover comprehensive tutorials on{" "}
              </span>
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-300 dark:to-blue-400">
                Programming Languages
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400">
                , from{" "}
              </span>
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-300 dark:to-pink-400">
                beginner concepts
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400">
                {" "}
                to{" "}
              </span>
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600 dark:from-blue-300 dark:to-teal-400">
                advanced practices
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400">
                . Enhance your skills with{" "}
              </span>
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-teal-600 dark:from-indigo-300 dark:to-teal-400">
                real-world coding examples
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400">
                {" "}
                and elevate your programming journey.
              </span>
            </p>
            <div className="mt-10 flex justify-center lg:justify-start gap-4">
              <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-medium rounded-full shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300 ease-out dark:from-teal-400 dark:to-blue-500">
                Start Learning
              </button>
              <button className="px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-full shadow-lg hover:scale-105 hover:bg-gray-300 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-700 transition-transform duration-300 ease-out">
                Browse Tutorials
              </button>
            </div>
          </div>

          {/* Illustration Section */}
          <div className="lg:w-2/5 flex justify-center items-center">
            <Image
              src="/tutorial-page.jpeg"
              alt="Coding Tutorial Illustration"
              width={400}
              height={400}
              className="w-full h-auto max-w-sm drop-shadow-lg rounded-lg transform hover:scale-105 transition-transform duration-500 ease-in-out"
            />
          </div>
        </div>
      </section>

      <section className="pb-10">
        <div className="container mx-auto text-center">
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 dark:from-purple-400 dark:via-pink-500 dark:to-yellow-400 mb-4 p-2">
            Your Gateway to Programming Excellence
          </h1>

          {/* Subheading with tagline */}
          <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500 dark:from-yellow-500 dark:to-purple-400 mb-6">
            Tutorials Tailored for Coders of All Levels
          </p>

          {/* Additional description */}
          <p className="text-md sm:text-lg md:text-xl font-mono font-extrabold text-center text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Whether you&apos;re just starting with coding or honing advanced
            skills, our tutorials cover essential topics. Dive into{" "}
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-300 dark:to-blue-400">
              Data Structures & Algorithms
            </span>
            , build{" "}
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-300 dark:to-pink-400">
              full stack projects
            </span>
            , and master modern{" "}
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600 dark:from-blue-300 dark:to-teal-400">
              software development
            </span>
            . Boost your skills and stay ready for{" "}
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-teal-600 dark:from-indigo-300 dark:to-teal-400">
              real-world coding examples
            </span>
          </p>
        </div>
      </section>

    <TutorialFetch tutorials={tutorialData}/>
    </main>
  );
};

export default Page;
