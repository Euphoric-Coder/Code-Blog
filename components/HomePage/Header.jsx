"use client";

import React, { useState, useEffect } from "react";
import { Code, Menu, X, Sun, Moon, Search } from "lucide-react";
import {
  SignInButton,
  SignOutButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { ModeToggle } from "@/components/theme-btn";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export const Header = ({ darkMode, setDarkMode }) => {
  const { isSignedIn } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    {
      name: "Home",
      href: "/",
      active: "",
    },
    { name: "Blog", href: "/blog", active: "" },
    {
      name: "Tutorial",
      href: "/tutorial",
      active: "",
    },
    {
      name: "Snippets",
      href: "/snippets",
      active: "",
    },
    {
      name: "Playground",
      href: "/playground",
      active: "",
    },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-blue-50/90 dark:bg-gray-900/80 backdrop-blur-lg border-b border-blue-300 dark:border-gray-700/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <Image src={"/codeblog.png"} alt="Logo" height={40} width={40} />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              Dev Block
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`group relative px-3 py-2 text-sm font-medium transition-all duration-200 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400`}
              >
                <span className="nav-underline">{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <ModeToggle />

            {/* Sign In Button */}
            <div className="hidden md:flex items-center gap-3">
              {isSignedIn ? (
                <div
                  className="flex items-center gap-3"
                  suppressHydrationWarning
                >
                  <UserButton />
                  <Button asChild>
                    <SignOutButton />
                  </Button>
                </div>
              ) : (
                <Button asChild>
                  <SignInButton />
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200/20 dark:border-gray-700/20 bg-white dark:bg-gray-900 shadow-md transition-colors duration-300">
            <div className="py-4 space-y-2 px-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`block w-full px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    item.active
                      ? "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              {isSignedIn ? (
                <div className="pt-4 flex items-center justify-between">
                  {/* <UserButton /> */}
                  <Button
                    asChild
                    className="w-full mt-4 bg-gradient-to-r from-blue-600 to-teal-500 dark:from-blue-500 dark:to-teal-400 text-white dark:text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-teal-600 dark:hover:from-blue-600 dark:hover:to-teal-500 transition-all"
                  >
                    <SignOutButton />
                  </Button>
                </div>
              ) : (
                <Button
                  asChild
                  className="w-full mt-4 bg-gradient-to-r from-blue-600 to-teal-500 dark:from-blue-500 dark:to-teal-400 text-white dark:text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-teal-600 dark:hover:from-blue-600 dark:hover:to-teal-500 transition-all"
                >
                  <SignInButton />
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
