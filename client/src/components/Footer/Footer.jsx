import React, { useState, useEffect } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = ({ active, handleNavClick, navItems }) => {
  const [settings, setSettings] = useState({
    footerText: "",
    copyrightText: "",
  });

  useEffect(() => {
    fetch("lucid-caring-production-a6e4.up.railway.app/api/settings")
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
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Name */}
        <div className="text-center">
          <h2 className="text-xl font-bold text-white">
            Muhammad Zubair Rauf
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            {settings.footerText || "MERN Stack Developer"}
          </p>
        </div>

        {/* Navigation - Fixed for Mobile */}
        <div className="flex flex-row justify-start md:justify-center gap-1 mt-6 overflow-x-auto pb-2 scrollbar-hide">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavClick(item.name)}
              className={`px-3 py-1.5 rounded-full transition duration-300 text-sm font-medium whitespace-nowrap
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
        <div className="flex justify-center gap-4 mt-6">
          <a
            href="https://github.com/Zubair673"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-[#1b1b1b] border border-orange-500/20 flex items-center justify-center text-orange-500 hover:bg-orange-500 hover:text-white transition duration-300"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/muhammad-zubair-rauf-607a063ab/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-[#1b1b1b] border border-orange-500/20 flex items-center justify-center text-orange-500 hover:bg-orange-500 hover:text-white transition duration-300"
          >
            <FaLinkedin size={20} />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-center text-gray-500 text-xs mt-6">
          {settings.copyrightText || "© 2026 Muhammad Zubair Rauf. All Rights Reserved."}
        </p>

      </div>
    </footer>
  );
};

export default Footer;