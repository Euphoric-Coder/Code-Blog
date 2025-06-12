"use client";

import React from "react";
import Link from "next/link";
import { Code, Github, Twitter, Linkedin, Mail } from "lucide-react";

export const Footer = () => {
  const productLinks = [
    { name: "Blog", href: "/blog" },
    { name: "Tutorials", href: "/tutorial" },
    { name: "Snippets", href: "/snippets" },
    { name: "Playground", href: "/playground" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const legalLinks = [
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
  ];

  const socialLinks = [
    { name: "GitHub", icon: Github, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "LinkedIn", icon: Linkedin, href: "#" },
    { name: "Email", icon: Mail, href: "#" },
  ];

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="py-6 md:py-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg blur opacity-75"></div>
                <div className="relative bg-gradient-to-r from-blue-500 to-teal-500 p-2 rounded-lg">
                  <Code className="h-5 w-5 text-white" />
                </div>
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                Code Blog
              </span>
            </div>

            <p className="text-gray-600 dark:text-gray-300 max-w-xs">
              Empowering developers with cutting-edge tutorials, insights, and
              resources.
            </p>

            {/* Socials */}
            <div className="flex space-x-2 pt-2">
              {socialLinks.map(({ name, icon: Icon, href }) => (
                <a
                  key={name}
                  href={href}
                  className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
                  aria-label={name}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Combined Product & Legal */}
          <div className="grid grid-cols-2 gap-6">
            {/* Product Links */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Product
              </h3>
              <ul className="space-y-1">
                {productLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Legal
              </h3>
              <ul className="space-y-1">
                {legalLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="py-4 border-t border-gray-200 dark:border-gray-800 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Code Blog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
