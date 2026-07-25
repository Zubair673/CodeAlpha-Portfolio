import React, { useState, useEffect } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = ({ active, handleNavClick, navItems }) => {
  // Settings store karne ke liye state
  const [settings, setSettings] = useState({
    footerText: "",
    copyrightText: "",
  });

  // API se data fetch karna
  useEffect(() => {
    fetch("https://codealpha-portfolio-1.onrender.com/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.settings) {
          setSettings(data.settings);
        }
      })
      .catch((err) => console.log("Error loading footer settings:", err));
  }, []);

  return (
    <footer className="bg-[#111] border-t border-orange-500/20 mt-8">
      <div className="max-w-7xl mx-auto px-6 py-10">
        
        {/* Name */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white">
            Muhammad Zubair Rauf
          </h2>
          {/* Dynamic Footer Text */}
          <p className="text-gray-400 mt-2">
            {settings.footerText || "MERN Stack Developer | Software Engineering Student"}
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavClick(item.name)}
              className={`px-5 py-2 rounded-full transition duration-300 font-medium
              ${
                active === item.name
                  ? "bg-orange-500 text-white"
                  : "text-gray-400 hover:text-orange-400 hover:bg-orange-500/10"
              }
              `}
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* Social */}
        <div className="flex justify-center gap-5 mt-8">
          <a
            href="https://github.com/Zubair673"
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 rounded-full bg-[#1b1b1b] border border-orange-500/20 flex items-center justify-center text-orange-500 hover:bg-orange-500 hover:text-white transition duration-300"
          >
            <FaGithub size={22} />
          </a>
          <a
            href="https://www.linkedin.com/in/muhammad-zubair-rauf-607a063ab/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 rounded-full bg-[#1b1b1b] border border-orange-500/20 flex items-center justify-center text-orange-500 hover:bg-orange-500 hover:text-white transition duration-300"
          >
            <FaLinkedin size={22} />
          </a>
        </div>

        {/* Dynamic Copyright */}
        <p className="text-center text-gray-500 text-sm mt-8">
          {settings.copyrightText || "© 2026 Muhammad Zubair Rauf. All Rights Reserved."}
        </p>

      </div>
    </footer>
  );
};

export default Footer;