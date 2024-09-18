// Footer.js
import React from "react";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="py-6 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto flex flex-col items-center justify-between px-4 lg:flex-row">
        {/* Logo and Brand */}
        <div className="flex items-center mb-4 lg:mb-0">
          {/* Logo Icon */}
          <img src="test.png" alt="Logo" />
          <span className="text-2xl font-bold text-purple-500">Code Blog</span>
        </div>

        {/* Copyright */}
        <p className="text-sm text-gray-500 dark:text-gray-400">
          © 2024 Code Blog. All rights reserved. | Created by Sagnik Dey
        </p>

        {/* Social Links */}
        <div className="flex mt-4 lg:mt-0">
          <Link
            href="https://facebook.com"
            className="mx-2 text-gray-500 dark:text-gray-400 hover:text-purple-500 transition-colors duration-200"
          >
            <FaFacebook size={24} />
          </Link>
          <Link
            href="https://twitter.com"
            className="mx-2 text-gray-500 dark:text-gray-400 hover:text-purple-500 transition-colors duration-200"
          >
            <FaTwitter size={24} />
          </Link>
          <Link
            href="https://linkedin.com"
            className="mx-2 text-gray-500 dark:text-gray-400 hover:text-purple-500 transition-colors duration-200"
          >
            <FaLinkedin size={24} />
          </Link>
          <Link
            href="https://github.com"
            className="mx-2 text-gray-500 dark:text-gray-400 hover:text-purple-500 transition-colors duration-200"
          >
            <FaGithub size={24} />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
