import { useState, useEffect } from "react";

import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import About from "../../components/About/About";
import Skills from "../../components/Skills/Skills";
import Experience from "../../components/Experience/Experience";
import Certificates from "../../components/Certificates/Certificates";
import Projects from "../../components/Projects/Projects";
import Contact from "../../components/Contact/Contact";
import Footer from "../../components/Footer/Footer";

import {
  FaHome,
  FaUser,
  FaCode,
  FaBriefcase,
  FaCertificate,
  FaProjectDiagram,
  FaEnvelope,
} from "react-icons/fa";

const Home = () => {
  const [active, setActive] = useState("Home");

  // ================= THEME =================

  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      return savedTheme === "dark";
    }

    return true;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((previous) => !previous);
  };

  // ================= NAVIGATION =================

  const navItems = [
    {
      name: "Home",
      icon: <FaHome />,
    },
    {
      name: "About",
      icon: <FaUser />,
    },
    {
      name: "Skills",
      icon: <FaCode />,
    },
    {
      name: "Experience",
      icon: <FaBriefcase />,
    },
    {
      name: "Certificates",
      icon: <FaCertificate />,
    },
    {
      name: "Projects",
      icon: <FaProjectDiagram />,
    },
    {
      name: "Contact",
      icon: <FaEnvelope />,
    },
  ];

  const handleNavClick = (name) => {
    setActive(name);

    document
      .getElementById(name.toLowerCase())
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  // ================= ACTIVE SECTION =================

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const handleScroll = () => {
      const scrollY = window.scrollY + 150;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (
          scrollY >= sectionTop &&
          scrollY < sectionTop + sectionHeight
        ) {
          const current = section.getAttribute("id");

          setActive(
            current.charAt(0).toUpperCase() + current.slice(1)
          );
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="bg-themeBg text-themeText transition-colors duration-300 min-h-screen">

      <Navbar
        active={active}
        handleNavClick={handleNavClick}
        navItems={navItems}
        isDark={isDark}
        toggleTheme={toggleTheme}
      />

      <section id="home">
        <Hero handleNavClick={handleNavClick} />
      </section>

      <section id="about">
        <About />
      </section>

      <section id="skills">
        <Skills />
      </section>

      <section id="experience">
        <Experience />
      </section>

      <section id="certificates">
        <Certificates />
      </section>

      <section id="projects">
        <Projects />
      </section>

      <section id="contact">
        <Contact />
      </section>

      <Footer
        active={active}
        handleNavClick={handleNavClick}
        navItems={navItems}
      />

    </div>
  );
};

export default Home;