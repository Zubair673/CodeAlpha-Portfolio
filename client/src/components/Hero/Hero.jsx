import React, { useEffect, useState, useCallback } from "react";

const API = "lucid-caring-production-a6e4.up.railway.app/api/hero";

const Hero = ({ handleNavClick = () => {} }) => {
  const [displayText, setDisplayText] = useState("");
  const [hero, setHero] = useState({
    name: "",
    title: "",
    availability: "",
    typingTexts: [],
    description: "",
    profileImage: "",
    resume: "",
    stats: [],
  });

  const fetchHero = useCallback(async () => {
    try {
      const response = await fetch(API);
      const data = await response.json();
      if (data.success) {
        setHero(data.hero);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchHero();
  }, [fetchHero]);

  // Typing Effect Logic
  useEffect(() => {
    if (!hero.typingTexts || hero.typingTexts.length === 0) return;

    let textIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const interval = setInterval(() => {
      const currentText = hero.typingTexts[textIndex];

      if (!deleting) {
        setDisplayText(currentText.substring(0, charIndex + 1));
        charIndex++;

        if (charIndex === currentText.length) {
          deleting = true;
        }
      } else {
        setDisplayText(currentText.substring(0, charIndex - 1));
        charIndex--;

        if (charIndex === 0) {
          deleting = false;
          textIndex = (textIndex + 1) % hero.typingTexts.length;
        }
      }
    }, deleting ? 60 : 120);

    return () => clearInterval(interval);
  }, [hero.typingTexts]);

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col lg:flex-row items-center justify-between px-6 md:px-20 xl:px-28 pt-24 md:pt-28 pb-10 gap-10 bg-[#050505]"
    >
      {/* Left Side */}
      <div className="flex-1 max-w-3xl text-center lg:text-left order-1">
        <span className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 text-orange-400 px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold mb-6">
          {hero.availability}
        </span>

        <h2 className="text-lg md:text-3xl font-bold text-orange-400 mb-4 min-h-[50px]">
          {displayText}
          <span className="animate-pulse text-white">|</span>
        </h2>

        <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black leading-tight text-white mb-6">
          <span className="block">{hero.name?.split(" ")[0]}</span>
          <span className="block mt-2 text-orange-500">
            {hero.name?.split(" ").slice(1).join(" ")}
          </span>
        </h1>

        <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl mb-8">
          {hero.description}
        </p>

        <div className="flex flex-wrap justify-center lg:justify-start gap-4">
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("Projects");
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-orange-500 hover:bg-orange-600 transition duration-300 px-8 py-3 rounded-lg font-semibold text-base hover:scale-105"
          >
            View Projects
          </a>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("Contact");
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="border border-orange-500 hover:bg-orange-500/20 transition duration-300 px-8 py-3 rounded-lg font-semibold text-base hover:scale-105"
          >
            Contact Me
          </a>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1 flex flex-col items-center order-2">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-orange-500 blur-[90px] opacity-20"></div>
          <img
            src={hero.profileImage}
            alt={hero.name || "Profile"}
            className="relative w-[240px] sm:w-[300px] lg:w-[400px] h-[240px] sm:h-[300px] lg:h-[400px] rounded-full object-cover border-4 border-orange-500 shadow-[0_0_50px_rgba(249,115,22,0.3)] hover:scale-105 duration-500"
          />
        </div>

        {/* Hero Stats */}
        <div className="grid grid-cols-2 gap-4 mt-8 w-full max-w-sm">
          {hero.stats?.map((item, index) => (
            <div
              key={index}
              className="bg-[#111] border border-orange-500/20 rounded-xl p-4 text-center hover:border-orange-500 transition duration-300"
            >
              <h3 className="text-2xl font-bold text-orange-500">
                {item.value}
              </h3>
              <p className="text-gray-400 text-sm mt-1">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;