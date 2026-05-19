import { useEffect, useState } from "react";
import {
  FaHome,
  FaUser,
  FaCode,
  FaProjectDiagram,
  FaEnvelope,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaGithub,
  FaGraduationCap,
  FaLaptopCode,
  FaLightbulb,
  FaBars,
  FaTimes,
} from "react-icons/fa";

function App() {

  const [active, setActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", icon: <FaHome /> },
    { name: "About", icon: <FaUser /> },
    { name: "Skills", icon: <FaCode /> },
    { name: "Projects", icon: <FaProjectDiagram /> },
    { name: "Contact", icon: <FaEnvelope /> },
  ];

  const texts = [
    "Frontend Developer",
    "Software Engineering Student at IIUI",
    "Turning ideas into powerful websites",
  ];

  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {

    const currentText = texts[textIndex];

    if (charIndex < currentText.length) {

      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + currentText[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 100);

      return () => clearTimeout(timeout);

    } else {

      const timeout = setTimeout(() => {
        setDisplayText("");
        setCharIndex(0);
        setTextIndex((prev) => (prev + 1) % texts.length);
      }, 2000);

      return () => clearTimeout(timeout);

    }

  }, [charIndex, textIndex]);

  const skills = [
    {
      name: "HTML",
      icon: <FaHtml5 className="text-5xl text-orange-500 mx-auto mb-4" />,
    },
    {
      name: "CSS",
      icon: <FaCss3Alt className="text-5xl text-blue-500 mx-auto mb-4" />,
    },
    {
      name: "JavaScript",
      icon: <FaJs className="text-5xl text-yellow-400 mx-auto mb-4" />,
    },
    {
      name: "React JS",
      icon: <FaReact className="text-5xl text-cyan-400 mx-auto mb-4" />,
    },
    {
      name: "GitHub",
      icon: <FaGithub className="text-5xl text-white mx-auto mb-4" />,
    },
  ];

  return (

    <div
      id="home"
      className="bg-black text-white min-h-screen overflow-x-hidden scroll-smooth"
    >

      {/* Background Glow */}
      <div className="fixed top-0 left-0 w-full h-full -z-10">

        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/20 blur-3xl rounded-full"></div>

        <div className="absolute bottom-20 right-10 w-72 h-72 bg-orange-500/20 blur-3xl rounded-full"></div>

      </div>

      {/* Navbar */}
      <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-auto">

        <div className="flex items-center justify-center gap-4 bg-[#111] border border-orange-500/30 rounded-full px-4 md:px-6 py-3 shadow-2xl backdrop-blur-md">

          {/* Profile */}
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-orange-500 flex-shrink-0">

            <img
              src="/profile.jpeg"
              alt="profile"
              className="w-full h-full object-cover"
            />

          </div>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-3">

            {navItems.map((item) => (

              <li key={item.name}>

                <a
                  href={`#${item.name.toLowerCase()}`}
                  onClick={() => setActive(item.name)}
                  className={`flex items-center gap-2 px-5 py-2 rounded-full transition duration-300 text-lg font-medium
                  ${
                    active === item.name
                      ? "bg-orange-500 text-white shadow-lg"
                      : "hover:bg-orange-500/20 hover:text-orange-400"
                  }`}
                >
                  

                  {item.icon}
                  {item.name}

                </a>

              </li>

            ))}

          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-2xl text-orange-500"
          >

            {menuOpen ? <FaTimes /> : <FaBars />}

          </button>

        </div>

       {/* Mobile Menu */}
{menuOpen && (
  <div className="md:hidden mt-3 bg-[#111] border border-orange-500/20 rounded-3xl p-5 shadow-xl">

    <ul className="flex flex-col items-center gap-5">

      {navItems.map((item) => (
        <li key={item.name}>
          <a
            href={`#${item.name.toLowerCase()}`}
            onClick={() => {
              setActive(item.name);
              setMenuOpen(false);
            }}
            className="flex items-center gap-3 text-lg hover:text-orange-400 transition duration-300"
          >
            {item.icon}
            {item.name}
          </a>
        </li>
      ))}
    </ul>
    
  </div>
)}

      </nav>
      {/* Floating Resume Button (Top Right) */}
<a
  href="/MyCV.pdf"
  target="_blank"
  rel="noreferrer"
  className="
    hidden md:flex
    fixed top-6 right-6
    z-50

    items-center gap-2
    bg-orange-500 text-white font-medium
    px-5 py-2 rounded-full shadow-lg

    transition-all duration-300 ease-in-out
    hover:bg-orange-600 hover:scale-110
    hover:shadow-[0_0_25px_rgba(249,115,22,0.8)]
    active:scale-95
  "
>
  My Resume
</a>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-24 pt-36 gap-16">

        {/* Left Side */}
        <div className="max-w-2xl text-center md:text-left">

          {/* Animated Text */}
          <h2 className="text-2xl md:text-4xl text-orange-400 font-bold mb-6 min-h-[60px]">

            {displayText}
            <span>|</span>

          </h2>

          {/* Name */}
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-8">

            I am
            <span className="text-orange-500"> Muhammad Zubair Rauf</span>

          </h1>

          <p className="text-gray-400 text-lg md:text-2xl leading-9 mb-10">

            I create modern, responsive and visually engaging
            web applications using React.js, JavaScript and CSS.

          </p>

          {/* Buttons */}
          <div className="flex gap-5 flex-wrap justify-center md:justify-start">

            <a
              href="#projects"
              className="bg-orange-500 hover:bg-orange-600 transition duration-300 px-8 py-4 rounded-xl text-lg font-semibold hover:scale-105"
            >
              View Projects →
            </a>

            <a
              href="#contact"
              className="border border-orange-500 hover:bg-orange-500/20 transition duration-300 px-8 py-4 rounded-xl text-lg font-semibold hover:scale-105"
            >
              Contact Me ✉
            </a>

          </div>

        </div>

        {/* Right Side */}
        <div className="relative">

          <div className="absolute inset-0 bg-orange-500 blur-3xl opacity-20 rounded-full"></div>

          <img
            src="/profile.jpeg"
            alt="profile"
            className="relative w-[260px] sm:w-[320px] md:w-[450px] rounded-full border-4 border-orange-500 shadow-[0_0_40px_orange] hover:scale-105 transition duration-500"
          />

        </div>

      </section>

      {/* About */}
      <section
        id="about"
        className="max-w-7xl mx-auto px-6 py-24"
      >

        <div className="flex items-center justify-center gap-5 mb-16">

          <div className="w-16 md:w-24 h-[2px] bg-orange-500"></div>

          <h2 className="text-4xl md:text-5xl font-bold">
            About Me
          </h2>

          <div className="w-16 md:w-24 h-[2px] bg-orange-500"></div>

        </div>

        <div className="grid md:grid-cols-2 gap-10">

          <div className="bg-[#111] border border-orange-500/20 rounded-3xl p-10 shadow-xl hover:-translate-y-2 transition duration-300">

            <div className="flex items-center gap-4 mb-6">

              <FaLaptopCode className="text-4xl text-orange-500" />

              <h3 className="text-3xl font-bold">
                Frontend Developer
              </h3>

            </div>

            <p className="text-gray-300 text-lg leading-9">

              I love building modern, responsive and interactive
              websites with clean UI and smooth user experience.

              <br /><br />

              My focus is creating visually engaging interfaces
              using React.js and modern frontend technologies.

            </p>

          </div>

          <div className="bg-[#111] border border-orange-500/20 rounded-3xl p-10 shadow-xl hover:-translate-y-2 transition duration-300">

            <div className="flex items-center gap-4 mb-6">

              <FaGraduationCap className="text-4xl text-orange-500" />

              <h3 className="text-3xl font-bold">
                Education & Goals
              </h3>

            </div>

            <p className="text-gray-300 text-lg leading-9">

              Currently pursuing BS Software Engineering
              at IIUI (International Islamic University Islamabad)
              Batch 2024-2028.

              <br /><br />

              My goal is to become a professional Full Stack Developer
              and build impactful web applications.

            </p>

          </div>

        </div>

      </section>

      {/* Skills */}
      <section
        id="skills"
        className="px-6 py-24"
      >

        <div className="flex items-center justify-center gap-5 mb-16">

          <div className="w-16 md:w-24 h-[2px] bg-orange-500"></div>

          <h2 className="text-4xl md:text-5xl font-bold">
            My Skills
          </h2>

          <div className="w-16 md:w-24 h-[2px] bg-orange-500"></div>

        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">

          {skills.map((skill, index) => (

            <div
              key={index}
              className="bg-[#111] border border-orange-500/20 hover:border-orange-500 hover:-translate-y-2 transition duration-300 rounded-2xl p-8 text-center shadow-xl"
            >

              {skill.icon}

              <h3 className="text-xl font-bold">
                {skill.name}
              </h3>

            </div>

          ))}

        </div>

      </section>

      {/* Projects */}
      <section
        id="projects"
        className="max-w-7xl mx-auto px-6 py-24"
      >

        <div className="flex items-center justify-center gap-5 mb-16">

          <div className="w-16 md:w-24 h-[2px] bg-orange-500"></div>

          <h2 className="text-4xl md:text-5xl font-bold">
            My Projects
          </h2>

          <div className="w-16 md:w-24 h-[2px] bg-orange-500"></div>

        </div>

        <div className="grid md:grid-cols-2 gap-10">

          {/* Project 1 */}
          <div className="bg-[#111] border border-orange-500/20 rounded-3xl overflow-hidden hover:scale-105 transition duration-300 shadow-xl">

            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
              alt="gallery"
              className="w-full h-64 object-cover"
            />

            <div className="p-8">

              <h3 className="text-3xl font-bold mb-5">
                Image Gallery
              </h3>

              <p className="text-gray-400 leading-8 mb-6">
                Responsive image gallery with category filters and fullscreen mode.
              </p>

              <a
                href="https://code-alpha-image-gallery-mu.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-xl transition duration-300 inline-block"
              >
                Live Demo →
              </a>

            </div>

          </div>

          {/* Project 2 */}
          <div className="bg-[#111] border border-orange-500/20 rounded-3xl overflow-hidden hover:scale-105 transition duration-300 shadow-xl">

            <img
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c"
              alt="calculator"
              className="w-full h-64 object-cover"
            />

            <div className="p-8">

              <h3 className="text-3xl font-bold mb-5">
                Calculator App
              </h3>

              <p className="text-gray-400 leading-8 mb-6">
                Modern calculator with keyboard support and responsive design.
              </p>

              <a
                href="https://code-alpha-calculator-pi.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-xl transition duration-300 inline-block"
              >
                Live Demo →
              </a>

            </div>

          </div>

          {/* Project 3 */}
          <div className="bg-[#111] border border-orange-500/20 rounded-3xl overflow-hidden hover:scale-105 transition duration-300 shadow-xl">

            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
              alt="hijri"
              className="w-full h-64 object-cover"
            />

            <div className="p-8">

              <h3 className="text-3xl font-bold mb-5">
                Hijri Countdown
              </h3>

              <p className="text-gray-400 leading-8 mb-6">
                Countdown website with modern UI and responsive design.
              </p>

              <a
                href="https://hijri-countdown.odoo.com/"
                target="_blank"
                rel="noreferrer"
                className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-xl transition duration-300 inline-block"
              >
                Live Demo →
              </a>

            </div>

          </div>

          {/* Project 4 */}
          <div className="bg-[#111] border border-orange-500/20 rounded-3xl overflow-hidden hover:scale-105 transition duration-300 shadow-xl">

            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
              alt="portfolio"
              className="w-full h-64 object-cover"
            />

            <div className="p-8">

              <h3 className="text-3xl font-bold mb-5">
                Personal Portfolio
              </h3>

              <p className="text-gray-400 leading-8 mb-6">
                Personal portfolio website with responsive layout and modern UI.
              </p>

              <a
                href="https://personalportfolio1.odoo.com/"
                target="_blank"
                rel="noreferrer"
                className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-xl transition duration-300 inline-block"
              >
                Live Demo →
              </a>

            </div>

          </div>

        </div>

      </section>

      {/* Contact */}
      <section
        id="contact"
        className="px-6 py-24"
      >

        <div className="flex items-center justify-center gap-5 mb-16">

          <div className="w-16 md:w-24 h-[2px] bg-orange-500"></div>

          <h2 className="text-4xl md:text-5xl font-bold">
            Contact Me
          </h2>

          <div className="w-16 md:w-24 h-[2px] bg-orange-500"></div>

        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">

          <div className="bg-[#111] border border-orange-500/20 rounded-2xl p-8 text-center hover:-translate-y-2 transition duration-300">

            <h3 className="text-2xl font-bold mb-4">
              Email
            </h3>

            <p className="text-gray-400">
              zubairzk2244@gmail.com
            </p>

          </div>

          <div className="bg-[#111] border border-orange-500/20 rounded-2xl p-8 text-center hover:-translate-y-2 transition duration-300">

            <h3 className="text-2xl font-bold mb-4">
              Phone
            </h3>

            <p className="text-gray-400">
              +92 3207921826
            </p>

          </div>

          <div className="bg-[#111] border border-orange-500/20 rounded-2xl p-8 text-center hover:-translate-y-2 transition duration-300">

            <h3 className="text-2xl font-bold mb-4">
              Location
            </h3>

            <p className="text-gray-400">
              Pakistan
            </p>

          </div>

        </div>

      </section>

      {/* Footer */}
      <footer className="border-t border-orange-500/20 py-8 bg-[#0a0a0a]">

        <div className="max-w-7xl mx-auto text-center px-6">

          <h3 className="text-3xl font-bold text-orange-500 mb-3">
            Muhammad Zubair Rauf
          </h3>

          <p className="text-gray-400 mb-4">
            Frontend Developer | Software Engineering Student at IIUI
          </p>

          <div className="flex justify-center gap-6 flex-wrap mb-4">

            <a
              href="#home"
              className="hover:text-orange-500 transition duration-300"
            >
              Home
            </a>

            <a
              href="#about"
              className="hover:text-orange-500 transition duration-300"
            >
              About
            </a>

            <a
              href="#skills"
              className="hover:text-orange-500 transition duration-300"
            >
              Skills
            </a>

            <a
              href="#projects"
              className="hover:text-orange-500 transition duration-300"
            >
              Projects
            </a>

          </div>

          <p className="text-gray-500 text-sm">
            © 2026 All Rights Reserved
          </p>

        </div>

      </footer>

    </div>

  );

}

export default App;