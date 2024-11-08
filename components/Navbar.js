"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ModeToggle } from "./theme-btn";
import LoadingBar from "react-top-loading-bar";
import { usePathname } from "next/navigation";
import Image from "next/image";
const Navbar = () => {
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();

  // Loading bar progress
  useEffect(() => {
    setProgress(20);
    setTimeout(() => setProgress(40), 100);
    setTimeout(() => setProgress(100), 400);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setProgress(0), 50);
  }, []);

  // Mirror effect for navbar
  const navbarGradient =
    "bg-gradient-to-b from-white/30 via-white/10 to-transparent dark:from-gray-800/30 dark:via-gray-800/10 dark:to-transparent backdrop-blur-lg";

  return (
    <nav
      className={`p-4 sticky top-0 z-10 ${navbarGradient} border-b border-purple-500 transition-all duration-300`}
    >
      <LoadingBar
        color="#933ce6"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and Home Link */}
        <Link href="/">
          <div className="text-3xl font-bold flex gap-4 items-center hover:scale-105 transition-transform duration-500">
            <Image
              src="/codeblog.png"
              alt="Logo"
              width={48}
              height={48}
              className="hover:opacity-80 transition-opacity duration-300"
            />
            <p className="hover:animate-pulse text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-teal-500 to-green-500 dark:from-purple-500 dark:via-pink-500 dark:to-yellow-500">
              Code Blog (Stil in Production)
            </p>
          </div>
        </Link>

        {/* Navigation Links (for larger screens) */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link
            href="/"
            className="hover:scale-110 font-bold transition-transform duration-300 text-lg text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 dark:from-purple-400 dark:via-pink-500 dark:to-yellow-400 hover:bg-gradient-to-r hover:from-blue-700 hover:to-teal-700 dark:hover:from-pink-600 dark:hover:to-yellow-600"
          >
            Home
          </Link>
          <Link
            href="/blog"
            className="hover:scale-110 font-bold transition-transform duration-300 text-lg text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 dark:from-purple-400 dark:via-pink-500 dark:to-yellow-400 hover:bg-gradient-to-r hover:from-blue-700 hover:to-teal-700 dark:hover:from-pink-600 dark:hover:to-yellow-600"
          >
            Blog
          </Link>
          <Link
            href="/tutorial"
            className="hover:scale-110 font-bold transition-transform duration-300 text-lg text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 dark:from-purple-400 dark:via-pink-500 dark:to-yellow-400 hover:bg-gradient-to-r hover:from-blue-700 hover:to-teal-700 dark:hover:from-pink-600 dark:hover:to-yellow-600"
          >
            Tutorial
          </Link>
          <Link
            href="/about"
            className="hover:scale-110 font-bold transition-transform duration-300 text-lg text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 dark:from-purple-400 dark:via-pink-500 dark:to-yellow-400 hover:bg-gradient-to-r hover:from-blue-700 hover:to-teal-700 dark:hover:from-pink-600 dark:hover:to-yellow-600"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="hover:scale-110 font-bold transition-transform duration-300 text-lg text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 dark:from-purple-400 dark:via-pink-500 dark:to-yellow-400 hover:bg-gradient-to-r hover:from-blue-700 hover:to-teal-700 dark:hover:from-pink-600 dark:hover:to-yellow-600"
          >
            Contact
          </Link>
          <div className="flex items-center">
            <ModeToggle />
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center">
          <ModeToggle />
          <button className="ml-4">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
