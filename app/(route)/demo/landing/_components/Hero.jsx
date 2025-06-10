"use client";

import React from "react";
import { useTheme } from "next-themes";
import { ArrowRight, Play, Code, Zap, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const Typewriter = dynamic(() => import("typewriter-effect"), { ssr: false });

export const Hero = () => {
  const { theme } = useTheme();

  const buttonGradient =
    theme === "dark"
      ? "bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 hover:from-purple-700 hover:via-pink-600 hover:to-red-600"
      : "bg-gradient-to-r from-blue-400 via-teal-400 to-green-400 hover:from-blue-500 hover:via-teal-500 hover:to-green-500";

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-teal-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-teal-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-teal-100 dark:from-blue-900/30 dark:to-teal-900/30 px-4 py-2 rounded-full">
              <Zap className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                Stay Ahead in Tech & Innovation
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="block text-gray-900 dark:text-white">
                  Stay Ahead in
                </span>
                <span className="block bg-gradient-to-r from-blue-600 via-teal-500 to-blue-600 bg-clip-text text-transparent animate-gradient">
                  Tech & Innovation
                </span>
              </h1>
              {/* Typewriter Effect */}
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-teal-500 to-green-500 dark:from-purple-500 dark:via-pink-500 dark:to-orange-400">
                <Typewriter
                  options={{
                    strings: [
                      "Full Stack Development",
                      "Machine Learning",
                      "Tech Innovations",
                      "Cloud Computing",
                      "Cybersecurity Trends",
                      "Blockchain Technology",
                      "DevOps Practices",
                    ],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </div>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                Explore the latest{" "}
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  blogs
                </span>{" "}
                and{" "}
                <span className="font-semibold text-teal-600 dark:text-teal-400">
                  tutorials
                </span>{" "}
                in the world of tech. From{" "}
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Full Stack Development
                </span>{" "}
                to the{" "}
                <span className="font-semibold text-purple-600 dark:text-purple-400">
                  future of AI
                </span>
                , our expert insights keep you informed and ready for the next
                big thing.
              </p>
            </div>

            {/* Sub-description */}
            <p className="text-base text-gray-500 dark:text-gray-400 max-w-xl">
              Stay updated on the latest in{" "}
              <span className="font-medium text-blue-600 dark:text-blue-400">
                Cloud Computing
              </span>
              ,{" "}
              <span className="font-medium text-teal-600 dark:text-teal-400">
                Blockchain
              </span>
              , and{" "}
              <span className="font-medium text-purple-600 dark:text-purple-400">
                DevOps Practices
              </span>{" "}
              to elevate your tech journey with us.
            </p>

            {/* CTA Buttons */}
            <div className="flex items-center flex-col sm:flex-row gap-4">
              <button className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-medium rounded-full hover:shadow-lg hover:shadow-blue-500/25 transform hover:-translate-y-0.5 transition-all duration-200">
                <span>Explore Blogs</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="group inline-flex items-center justify-center px-8 py-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200">
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  50+
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Tutorials
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  10K+
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Developers
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  99%
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Satisfaction
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Illustration */}
          <div className="relative lg:h-96">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-teal-500/10 rounded-3xl transform rotate-3"></div>
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl shadow-blue-500/10">
              {/* Developer Illustration Placeholder */}
              <div className="flex items-center justify-center h-64 bg-gradient-to-br from-blue-100 to-teal-100 dark:from-blue-900/30 dark:to-teal-900/30 rounded-xl">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center mx-auto">
                    <Code className="h-8 w-8 text-white" />
                  </div>
                  <div className="space-y-2">
                    <div className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      Developer Workspace
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Interactive Learning Environment
                    </div>
                  </div>
                  {/* Code Lines Animation */}
                  <div className="space-y-2 text-left">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <div className="h-2 w-20 bg-gray-300 dark:bg-gray-600 rounded"></div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-300"></div>
                      <div className="h-2 w-16 bg-gray-300 dark:bg-gray-600 rounded"></div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse delay-700"></div>
                      <div className="h-2 w-24 bg-gray-300 dark:bg-gray-600 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
