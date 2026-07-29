import React from "react";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-[#050505] flex flex-col items-center justify-center z-[9999]">

      {/* Logo */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-orange-500 blur-3xl opacity-30 rounded-full"></div>

        <div className="relative w-28 h-28 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
          <h1 className="text-5xl font-extrabold text-orange-500">
            Z
          </h1>
        </div>
      </div>

      {/* Loading Text */}
      <h2 className="text-3xl font-bold text-white">
        Loading Portfolio
      </h2>

      <p className="text-gray-400 mt-2">
        Please wait a moment...
      </p>

      {/* Animated Dots */}
      <div className="flex items-center gap-3 mt-8">

        <span
          className="w-3 h-3 rounded-full bg-orange-500 animate-bounce"
          style={{ animationDelay: "0s" }}
        ></span>

        <span
          className="w-3 h-3 rounded-full bg-orange-500 animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></span>

        <span
          className="w-3 h-3 rounded-full bg-orange-500 animate-bounce"
          style={{ animationDelay: "0.4s" }}
        ></span>

      </div>
    </div>
  );
};

export default LoadingScreen;