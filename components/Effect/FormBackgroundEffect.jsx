import React from "react";

const FormBackgroundEffect = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Radial Glows Effect */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-r from-cyan-400 via-blue-300 to-indigo-400 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900 opacity-25 blur-3xl animate-spin-slow"></div>
      <div className="absolute bottom-10 right-10 w-60 h-60 bg-gradient-to-br from-blue-400 via-indigo-300 to-cyan-400 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900 opacity-20 blur-[120px]"></div>
      {/* Floating Particles Effect */}
      <div className="absolute inset-0 flex space-x-4 animate-float">
        <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full blur-lg"></div>
        <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full blur-lg"></div>
        <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-lg"></div>
      </div>
    </div>
  );
};

export default FormBackgroundEffect;
