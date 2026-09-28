import React, { useEffect, useState } from "react";

const LoadingScreen = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      setIsDark(savedTheme === "dark");
    } else {
      setIsDark(true);
    }
  }, []);

  return (
    <div
      className={`fixed inset-0 flex flex-col items-center justify-center z-[9999] transition-colors duration-300 ${
        isDark ? "bg-[#050505] text-white" : "bg-white text-[#111111]"
      }`}
    >

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
      <h2
        className={`text-3xl font-bold ${
          isDark ? "text-white" : "text-[#111111]"
        }`}
      >
        Loading Portfolio
      </h2>

      <p
        className={`mt-2 ${
          isDark ? "text-gray-400" : "text-gray-600"
        }`}
      >
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