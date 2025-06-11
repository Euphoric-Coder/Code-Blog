"use client";

import React from "react";
import { ArrowRight, Play, Code, Zap } from "lucide-react";
import dynamic from "next/dynamic";

const Typewriter = dynamic(() => import("typewriter-effect"), { ssr: false });

export const Hero = () => {

  return (
    <div className="relative min-h-screen flex items-center overflow-hidden">
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
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-medium rounded-full hover:shadow-lg hover:shadow-blue-500/25 transform hover:-translate-y-0.5 transition-all duration-200">
                <span className="font-extrabold">Explore Blogs</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="group inline-flex items-center justify-center px-8 py-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200">
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

          {/* Right Content - Vector Illustration */}
          <div className="relative lg:h-96 flex items-center justify-center">
            {/* Main Container */}
            <div className="relative w-full max-w-lg">
              {/* Background Elements */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-3xl blur-3xl"></div>

              {/* Light Theme Vector */}
              <div className="relative dark:hidden">
                <svg viewBox="0 0 400 300" className="w-full h-auto">
                  {/* Background */}
                  <rect
                    width="400"
                    height="300"
                    fill="url(#lightBackgroundGradient)"
                    rx="20"
                  />

                  {/* Desk */}
                  <rect
                    x="50"
                    y="200"
                    width="300"
                    height="15"
                    fill="url(#lightDeskGradient)"
                    rx="7"
                  />
                  <rect
                    x="40"
                    y="215"
                    width="320"
                    height="8"
                    fill="url(#lightDeskShadow)"
                    rx="4"
                  />

                  {/* Desk Legs */}
                  <rect
                    x="60"
                    y="215"
                    width="8"
                    height="60"
                    fill="url(#lightMetalGradient)"
                  />
                  <rect
                    x="332"
                    y="215"
                    width="8"
                    height="60"
                    fill="url(#lightMetalGradient)"
                  />

                  {/* Chair */}
                  <ellipse
                    cx="200"
                    cy="240"
                    rx="25"
                    ry="8"
                    fill="url(#lightChairShadow)"
                  />
                  <rect
                    x="190"
                    y="220"
                    width="20"
                    height="25"
                    fill="url(#lightChairGradient)"
                    rx="10"
                  />
                  <rect
                    x="185"
                    y="200"
                    width="30"
                    height="25"
                    fill="url(#lightChairGradient)"
                    rx="15"
                  />
                  <rect
                    x="195"
                    y="240"
                    width="10"
                    height="30"
                    fill="url(#lightMetalGradient)"
                  />

                  {/* Chair Wheels */}
                  <circle
                    cx="185"
                    cy="270"
                    r="4"
                    fill="url(#lightWheelGradient)"
                  />
                  <circle
                    cx="215"
                    cy="270"
                    r="4"
                    fill="url(#lightWheelGradient)"
                  />
                  <circle
                    cx="200"
                    cy="275"
                    r="4"
                    fill="url(#lightWheelGradient)"
                  />

                  {/* Main Monitor */}
                  <rect
                    x="140"
                    y="120"
                    width="120"
                    height="80"
                    fill="url(#lightMonitorFrame)"
                    rx="8"
                  />
                  <rect
                    x="145"
                    y="125"
                    width="110"
                    height="70"
                    fill="url(#lightScreenGradient)"
                    rx="4"
                  />

                  {/* Code on Main Monitor */}
                  <rect
                    x="150"
                    y="130"
                    width="60"
                    height="3"
                    fill="#F7FAFC"
                    rx="1"
                  />
                  <rect
                    x="150"
                    y="138"
                    width="80"
                    height="3"
                    fill="#68D391"
                    rx="1"
                  />
                  <rect
                    x="155"
                    y="146"
                    width="70"
                    height="3"
                    fill="#F6E05E"
                    rx="1"
                  />
                  <rect
                    x="150"
                    y="154"
                    width="90"
                    height="3"
                    fill="#F7FAFC"
                    rx="1"
                  />
                  <rect
                    x="155"
                    y="162"
                    width="50"
                    height="3"
                    fill="#FC8181"
                    rx="1"
                  />
                  <rect
                    x="150"
                    y="170"
                    width="75"
                    height="3"
                    fill="#B794F6"
                    rx="1"
                  />
                  <rect
                    x="155"
                    y="178"
                    width="85"
                    height="3"
                    fill="#4FD1C7"
                    rx="1"
                  />

                  {/* Monitor Stand */}
                  <rect
                    x="190"
                    y="200"
                    width="20"
                    height="15"
                    fill="url(#lightMetalGradient)"
                    rx="2"
                  />
                  <rect
                    x="180"
                    y="210"
                    width="40"
                    height="5"
                    fill="url(#lightMetalGradient)"
                    rx="2"
                  />

                  {/* Secondary Monitor */}
                  <rect
                    x="280"
                    y="130"
                    width="90"
                    height="60"
                    fill="url(#lightMonitorFrame)"
                    rx="6"
                  />
                  <rect
                    x="285"
                    y="135"
                    width="80"
                    height="50"
                    fill="url(#lightScreenGradient2)"
                    rx="3"
                  />

                  {/* Content on Secondary Monitor */}
                  <rect
                    x="290"
                    y="140"
                    width="40"
                    height="2"
                    fill="#F7FAFC"
                    rx="1"
                  />
                  <rect
                    x="290"
                    y="146"
                    width="60"
                    height="2"
                    fill="#F7FAFC"
                    rx="1"
                  />
                  <rect
                    x="295"
                    y="152"
                    width="50"
                    height="2"
                    fill="#68D391"
                    rx="1"
                  />
                  <rect
                    x="290"
                    y="158"
                    width="65"
                    height="2"
                    fill="#F7FAFC"
                    rx="1"
                  />
                  <rect
                    x="295"
                    y="164"
                    width="45"
                    height="2"
                    fill="#F6E05E"
                    rx="1"
                  />
                  <rect
                    x="290"
                    y="170"
                    width="55"
                    height="2"
                    fill="#F7FAFC"
                    rx="1"
                  />

                  {/* Secondary Monitor Stand */}
                  <rect
                    x="320"
                    y="190"
                    width="15"
                    height="10"
                    fill="url(#lightMetalGradient)"
                    rx="1"
                  />
                  <rect
                    x="315"
                    y="198"
                    width="25"
                    height="3"
                    fill="url(#lightMetalGradient)"
                    rx="1"
                  />

                  {/* Developer Character */}
                  {/* Head */}
                  <circle
                    cx="180"
                    cy="160"
                    r="20"
                    fill="url(#lightSkinGradient)"
                  />

                  {/* Hair */}
                  <path
                    d="M160 150 Q180 130 200 150 Q195 140 185 140 Q175 135 165 140 Q160 145 160 150"
                    fill="url(#lightHairGradient)"
                  />

                  {/* Eyes */}
                  <circle cx="175" cy="158" r="2" fill="#2D3748" />
                  <circle cx="185" cy="158" r="2" fill="#2D3748" />

                  {/* Glasses */}
                  <circle
                    cx="175"
                    cy="158"
                    r="8"
                    fill="none"
                    stroke="#2D3748"
                    strokeWidth="2"
                  />
                  <circle
                    cx="185"
                    cy="158"
                    r="8"
                    fill="none"
                    stroke="#2D3748"
                    strokeWidth="2"
                  />
                  <line
                    x1="183"
                    y1="158"
                    x2="177"
                    y2="158"
                    stroke="#2D3748"
                    strokeWidth="2"
                  />

                  {/* Body */}
                  <rect
                    x="160"
                    y="180"
                    width="40"
                    height="50"
                    fill="url(#lightShirtGradient)"
                    rx="20"
                  />

                  {/* Arms */}
                  <rect
                    x="140"
                    y="185"
                    width="25"
                    height="15"
                    fill="url(#lightSkinGradient)"
                    rx="7"
                  />
                  <rect
                    x="195"
                    y="185"
                    width="25"
                    height="15"
                    fill="url(#lightSkinGradient)"
                    rx="7"
                  />

                  {/* Hands on Keyboard */}
                  <circle
                    cx="150"
                    cy="195"
                    r="5"
                    fill="url(#lightSkinGradient)"
                  />
                  <circle
                    cx="210"
                    cy="195"
                    r="5"
                    fill="url(#lightSkinGradient)"
                  />

                  {/* Keyboard */}
                  <rect
                    x="120"
                    y="190"
                    width="100"
                    height="15"
                    fill="url(#lightKeyboardFrame)"
                    rx="3"
                  />
                  <rect
                    x="125"
                    y="193"
                    width="90"
                    height="9"
                    fill="url(#lightKeyboardSurface)"
                    rx="2"
                  />

                  {/* Keyboard Keys */}
                  <rect
                    x="130"
                    y="195"
                    width="6"
                    height="5"
                    fill="#F7FAFC"
                    rx="1"
                  />
                  <rect
                    x="140"
                    y="195"
                    width="6"
                    height="5"
                    fill="#F7FAFC"
                    rx="1"
                  />
                  <rect
                    x="150"
                    y="195"
                    width="6"
                    height="5"
                    fill="#F7FAFC"
                    rx="1"
                  />
                  <rect
                    x="160"
                    y="195"
                    width="6"
                    height="5"
                    fill="#F7FAFC"
                    rx="1"
                  />
                  <rect
                    x="170"
                    y="195"
                    width="6"
                    height="5"
                    fill="#F7FAFC"
                    rx="1"
                  />
                  <rect
                    x="180"
                    y="195"
                    width="6"
                    height="5"
                    fill="#F7FAFC"
                    rx="1"
                  />
                  <rect
                    x="190"
                    y="195"
                    width="6"
                    height="5"
                    fill="#F7FAFC"
                    rx="1"
                  />
                  <rect
                    x="200"
                    y="195"
                    width="6"
                    height="5"
                    fill="#F7FAFC"
                    rx="1"
                  />

                  {/* Mouse */}
                  <ellipse
                    cx="240"
                    cy="195"
                    rx="8"
                    ry="12"
                    fill="url(#lightMouseGradient)"
                  />
                  <ellipse
                    cx="240"
                    cy="195"
                    rx="6"
                    ry="10"
                    fill="url(#lightMouseSurface)"
                  />

                  {/* Desk Lamp */}
                  <rect
                    x="320"
                    y="160"
                    width="4"
                    height="40"
                    fill="url(#lightLampArm)"
                  />
                  <rect
                    x="310"
                    y="140"
                    width="24"
                    height="8"
                    fill="url(#lightLampHead)"
                    rx="4"
                  />
                  <rect
                    x="315"
                    y="135"
                    width="14"
                    height="8"
                    fill="url(#lightLampLight)"
                    rx="4"
                  />
                  <circle cx="340" cy="200" r="8" fill="url(#lightLampBase)" />

                  {/* Coffee Cup */}
                  <rect
                    x="80"
                    y="180"
                    width="15"
                    height="20"
                    fill="url(#lightCupGradient)"
                    rx="2"
                  />
                  <rect
                    x="82"
                    y="182"
                    width="11"
                    height="16"
                    fill="url(#lightCoffeeGradient)"
                    rx="1"
                  />
                  <path
                    d="M95 185 Q100 185 100 190 Q100 195 95 195"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                  />

                  {/* Steam from Coffee */}
                  <path
                    d="M85 175 Q87 170 85 165"
                    fill="none"
                    stroke="#F7FAFC"
                    strokeWidth="1"
                    opacity="0.7"
                  >
                    <animate
                      attributeName="opacity"
                      values="0.7;0.3;0.7"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </path>
                  <path
                    d="M90 175 Q92 170 90 165"
                    fill="none"
                    stroke="#F7FAFC"
                    strokeWidth="1"
                    opacity="0.7"
                  >
                    <animate
                      attributeName="opacity"
                      values="0.3;0.7;0.3"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </path>

                  {/* Floating Code Elements */}
                  <text
                    x="60"
                    y="80"
                    fill="#4299E1"
                    fontSize="12"
                    fontFamily="monospace"
                    opacity="0.6"
                  >
                    &lt;/&gt;
                    <animate
                      attributeName="opacity"
                      values="0.6;0.3;0.6"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </text>
                  <text
                    x="320"
                    y="90"
                    fill="#9F7AEA"
                    fontSize="10"
                    fontFamily="monospace"
                    opacity="0.6"
                  >
                    {}
                    <animate
                      attributeName="opacity"
                      values="0.3;0.6;0.3"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </text>
                  <text
                    x="100"
                    y="100"
                    fill="#68D391"
                    fontSize="8"
                    fontFamily="monospace"
                    opacity="0.6"
                  >
                    function()
                    <animate
                      attributeName="opacity"
                      values="0.6;0.4;0.6"
                      dur="4s"
                      repeatCount="indefinite"
                    />
                  </text>
                  <text
                    x="300"
                    y="110"
                    fill="#F6E05E"
                    fontSize="9"
                    fontFamily="monospace"
                    opacity="0.6"
                  >
                    const
                    <animate
                      attributeName="opacity"
                      values="0.4;0.6;0.4"
                      dur="4s"
                      repeatCount="indefinite"
                    />
                  </text>

                  {/* Light Theme Gradient Definitions */}
                  <defs>
                    <linearGradient
                      id="lightBackgroundGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#EBF8FF" />
                      <stop offset="50%" stopColor="#FFFFFF" />
                      <stop offset="100%" stopColor="#E6FFFA" />
                    </linearGradient>

                    <linearGradient
                      id="lightDeskGradient"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#4A5568" />
                      <stop offset="100%" stopColor="#2D3748" />
                    </linearGradient>

                    <linearGradient
                      id="lightDeskShadow"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#1A202C" />
                      <stop offset="100%" stopColor="#0F1419" />
                    </linearGradient>

                    <linearGradient
                      id="lightMetalGradient"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#718096" />
                      <stop offset="100%" stopColor="#4A5568" />
                    </linearGradient>

                    <linearGradient
                      id="lightChairGradient"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#FC8181" />
                      <stop offset="100%" stopColor="#E53E3E" />
                    </linearGradient>

                    <linearGradient
                      id="lightChairShadow"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#C53030" opacity="0.3" />
                      <stop offset="100%" stopColor="#9C1C1C" opacity="0.5" />
                    </linearGradient>

                    <linearGradient
                      id="lightWheelGradient"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#718096" />
                      <stop offset="100%" stopColor="#4A5568" />
                    </linearGradient>

                    <linearGradient
                      id="lightMonitorFrame"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#4A5568" />
                      <stop offset="100%" stopColor="#2D3748" />
                    </linearGradient>

                    <linearGradient
                      id="lightScreenGradient"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#4299E1" />
                      <stop offset="100%" stopColor="#3182CE" />
                    </linearGradient>

                    <linearGradient
                      id="lightScreenGradient2"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#9F7AEA" />
                      <stop offset="100%" stopColor="#805AD5" />
                    </linearGradient>

                    <linearGradient
                      id="lightSkinGradient"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#FED7CC" />
                      <stop offset="100%" stopColor="#FDBCB4" />
                    </linearGradient>

                    <linearGradient
                      id="lightHairGradient"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#63B3ED" />
                      <stop offset="100%" stopColor="#4299E1" />
                    </linearGradient>

                    <linearGradient
                      id="lightShirtGradient"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#63B3ED" />
                      <stop offset="100%" stopColor="#4299E1" />
                    </linearGradient>

                    <linearGradient
                      id="lightKeyboardFrame"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#718096" />
                      <stop offset="100%" stopColor="#4A5568" />
                    </linearGradient>

                    <linearGradient
                      id="lightKeyboardSurface"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#4A5568" />
                      <stop offset="100%" stopColor="#2D3748" />
                    </linearGradient>

                    <linearGradient
                      id="lightMouseGradient"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#718096" />
                      <stop offset="100%" stopColor="#4A5568" />
                    </linearGradient>

                    <linearGradient
                      id="lightMouseSurface"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#4A5568" />
                      <stop offset="100%" stopColor="#2D3748" />
                    </linearGradient>

                    <linearGradient
                      id="lightCupGradient"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="100%" stopColor="#F7FAFC" />
                    </linearGradient>

                    <linearGradient
                      id="lightCoffeeGradient"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#D69E2E" />
                      <stop offset="100%" stopColor="#8B4513" />
                    </linearGradient>

                    <linearGradient
                      id="lightLampArm"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#718096" />
                      <stop offset="100%" stopColor="#4A5568" />
                    </linearGradient>

                    <linearGradient
                      id="lightLampHead"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#718096" />
                      <stop offset="100%" stopColor="#4A5568" />
                    </linearGradient>

                    <linearGradient
                      id="lightLampLight"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#F6E05E" />
                      <stop offset="100%" stopColor="#D69E2E" />
                    </linearGradient>

                    <linearGradient
                      id="lightLampBase"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#4A5568" />
                      <stop offset="100%" stopColor="#2D3748" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Dark Theme Vector */}
              <div className="relative hidden dark:block">
                <svg viewBox="0 0 400 300" className="w-full h-auto">
                  {/* Background */}
                  <rect
                    width="400"
                    height="300"
                    fill="url(#darkBackgroundGradient)"
                    rx="20"
                  />

                  {/* Desk */}
                  <rect
                    x="50"
                    y="200"
                    width="300"
                    height="15"
                    fill="url(#darkDeskGradient)"
                    rx="7"
                  />
                  <rect
                    x="40"
                    y="215"
                    width="320"
                    height="8"
                    fill="url(#darkDeskShadow)"
                    rx="4"
                  />

                  {/* Desk Legs */}
                  <rect
                    x="60"
                    y="215"
                    width="8"
                    height="60"
                    fill="url(#darkMetalGradient)"
                  />
                  <rect
                    x="332"
                    y="215"
                    width="8"
                    height="60"
                    fill="url(#darkMetalGradient)"
                  />

                  {/* Chair */}
                  <ellipse
                    cx="200"
                    cy="240"
                    rx="25"
                    ry="8"
                    fill="url(#darkChairShadow)"
                  />
                  <rect
                    x="190"
                    y="220"
                    width="20"
                    height="25"
                    fill="url(#darkChairGradient)"
                    rx="10"
                  />
                  <rect
                    x="185"
                    y="200"
                    width="30"
                    height="25"
                    fill="url(#darkChairGradient)"
                    rx="15"
                  />
                  <rect
                    x="195"
                    y="240"
                    width="10"
                    height="30"
                    fill="url(#darkMetalGradient)"
                  />

                  {/* Chair Wheels */}
                  <circle
                    cx="185"
                    cy="270"
                    r="4"
                    fill="url(#darkWheelGradient)"
                  />
                  <circle
                    cx="215"
                    cy="270"
                    r="4"
                    fill="url(#darkWheelGradient)"
                  />
                  <circle
                    cx="200"
                    cy="275"
                    r="4"
                    fill="url(#darkWheelGradient)"
                  />

                  {/* Main Monitor */}
                  <rect
                    x="140"
                    y="120"
                    width="120"
                    height="80"
                    fill="url(#darkMonitorFrame)"
                    rx="8"
                  />
                  <rect
                    x="145"
                    y="125"
                    width="110"
                    height="70"
                    fill="url(#darkScreenGradient)"
                    rx="4"
                  />

                  {/* Code on Main Monitor */}
                  <rect
                    x="150"
                    y="130"
                    width="60"
                    height="3"
                    fill="#A0AEC0"
                    rx="1"
                  />
                  <rect
                    x="150"
                    y="138"
                    width="80"
                    height="3"
                    fill="#68D391"
                    rx="1"
                  />
                  <rect
                    x="155"
                    y="146"
                    width="70"
                    height="3"
                    fill="#F6E05E"
                    rx="1"
                  />
                  <rect
                    x="150"
                    y="154"
                    width="90"
                    height="3"
                    fill="#A0AEC0"
                    rx="1"
                  />
                  <rect
                    x="155"
                    y="162"
                    width="50"
                    height="3"
                    fill="#FC8181"
                    rx="1"
                  />
                  <rect
                    x="150"
                    y="170"
                    width="75"
                    height="3"
                    fill="#B794F6"
                    rx="1"
                  />
                  <rect
                    x="155"
                    y="178"
                    width="85"
                    height="3"
                    fill="#4FD1C7"
                    rx="1"
                  />

                  {/* Monitor Stand */}
                  <rect
                    x="190"
                    y="200"
                    width="20"
                    height="15"
                    fill="url(#darkMetalGradient)"
                    rx="2"
                  />
                  <rect
                    x="180"
                    y="210"
                    width="40"
                    height="5"
                    fill="url(#darkMetalGradient)"
                    rx="2"
                  />

                  {/* Secondary Monitor */}
                  <rect
                    x="280"
                    y="130"
                    width="90"
                    height="60"
                    fill="url(#darkMonitorFrame)"
                    rx="6"
                  />
                  <rect
                    x="285"
                    y="135"
                    width="80"
                    height="50"
                    fill="url(#darkScreenGradient2)"
                    rx="3"
                  />

                  {/* Content on Secondary Monitor */}
                  <rect
                    x="290"
                    y="140"
                    width="40"
                    height="2"
                    fill="#A0AEC0"
                    rx="1"
                  />
                  <rect
                    x="290"
                    y="146"
                    width="60"
                    height="2"
                    fill="#A0AEC0"
                    rx="1"
                  />
                  <rect
                    x="295"
                    y="152"
                    width="50"
                    height="2"
                    fill="#68D391"
                    rx="1"
                  />
                  <rect
                    x="290"
                    y="158"
                    width="65"
                    height="2"
                    fill="#A0AEC0"
                    rx="1"
                  />
                  <rect
                    x="295"
                    y="164"
                    width="45"
                    height="2"
                    fill="#F6E05E"
                    rx="1"
                  />
                  <rect
                    x="290"
                    y="170"
                    width="55"
                    height="2"
                    fill="#A0AEC0"
                    rx="1"
                  />

                  {/* Secondary Monitor Stand */}
                  <rect
                    x="320"
                    y="190"
                    width="15"
                    height="10"
                    fill="url(#darkMetalGradient)"
                    rx="1"
                  />
                  <rect
                    x="315"
                    y="198"
                    width="25"
                    height="3"
                    fill="url(#darkMetalGradient)"
                    rx="1"
                  />

                  {/* Developer Character */}
                  {/* Head */}
                  <circle
                    cx="180"
                    cy="160"
                    r="20"
                    fill="url(#darkSkinGradient)"
                  />

                  {/* Hair */}
                  <path
                    d="M160 150 Q180 130 200 150 Q195 140 185 140 Q175 135 165 140 Q160 145 160 150"
                    fill="url(#darkHairGradient)"
                  />

                  {/* Eyes */}
                  <circle cx="175" cy="158" r="2" fill="#4A5568" />
                  <circle cx="185" cy="158" r="2" fill="#4A5568" />

                  {/* Glasses */}
                  <circle
                    cx="175"
                    cy="158"
                    r="8"
                    fill="none"
                    stroke="#718096"
                    strokeWidth="2"
                  />
                  <circle
                    cx="185"
                    cy="158"
                    r="8"
                    fill="none"
                    stroke="#718096"
                    strokeWidth="2"
                  />
                  <line
                    x1="183"
                    y1="158"
                    x2="177"
                    y2="158"
                    stroke="#718096"
                    strokeWidth="2"
                  />

                  {/* Body */}
                  <rect
                    x="160"
                    y="180"
                    width="40"
                    height="50"
                    fill="url(#darkShirtGradient)"
                    rx="20"
                  />

                  {/* Arms */}
                  <rect
                    x="140"
                    y="185"
                    width="25"
                    height="15"
                    fill="url(#darkSkinGradient)"
                    rx="7"
                  />
                  <rect
                    x="195"
                    y="185"
                    width="25"
                    height="15"
                    fill="url(#darkSkinGradient)"
                    rx="7"
                  />

                  {/* Hands on Keyboard */}
                  <circle
                    cx="150"
                    cy="195"
                    r="5"
                    fill="url(#darkSkinGradient)"
                  />
                  <circle
                    cx="210"
                    cy="195"
                    r="5"
                    fill="url(#darkSkinGradient)"
                  />

                  {/* Keyboard */}
                  <rect
                    x="120"
                    y="190"
                    width="100"
                    height="15"
                    fill="url(#darkKeyboardFrame)"
                    rx="3"
                  />
                  <rect
                    x="125"
                    y="193"
                    width="90"
                    height="9"
                    fill="url(#darkKeyboardSurface)"
                    rx="2"
                  />

                  {/* Keyboard Keys */}
                  <rect
                    x="130"
                    y="195"
                    width="6"
                    height="5"
                    fill="#4A5568"
                    rx="1"
                  />
                  <rect
                    x="140"
                    y="195"
                    width="6"
                    height="5"
                    fill="#4A5568"
                    rx="1"
                  />
                  <rect
                    x="150"
                    y="195"
                    width="6"
                    height="5"
                    fill="#4A5568"
                    rx="1"
                  />
                  <rect
                    x="160"
                    y="195"
                    width="6"
                    height="5"
                    fill="#4A5568"
                    rx="1"
                  />
                  <rect
                    x="170"
                    y="195"
                    width="6"
                    height="5"
                    fill="#4A5568"
                    rx="1"
                  />
                  <rect
                    x="180"
                    y="195"
                    width="6"
                    height="5"
                    fill="#4A5568"
                    rx="1"
                  />
                  <rect
                    x="190"
                    y="195"
                    width="6"
                    height="5"
                    fill="#4A5568"
                    rx="1"
                  />
                  <rect
                    x="200"
                    y="195"
                    width="6"
                    height="5"
                    fill="#4A5568"
                    rx="1"
                  />

                  {/* Mouse */}
                  <ellipse
                    cx="240"
                    cy="195"
                    rx="8"
                    ry="12"
                    fill="url(#darkMouseGradient)"
                  />
                  <ellipse
                    cx="240"
                    cy="195"
                    rx="6"
                    ry="10"
                    fill="url(#darkMouseSurface)"
                  />

                  {/* Desk Lamp */}
                  <rect
                    x="320"
                    y="160"
                    width="4"
                    height="40"
                    fill="url(#darkLampArm)"
                  />
                  <rect
                    x="310"
                    y="140"
                    width="24"
                    height="8"
                    fill="url(#darkLampHead)"
                    rx="4"
                  />
                  <rect
                    x="315"
                    y="135"
                    width="14"
                    height="8"
                    fill="url(#darkLampLight)"
                    rx="4"
                  />
                  <circle cx="340" cy="200" r="8" fill="url(#darkLampBase)" />

                  {/* Coffee Cup */}
                  <rect
                    x="80"
                    y="180"
                    width="15"
                    height="20"
                    fill="url(#darkCupGradient)"
                    rx="2"
                  />
                  <rect
                    x="82"
                    y="182"
                    width="11"
                    height="16"
                    fill="url(#darkCoffeeGradient)"
                    rx="1"
                  />
                  <path
                    d="M95 185 Q100 185 100 190 Q100 195 95 195"
                    fill="none"
                    stroke="#E2E8F0"
                    strokeWidth="2"
                  />

                  {/* Steam from Coffee */}
                  <path
                    d="M85 175 Q87 170 85 165"
                    fill="none"
                    stroke="#A0AEC0"
                    strokeWidth="1"
                    opacity="0.7"
                  >
                    <animate
                      attributeName="opacity"
                      values="0.7;0.3;0.7"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </path>
                  <path
                    d="M90 175 Q92 170 90 165"
                    fill="none"
                    stroke="#A0AEC0"
                    strokeWidth="1"
                    opacity="0.7"
                  >
                    <animate
                      attributeName="opacity"
                      values="0.3;0.7;0.3"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </path>

                  {/* Floating Code Elements */}
                  <text
                    x="60"
                    y="80"
                    fill="#4299E1"
                    fontSize="12"
                    fontFamily="monospace"
                    opacity="0.6"
                  >
                    &lt;/&gt;
                    <animate
                      attributeName="opacity"
                      values="0.6;0.3;0.6"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </text>
                  <text
                    x="320"
                    y="90"
                    fill="#9F7AEA"
                    fontSize="10"
                    fontFamily="monospace"
                    opacity="0.6"
                  >
                    {}
                    <animate
                      attributeName="opacity"
                      values="0.3;0.6;0.3"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </text>
                  <text
                    x="100"
                    y="100"
                    fill="#68D391"
                    fontSize="8"
                    fontFamily="monospace"
                    opacity="0.6"
                  >
                    function()
                    <animate
                      attributeName="opacity"
                      values="0.6;0.4;0.6"
                      dur="4s"
                      repeatCount="indefinite"
                    />
                  </text>
                  <text
                    x="300"
                    y="110"
                    fill="#F6E05E"
                    fontSize="9"
                    fontFamily="monospace"
                    opacity="0.6"
                  >
                    const
                    <animate
                      attributeName="opacity"
                      values="0.4;0.6;0.4"
                      dur="4s"
                      repeatCount="indefinite"
                    />
                  </text>

                  {/* Dark Theme Gradient Definitions */}
                  <defs>
                    <linearGradient
                      id="darkBackgroundGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#1A202C" />
                      <stop offset="50%" stopColor="#2D3748" />
                      <stop offset="100%" stopColor="#1A202C" />
                    </linearGradient>

                    <linearGradient
                      id="darkDeskGradient"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#718096" />
                      <stop offset="100%" stopColor="#4A5568" />
                    </linearGradient>

                    <linearGradient
                      id="darkDeskShadow"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#2D3748" />
                      <stop offset="100%" stopColor="#1A202C" />
                    </linearGradient>

                    <linearGradient
                      id="darkMetalGradient"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#A0AEC0" />
                      <stop offset="100%" stopColor="#718096" />
                    </linearGradient>

                    <linearGradient
                      id="darkChairGradient"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#FC8181" />
                      <stop offset="100%" stopColor="#E53E3E" />
                    </linearGradient>

                    <linearGradient
                      id="darkChairShadow"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#C53030" opacity="0.3" />
                      <stop offset="100%" stopColor="#9C1C1C" opacity="0.5" />
                    </linearGradient>

                    <linearGradient
                      id="darkWheelGradient"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#A0AEC0" />
                      <stop offset="100%" stopColor="#718096" />
                    </linearGradient>

                    <linearGradient
                      id="darkMonitorFrame"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#718096" />
                      <stop offset="100%" stopColor="#4A5568" />
                    </linearGradient>

                    <linearGradient
                      id="darkScreenGradient"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#2B6CB0" />
                      <stop offset="100%" stopColor="#2C5282" />
                    </linearGradient>

                    <linearGradient
                      id="darkScreenGradient2"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#7C3AED" />
                      <stop offset="100%" stopColor="#6B46C1" />
                    </linearGradient>

                    <linearGradient
                      id="darkSkinGradient"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#FED7CC" />
                      <stop offset="100%" stopColor="#FDBCB4" />
                    </linearGradient>

                    <linearGradient
                      id="darkHairGradient"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#63B3ED" />
                      <stop offset="100%" stopColor="#4299E1" />
                    </linearGradient>

                    <linearGradient
                      id="darkShirtGradient"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#63B3ED" />
                      <stop offset="100%" stopColor="#4299E1" />
                    </linearGradient>

                    <linearGradient
                      id="darkKeyboardFrame"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#A0AEC0" />
                      <stop offset="100%" stopColor="#718096" />
                    </linearGradient>

                    <linearGradient
                      id="darkKeyboardSurface"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#718096" />
                      <stop offset="100%" stopColor="#4A5568" />
                    </linearGradient>

                    <linearGradient
                      id="darkMouseGradient"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#A0AEC0" />
                      <stop offset="100%" stopColor="#718096" />
                    </linearGradient>

                    <linearGradient
                      id="darkMouseSurface"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#718096" />
                      <stop offset="100%" stopColor="#4A5568" />
                    </linearGradient>

                    <linearGradient
                      id="darkCupGradient"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#E2E8F0" />
                      <stop offset="100%" stopColor="#CBD5E0" />
                    </linearGradient>

                    <linearGradient
                      id="darkCoffeeGradient"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#D69E2E" />
                      <stop offset="100%" stopColor="#8B4513" />
                    </linearGradient>

                    <linearGradient
                      id="darkLampArm"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#A0AEC0" />
                      <stop offset="100%" stopColor="#718096" />
                    </linearGradient>

                    <linearGradient
                      id="darkLampHead"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#A0AEC0" />
                      <stop offset="100%" stopColor="#718096" />
                    </linearGradient>

                    <linearGradient
                      id="darkLampLight"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#F6E05E" />
                      <stop offset="100%" stopColor="#D69E2E" />
                    </linearGradient>

                    <linearGradient
                      id="darkLampBase"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#718096" />
                      <stop offset="100%" stopColor="#4A5568" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-bounce shadow-lg"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-pink-400 to-red-500 rounded-full animate-bounce delay-1000 shadow-lg"></div>
              <div className="absolute top-1/2 -right-6 w-4 h-4 bg-gradient-to-r from-green-400 to-teal-500 rounded-full animate-pulse shadow-lg"></div>
              <div className="absolute top-1/4 -left-6 w-5 h-5 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full animate-pulse delay-500 shadow-lg"></div>

              {/* Code Particles */}
              <div className="absolute top-8 right-8 text-blue-400 opacity-60 animate-pulse">
                <Code className="h-4 w-4" />
              </div>
              <div className="absolute bottom-8 left-8 text-teal-400 opacity-60 animate-pulse delay-700">
                <Code className="h-4 w-4" />
              </div>
              <div className="absolute top-16 left-16 text-purple-400 opacity-60 animate-pulse delay-1000">
                <Code className="h-3 w-3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
