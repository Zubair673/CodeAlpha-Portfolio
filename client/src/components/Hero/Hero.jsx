import React, { useEffect, useState, useCallback } from "react";

const API = "https://codealpha-portfolio-1.onrender.com/api/hero";

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

  // ==========================================
  // Fetch Hero (Memoized)
  // ==========================================
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

  // ==========================================
  // Typing Animation
  // ==========================================

  useEffect(() => {
    if (!hero.typingTexts?.length) return;

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
      className="min-h-screen flex flex-col lg:flex-row items-center justify-between px-6 md:px-20 xl:px-28 pt-32 md:pt-28 pb-10 gap-10 bg-[#050505]"
    >
      {/* Left Side */}
      <div className="flex-1 max-w-3xl text-center lg:text-left order-1">
        <span className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 text-orange-400 px-5 py-2 rounded-full text-sm font-semibold mb-8">
          {hero.availability}
        </span>

        <h2 className="text-xl md:text-4xl font-bold text-orange-400 mb-6 min-h-[60px]">
          {displayText}
          <span className="animate-pulse text-white">|</span>
        </h2>

        <h1 className="text-5xl sm:text-6xl xl:text-7xl font-black leading-tight text-white mb-8">
          <span className="block">{hero.name?.split(" ")[0]}</span>
          <span className="block mt-3 text-orange-500">
            {hero.name?.split(" ").slice(1).join(" ")}
          </span>
        </h1>

        <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mb-10">
          {hero.description}
        </p>

        <div className="flex flex-wrap justify-center lg:justify-start gap-5">
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("Projects");
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-orange-500 hover:bg-orange-600 transition duration-300 px-8 py-4 rounded-xl font-semibold text-lg hover:scale-105"
          >
            View Projects
          </a>

          <a
            href={hero.resume}
            target="_blank"
            rel="noreferrer"
            className="border border-orange-500 hover:bg-orange-500/20 transition duration-300 px-8 py-4 rounded-xl font-semibold text-lg hover:scale-105"
          >
            Download Resume
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
            className="relative w-[260px] sm:w-[340px] lg:w-[430px] h-[260px] sm:h-[340px] lg:h-[430px] rounded-full object-cover border-4 border-orange-500 shadow-[0_0_50px_rgba(249,115,22,0.3)] hover:scale-105 duration-500"
          />
        </div>

        {/* Hero Stats */}
        <div className="grid grid-cols-2 gap-5 mt-10 w-full max-w-md">
          {hero.stats?.map((item, index) => (
            <div
              key={index}
              className="bg-[#111] border border-orange-500/20 rounded-2xl p-5 text-center hover:border-orange-500 transition duration-300"
            >
              <h3 className="text-3xl font-bold text-orange-500">
                {item.value}
              </h3>
              <p className="text-gray-400 mt-2">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;