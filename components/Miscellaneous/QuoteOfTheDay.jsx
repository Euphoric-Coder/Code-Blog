import { quotesByDay } from "@/lib/data";
import Image from "next/image";
import React, { useEffect, useState } from "react";


const QuoteOfTheDay = ({ type = "blog" }) => {
  const [visible, setVisible] = useState(false);

  const today = new Date().toLocaleString("en-US", { weekday: "long" });
  const quote = quotesByDay[today]?.[type];

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  if (!quote) return null;

  return (
    <div className="my-12 px-4 sm:px-0">
      <blockquote
        className={`transition-opacity duration-1000 ease-in-out ${
          visible ? "opacity-100" : "opacity-0"
        } relative max-w-4xl mx-auto p-6 sm:p-10 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800`}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 via-purple-100/10 to-teal-100/20 dark:from-teal-400/5 dark:via-blue-300/5 dark:to-purple-500/5 rounded-3xl pointer-events-none z-0" />

        {/* Heading inside blockquote */}
        <h2 className="relative z-10 flex items-center gap-1 justify-center text-center text-xl sm:text-2xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-500 to-teal-400 dark:from-teal-300 dark:via-blue-400 dark:to-indigo-500">
          <Image src="/quote-icon.png" alt="quote" width={32} height={32} /> Quote of the Day <span className="font-semibold">({today})</span>
        </h2>

        {/* Quote content */}
        <div className="relative z-10 text-lg sm:text-xl leading-relaxed font-medium text-gray-800 dark:text-gray-200 text-justify">
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-500 to-teal-500 dark:from-teal-300 dark:via-blue-400 dark:to-indigo-500 font-semibold mb-2">
            “{quote.mainQuote}
          </span>
          <span>{quote.description}”</span>
        </div>

        {/* Author */}
        <div className="relative z-10 mt-6 text-sm sm:text-base font-semibold text-right text-gray-600 dark:text-gray-400">
          — {quote.author}
        </div>
      </blockquote>
    </div>
  );
};

export default QuoteOfTheDay;
