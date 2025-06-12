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
      href: "#home",
      active: "",
    },
    { name: "Blog", href: "#blog", active: "" },
    {
      name: "Tutorial",
      href: "#tutorial",
      active: "",
    },
    {
      name: "Snippets",
      href: "#snippets",
      active: "",
    },
    {
      name: "Playground",
      href: "#playground",
      active: "",
    },
    {
      name: "About",
      href: "#about",
      active: "",
    },
    {
      name: "Contact",
      href: "#contact",
      active: "",
    },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/20 dark:border-gray-700/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#home" className="flex items-center space-x-2 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-gradient-to-r from-blue-500 to-teal-500 p-2 rounded-lg">
                <Code className="h-6 w-6 text-white" />
              </div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              Dev Block
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`relative px-3 py-2 text-sm font-medium transition-all duration-200 ${
                  item.active
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                }`}
              >
                {item.name}
                {item.active && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full"></div>
                )}
              </a>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <ModeToggle />

            {/* Sign In Button */}
            {isSignedIn ? (
              <div className="flex items-center gap-3" suppressHydrationWarning>
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
          <div className="md:hidden border-t border-gray-200/20 dark:border-gray-700/20">
            <div className="py-4 space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    item.active
                      ? "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/20"
                      : "text-gray-600 hover:text-blue-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800/50"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <button className="w-full mt-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
                Sign In
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
