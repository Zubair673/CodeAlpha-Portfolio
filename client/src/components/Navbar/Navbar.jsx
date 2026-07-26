import React, { useState, useEffect } from "react";
import {
  FaBars,
  FaTimes,
  FaFileAlt,
} from "react-icons/fa";

const Navbar = ({ active, handleNavClick, navItems }) => {

  const [menuOpen, setMenuOpen] = useState(false);
  const [resume, setResume] = useState("");

  const API_URL = "https://codealpha-portfolio-1.onrender.com";

  useEffect(() => {

    const fetchHero = async () => {

      try {

        const res = await fetch(`${API_URL}/api/hero`);
        const data = await res.json();

        if (data.success) {
          setResume(data.hero.resume);
        }

      } catch (err) {
        console.log(err);
      }

    };

    fetchHero();

  }, []);

  const handleClick = (name) => {

    handleNavClick(name);

    setMenuOpen(false);

    document
      .getElementById(name.toLowerCase())
      ?.scrollIntoView({
        behavior: "smooth",
      });

  };

  return (
    <>
      {/* ================= DESKTOP ================= */}

      <div className="hidden md:flex fixed top-5 left-0 right-0 z-50 items-center justify-between px-8">

        <div className="bg-[#111]/90 backdrop-blur-md border border-orange-500/30 rounded-full px-5 py-3 shadow-xl">

          <img
            src="/logo.png"
            alt="Logo"
            className="h-9 w-auto"
          />

        </div>

        <nav className="bg-[#111]/90 backdrop-blur-md border border-orange-500/30 rounded-full px-6 py-3 shadow-xl">

          <ul className="flex items-center gap-3">

            {navItems.map((item) => (

              <li key={item.name}>

                <button
                  onClick={() => handleClick(item.name)}
                  className={`flex items-center gap-2 px-5 py-2 rounded-full transition
                  ${
                    active === item.name
                      ? "bg-orange-500 text-white"
                      : "text-white hover:bg-orange-500/20"
                  }`}
                >
                  {item.icon}
                  {item.name}
                </button>

              </li>

            ))}

          </ul>

        </nav>

        <a
          href={resume}
          target="_blank"
          rel="noreferrer"
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 transition"
        >
          <FaFileAlt />
          Resume
        </a>

      </div>

      {/* ================= MOBILE ================= */}

      <div className="md:hidden fixed top-4 left-0 right-0 z-50 px-4">

        <div className="flex items-center gap-3">

          <div className="flex-1 bg-[#111]/90 backdrop-blur-md border border-orange-500/30 rounded-full px-5 py-3 flex justify-between items-center shadow-xl">

            <img
              src="/logo.png"
              alt="Logo"
              className="h-8"
            />

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-2xl text-white"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>

          </div>

          <a
            href={resume}
            target="_blank"
            rel="noreferrer"
            className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-4 py-3 flex items-center gap-2 font-semibold transition shadow-xl whitespace-nowrap"
          >
            <FaFileAlt />
            <span className="text-sm">Resume</span>
          </a>

        </div>

        {menuOpen && (

          <div className="mt-3 bg-[#111]/95 backdrop-blur-md border border-orange-500/20 rounded-2xl overflow-hidden shadow-xl">

            {navItems.map((item) => (

              <button
                key={item.name}
                onClick={() => handleClick(item.name)}
                className={`w-full flex items-center gap-3 px-6 py-4 text-left transition
                ${
                  active === item.name
                    ? "bg-orange-500 text-white"
                    : "hover:bg-orange-500/20 text-white"
                }`}
              >
                {item.icon}
                {item.name}
              </button>

            ))}

          </div>

        )}

      </div>
    </>
  );
};

export default Navbar;