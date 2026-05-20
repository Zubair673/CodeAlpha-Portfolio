
import { useEffect, useState, useRef } from "react";
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
  FaLinkedin,
  FaBriefcase,
  FaPaperPlane,
} from "react-icons/fa";
import emailjs from "@emailjs/browser"; 

const EMAILJS_CONFIG = {
  SERVICE_ID: "service_g0pqxzn",    
  PUBLIC_KEY: "n85Be0ef_VA3MP-kr", 
  TEMPLATE_ID: "template_5xprdhk",
};

const texts = [
  "Frontend Developer",
  "Software Engineering Student at IIUI",
  "Turning ideas into powerful websites",
];

const navItems = [
  { name: "Home", icon: <FaHome /> },
  { name: "About", icon: <FaUser /> },
  { name: "Experience", icon: <FaBriefcase /> },
  { name: "Skills", icon: <FaCode /> },
  { name: "Projects", icon: <FaProjectDiagram /> },
  { name: "Contact", icon: <FaEnvelope /> },
];

function App() {
  const [active, setActive] = useState("Home");
  const isClickScrolling = useRef(false);

  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  // Contact Form State
  const formRef = useRef();
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSending, setIsSending] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ success: null, message: "" });

  // Typing Animation Effect
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

  // SCROLL SPY EFFECT
  useEffect(() => {
    const sections = navItems.map(item => document.getElementById(item.name.toLowerCase()));
    
    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -50% 0px",
      threshold: 0,
    };

    const observerCallback = (entries) => {
      if (isClickScrolling.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const matchedItem = navItems.find(item => item.name.toLowerCase() === id);
          if (matchedItem) {
            setActive(matchedItem.name);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  const handleNavClick = (name) => {
    setActive(name);
    isClickScrolling.current = true;
    
    setTimeout(() => {
      isClickScrolling.current = false;
    }, 800); 
  };

  // Form Submit Handler
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);
    setSubmitStatus({ success: null, message: "" });

    emailjs
      .sendForm(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        formRef.current,
        EMAILJS_CONFIG.PUBLIC_KEY
      )
      .then(
        () => {
          setIsSending(false);
          setSubmitStatus({ success: true, message: "Message sent successfully! 🚀 I'll get back to you soon." });
          setFormState({ name: "", email: "", message: "" });
        },
        (error) => {
          setIsSending(false);
          setSubmitStatus({ success: false, message: "Oops! Something went wrong. Please mail directly to zubairzk2244@gmail.com" });
          console.error("EmailJS Error:", error);
        }
      );
  };

  const skills = [
    { name: "HTML", icon: <FaHtml5 className="text-4xl md:text-5xl text-orange-500 mx-auto mb-2 md:mb-4" /> },
    { name: "CSS", icon: <FaCss3Alt className="text-4xl md:text-5xl text-blue-500 mx-auto mb-2 md:mb-4" /> },
    { name: "JavaScript", icon: <FaJs className="text-4xl md:text-5xl text-yellow-400 mx-auto mb-2 md:mb-4" /> },
    { name: "React JS", icon: <FaReact className="text-4xl md:text-5xl text-cyan-400 mx-auto mb-2 md:mb-4" /> },
    { name: "GitHub", icon: <FaGithub className="text-4xl md:text-5xl text-white mx-auto mb-2 md:mb-4" /> },
  ];

  return (
    <div 
      className="text-white min-h-screen w-full overflow-x-hidden scroll-smooth relative selection:bg-orange-500 selection:text-white"
      style={{
        backgroundColor: "#050505",
        backgroundImage: `radial-gradient(circle at 20% 20%, rgba(249, 115, 22, 0.15) 0%, transparent 40%), 
                          radial-gradient(circle at 80% 80%, rgba(249, 115, 22, 0.1) 0%, transparent 50%)`
      }}
    >
      {/* Tech Mesh Grid Overlay */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#f9731603_1px,transparent_1px),linear-gradient(to_bottom,#f9731604_1px,transparent_1px)] bg-[size:50px_50px] opacity-70 pointer-events-none"></div>
      
      {/* Ambient Neon Glow Orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-40">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-orange-600/10 blur-[150px] rounded-full animate-pulse"></div>
        <div className="absolute top-[40%] right-[-20%] w-[500px] h-[500px] bg-orange-500/5 blur-[130px] rounded-full"></div>
        <div className="absolute bottom-[-10%] left-[10%] w-[500px] h-[500px] bg-blue-500/5 blur-[130px] rounded-full"></div>
      </div>

      {/* TOP LEFT: Brand Logo */}
      <div className="fixed top-5 left-4 md:top-7 md:left-8 z-50">
        <a href="#home" onClick={() => handleNavClick("Home")} className="text-base sm:text-lg md:text-2xl font-black tracking-wider text-white hover:text-orange-500 transition duration-300">
          ZUBAIR
        </a>
      </div>

      {/* TOP RIGHT: Resume Button */}
      <div className="fixed top-4 right-4 md:top-6 md:right-8 z-50 max-md:bottom-6 max-md:top-auto max-md:right-6">
        <a
          href="/MyCV..pdf"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 bg-orange-500 text-white font-semibold px-4 py-2 md:px-6 md:py-2.5 rounded-full shadow-lg transition-all duration-300 ease-in-out hover:bg-orange-600 hover:scale-105 hover:shadow-[0_0_20px_rgba(249,115,22,0.5)] active:scale-95 text-xs sm:text-sm md:text-base whitespace-nowrap"
        >
          My Resume
        </a>
      </div>

      {/* FLOATING SOCIAL SIDEBAR (Desktop Only) */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 max-md:hidden">
        <a
          href="http://github.com/Zubair673"
          target="_blank"
          rel="noreferrer"
          className="bg-[#111]/90 border border-orange-500/20 text-gray-400 p-3 rounded-full shadow-2xl hover:bg-orange-500 hover:text-white hover:border-orange-500 hover:-translate-x-1 transition-all duration-300 text-xl backdrop-blur-md"
          title="GitHub Profile"
        >
          <FaGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/muhammad-zubair-rauf-607a063ab"
          target="_blank"
          rel="noreferrer"
          className="bg-[#111]/90 border border-orange-500/20 text-gray-400 p-3 rounded-full shadow-2xl hover:bg-orange-500 hover:text-white hover:border-orange-500 hover:-translate-x-1 transition-all duration-300 text-xl backdrop-blur-md"
          title="LinkedIn Profile"
        >
          <FaLinkedin />
        </a>
        <div className="w-[1px] h-20 bg-gradient-to-b from-orange-500/40 to-transparent mx-auto"></div>
      </div>

      {/* HEADER NAVBAR */}
      <div className="fixed top-16 md:top-5 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-auto flex flex-col md:flex-row items-center justify-center gap-4">
        <nav className="w-full md:w-auto bg-[#111]/90 border border-orange-500/30 rounded-full px-3 md:px-6 py-2 md:py-3 shadow-2xl backdrop-blur-md overflow-x-auto no-scrollbar">
          <ul className="flex items-center justify-center gap-1.5 md:gap-3 min-w-max mx-auto">
            <li className="w-8 h-8 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-orange-500 flex-shrink-0 mr-1">
              <img src="/profile.jpeg" alt="profile" className="w-full h-full object-cover" />
            </li>

            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={`#${item.name.toLowerCase()}`}
                  onClick={() => handleNavClick(item.name)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 md:px-5 md:py-2 rounded-full transition duration-300 text-xs sm:text-sm md:text-lg font-medium whitespace-nowrap
                  ${active === item.name ? "bg-orange-500 text-white shadow-lg" : "hover:bg-orange-500/20 hover:text-orange-400"}`}
                >
                  <span>{item.icon}</span>
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* CONTENT LAYERS WRAPPER */}
      <div className="relative z-10 w-full overflow-hidden">

        {/* 1. HERO SECTION */}
        <section id="home" className="min-h-screen flex flex-col-reverse md:flex-row items-center justify-center md:justify-between px-6 md:px-24 pt-36 pb-12 md:pt-36 gap-8 md:gap-16">
          <div className="max-w-2xl text-center md:text-left w-full">
            <h2 className="text-base sm:text-lg md:text-4xl text-orange-400 font-bold mb-4 md:mb-6 min-h-[50px] md:min-h-[60px]">{displayText}<span>|</span></h2>
            
            <h1 className="text-[7.5vw] sm:text-[6vw] md:text-7xl font-extrabold leading-tight mb-6 md:mb-8 flex flex-col text-white">
              <span className="whitespace-nowrap block">I am Muhammad</span>
              <span className="mt-1 md:mt-4 block">Zubair Rauf</span>
            </h1>
            
            <p className="text-gray-400 text-sm sm:text-base md:text-2xl leading-relaxed mb-8 md:mb-10">I create modern, responsive and visually engaging web applications using React.js, JavaScript and CSS.</p>
            <div className="flex gap-4 flex-wrap justify-center md:justify-start">
              <a href="#projects" onClick={() => handleNavClick("Projects")} className="bg-orange-500 hover:bg-orange-600 transition duration-300 px-6 py-3.5 md:px-8 md:py-4 rounded-xl text-sm md:text-lg font-semibold hover:scale-105 whitespace-nowrap">View Projects →</a>
              <a href="#contact" onClick={() => handleNavClick("Contact")} className="border border-orange-500 hover:bg-orange-500/20 transition duration-300 px-6 py-3.5 md:px-8 md:py-4 rounded-xl text-sm md:text-lg font-semibold hover:scale-105 whitespace-nowrap">Contact Me ✉</a>
            </div>
          </div>
          <div className="relative flex-shrink-0">
            <div className="absolute inset-0 bg-orange-500 blur-3xl opacity-20 rounded-full"></div>
            <img src="/profile.jpeg" alt="profile" className="relative w-[180px] sm:w-[260px] md:w-[450px] h-[180px] sm:h-[260px] md:h-[450px] rounded-full object-cover border-4 border-orange-500 shadow-[0_0_30px_orange] md:shadow-[0_0_40px_orange] hover:scale-105 transition duration-500" />
          </div>
        </section>

        {/* 2. ABOUT SECTION */}
        <section id="about" className="flex flex-col justify-center max-w-7xl mx-auto px-6 py-12 md:py-20 box-border">
          <div className="flex items-center justify-center gap-3 sm:gap-5 mb-10 md:mb-12">
            <div className="w-8 md:w-24 h-[2px] bg-orange-500"></div>
            <h2 className="text-2xl md:text-5xl font-bold text-center whitespace-nowrap">About Me</h2>
            <div className="w-8 md:w-24 h-[2px] bg-orange-500"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <div className="bg-[#111]/80 backdrop-blur-sm border border-orange-500/20 rounded-2xl md:rounded-3xl p-6 sm:p-10 shadow-xl hover:-translate-y-1 transition duration-300">
              <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                <FaLaptopCode className="text-2xl md:text-4xl text-orange-500 flex-shrink-0" />
                <h3 className="text-xl md:text-3xl font-bold whitespace-nowrap">Frontend Developer</h3>
              </div>
              <p className="text-gray-300 text-sm sm:text-lg leading-relaxed">I love building modern, responsive and interactive websites with clean UI and smooth user experience.<br /><br />My focus is creating visually engaging interfaces using React.js and modern frontend technologies.</p>
            </div>
            <div className="bg-[#111]/80 backdrop-blur-sm border border-orange-500/20 rounded-2xl md:rounded-3xl p-6 sm:p-10 shadow-xl hover:-translate-y-1 transition duration-300">
              <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                <FaGraduationCap className="text-2xl md:text-4xl text-orange-500 flex-shrink-0" />
                <h3 className="text-xl md:text-3xl font-bold whitespace-nowrap">Education & Goals</h3>
              </div>
              <p className="text-gray-300 text-sm sm:text-lg leading-relaxed">Currently pursuing BS Software Engineering at IIUI (International Islamic University Islamabad) Batch 2024-2028.<br /><br />My goal is to become a professional Full Stack Developer and build impactful web applications.</p>
            </div>
          </div>
        </section>

        {/* 🔥 NEW: INTERACTIVE EXPERIENCE & EDUCATION TIMELINE */}
        <section id="experience" className="flex flex-col justify-center max-w-4xl mx-auto px-6 py-12 md:py-20 box-border">
          <div className="flex items-center justify-center gap-3 sm:gap-5 mb-14">
            <div className="w-8 md:w-24 h-[2px] bg-orange-500"></div>
            <h2 className="text-2xl md:text-5xl font-bold text-center whitespace-nowrap">My Journey</h2>
            <div className="w-8 md:w-24 h-[2px] bg-orange-500"></div>
          </div>

          <div className="relative border-l-2 border-orange-500/40 ml-4 md:ml-32 grid gap-10">
            {/* Timeline Item 1: Bano Qabil */}
            <div className="relative pl-6 md:pl-8">
              <div className="absolute -left-[11px] top-1 bg-orange-500 w-5 h-5 rounded-full border-4 border-[#050505] shadow-[0_0_10px_#f97316]"></div>
              <div className="bg-[#111]/80 border border-orange-500/20 rounded-xl p-5 md:p-6 shadow-xl hover:-translate-y-1 transition duration-300">
                <span className="text-orange-500 text-xs md:text-sm font-semibold tracking-wider block mb-1">Feb 2026 - MAY 2026</span>
                <h3 className="text-lg md:text-2xl font-bold text-white flex items-center gap-2">Frontend Development Intern <span className="text-xs bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded border border-orange-500/20">On-Site</span></h3>
                <h4 className="text-gray-400 font-medium text-sm md:text-base mb-3">Bano Qabil • Islamabad</h4>
                <p className="text-gray-300 text-xs md:text-sm leading-relaxed">Gaining robust hands-on experience in building complex web layouts, modern interface rendering, and optimizing structural responsiveness inside a professional workspace environment.</p>
              </div>
            </div>

            {/* Timeline Item 2: CodeAlpha */}
            <div className="relative pl-6 md:pl-8">
              <div className="absolute -left-[11px] top-1 bg-orange-500 w-5 h-5 rounded-full border-4 border-[#050505] shadow-[0_0_10px_#f97316]"></div>
              <div className="bg-[#111]/80 border border-orange-500/20 rounded-xl p-5 md:p-6 shadow-xl hover:-translate-y-1 transition duration-300">
                <span className="text-orange-500 text-xs md:text-sm font-semibold tracking-wider block mb-1">MAY 2026 - JUNE 2026</span>
                <h3 className="text-lg md:text-2xl font-bold text-white flex items-center gap-2">Frontend Web Developer Intern <span className="text-xs bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded border border-blue-500/20">Remote</span></h3>
                <h4 className="text-gray-400 font-medium text-sm md:text-base mb-3">CodeAlpha</h4>
                <p className="text-gray-300 text-xs md:text-sm leading-relaxed">Spearheading individual client-mimicked assignments, constructing standalone utility apps (Gallery, Calculators), and engineering clean JavaScript algorithms remotely.</p>
              </div>
            </div>

            {/* Timeline Item 3: IIUI */}
            <div className="relative pl-6 md:pl-8">
              <div className="absolute -left-[11px] top-1 bg-orange-500 w-5 h-5 rounded-full border-4 border-[#050505] shadow-[0_0_10px_#f97316]"></div>
              <div className="bg-[#111]/80 border border-orange-500/20 rounded-xl p-5 md:p-6 shadow-xl hover:-translate-y-1 transition duration-300">
                <span className="text-orange-500 text-xs md:text-sm font-semibold tracking-wider block mb-1">2024 - 2028 (Expected)</span>
                <h3 className="text-lg md:text-2xl font-bold text-white">BS Software Engineering</h3>
                <h4 className="text-gray-400 font-medium text-sm md:text-base mb-3">International Islamic University (IIUI) • Islamabad</h4>
                <p className="text-gray-300 text-xs md:text-sm leading-relaxed">Studying core OOP fundamentals, computational mathematics, data architecture structures, and general computer science methodologies to anchor modern system workflows.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. SKILLS SECTION */}
        <section id="skills" className="flex flex-col justify-center px-6 py-12 md:py-20 box-border">
          <div className="flex items-center justify-center gap-3 sm:gap-5 mb-10 md:mb-12">
            <div className="w-8 md:w-24 h-[2px] bg-orange-500"></div>
            <h2 className="text-2xl md:text-5xl font-bold text-center whitespace-nowrap">My Skills</h2>
            <div className="w-8 md:w-24 h-[2px] bg-orange-500"></div>
          </div>
          <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8 w-full">
            {skills.map((skill, index) => (
              <div key={index} className="bg-[#111]/80 backdrop-blur-sm border border-orange-500/20 hover:border-orange-500 hover:-translate-y-1 transition duration-300 rounded-xl md:rounded-2xl p-5 md:p-8 text-center shadow-xl">
                {skill.icon}
                <h3 className="text-sm md:text-xl font-bold whitespace-nowrap">{skill.name}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* 4. PROJECTS SECTION */}
        <section id="projects" className="flex flex-col justify-center max-w-7xl mx-auto px-6 py-12 md:py-20 box-border">
          <div className="flex items-center justify-center gap-3 sm:gap-5 mb-10 md:mb-12">
            <div className="w-8 md:w-24 h-[2px] bg-orange-500"></div>
            <h2 className="text-2xl md:text-5xl font-bold text-center whitespace-nowrap">My Projects</h2>
            <div className="w-8 md:w-24 h-[2px] bg-orange-500"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-6 md:gap-10">
            
            {/* Project 1 */}
            <div className="bg-[#111]/80 backdrop-blur-sm border border-orange-500/20 rounded-2xl md:rounded-3xl overflow-hidden shadow-xl">
              <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb" alt="gallery" className="w-full h-48 sm:h-64 object-cover" />
              <div className="p-5 md:p-8">
                <h3 className="text-xl md:text-3xl font-bold mb-3 whitespace-nowrap">Image Gallery</h3>
                <p className="text-gray-400 text-xs sm:text-base leading-relaxed mb-4 md:mb-6">Responsive image gallery with category filters and fullscreen mode.</p>
                <a href="https://code-alpha-image-gallery-mu.vercel.app/" target="_blank" rel="noreferrer" className="bg-orange-500 hover:bg-orange-600 px-5 py-2.5 rounded-xl transition duration-300 inline-block text-xs sm:text-base font-medium">Live Demo →</a>
              </div>
            </div>

            {/* Project 2 */}
            <div className="bg-[#111]/80 backdrop-blur-sm border border-orange-500/20 rounded-2xl md:rounded-3xl overflow-hidden shadow-xl">
              <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c" alt="calculator" className="w-full h-48 sm:h-64 object-cover" />
              <div className="p-5 md:p-8">
                <h3 className="text-xl md:text-3xl font-bold mb-3 whitespace-nowrap">Calculator App</h3>
                <p className="text-gray-400 text-xs sm:text-base leading-relaxed mb-4 md:mb-6">Modern calculator with keyboard support and responsive design.</p>
                <a href="https://code-alpha-calculator-pi.vercel.app/" target="_blank" rel="noreferrer" className="bg-orange-500 hover:bg-orange-600 px-5 py-2.5 rounded-xl transition duration-300 inline-block text-xs sm:text-base font-medium">Live Demo →</a>
              </div>
            </div>

            {/* Project 3 */}
            <div className="bg-[#111]/80 backdrop-blur-sm border border-orange-500/20 rounded-2xl md:rounded-3xl overflow-hidden shadow-xl">
              <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3" alt="hijri" className="w-full h-48 sm:h-64 object-cover" />
              <div className="p-5 md:p-8">
                <h3 className="text-xl md:text-3xl font-bold mb-3 whitespace-nowrap">Hijri Countdown</h3>
                <p className="text-gray-400 text-xs sm:text-base leading-relaxed mb-4 md:mb-6">Countdown website with modern UI and responsive design.</p>
                <a href="https://hijri-countdown.odoo.com/" target="_blank" rel="noreferrer" className="bg-orange-500 hover:bg-orange-600 px-5 py-2.5 rounded-xl transition duration-300 inline-block text-xs sm:text-base font-medium">Live Demo →</a>
              </div>
            </div>

            {/* Project 4 */}
            <div className="bg-[#111]/80 backdrop-blur-sm border border-orange-500/20 rounded-2xl md:rounded-3xl overflow-hidden shadow-xl">
              <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085" alt="portfolio" className="w-full h-48 sm:h-64 object-cover" />
              <div className="p-5 md:p-8">
                <h3 className="text-xl md:text-3xl font-bold mb-3 whitespace-nowrap">Personal Portfolio</h3>
                <p className="text-gray-400 text-xs sm:text-base leading-relaxed mb-4 md:mb-6">Personal portfolio website with responsive layout and modern UI.</p>
                <a href="https://personalportfolio1.odoo.com/" target="_blank" rel="noreferrer" className="bg-orange-500 hover:bg-orange-600 px-5 py-2.5 rounded-xl transition duration-300 inline-block text-xs sm:text-base font-medium">Live Demo →</a>
              </div>
            </div>

          </div>
        </section>

        {/* 5. CONTACT SECTION (🔥 UPDATED WITH PREMIUM EMAILJS WORKING CONTACT FORM) */}
        <section id="contact" className="flex flex-col justify-center max-w-5xl mx-auto px-6 py-12 pb-28 md:py-20 box-border">
          <div className="flex items-center justify-center gap-3 sm:gap-5 mb-10 md:mb-12">
            <div className="w-8 md:w-24 h-[2px] bg-orange-500"></div>
            <h2 className="text-2xl md:text-5xl font-bold text-center whitespace-nowrap">Contact Me</h2>
            <div className="w-8 md:w-24 h-[2px] bg-orange-500"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start w-full">
            {/* Left Column: Direct Info Cards */}
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4">
              <div className="bg-[#111]/80 backdrop-blur-sm border border-orange-500/20 rounded-xl p-5 text-center md:text-left hover:-translate-y-1 transition duration-300 overflow-hidden">
                <h3 className="text-lg font-bold mb-1 text-orange-500">Email</h3>
                <p className="text-gray-300 text-xs md:text-sm break-all selection:bg-orange-500">zubairzk2244@gmail.com</p>
              </div>
              
              <div className="bg-[#111]/80 backdrop-blur-sm border border-orange-500/20 rounded-xl p-5 text-center md:text-left hover:-translate-y-1 transition duration-300 overflow-hidden">
                <h3 className="text-lg font-bold mb-1 text-orange-500">Phone</h3>
                <p className="text-gray-300 text-xs md:text-sm break-all">+92 3207921826</p>
              </div>

              <a href="http://github.com/Zubair673" target="_blank" rel="noreferrer" className="bg-[#111]/80 backdrop-blur-sm border border-orange-500/20 rounded-xl p-5 text-center md:text-left hover:border-orange-500 hover:-translate-y-1 transition duration-300 flex flex-col md:flex-row items-center gap-3 overflow-hidden">
                <FaGithub className="text-2xl text-white flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-white hidden md:block">GitHub</h3>
                  <p className="text-gray-300 text-xs md:text-sm">github.com/Zubair673</p>
                </div>
              </a>

              <a href="https://www.linkedin.com/in/muhammad-zubair-rauf-607a063ab" target="_blank" rel="noreferrer" className="bg-[#111]/80 backdrop-blur-sm border border-orange-500/20 rounded-xl p-5 text-center md:text-left hover:border-orange-500 hover:-translate-y-1 transition duration-300 flex flex-col md:flex-row items-center gap-3 overflow-hidden">
                <FaLinkedin className="text-2xl text-blue-500 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-white hidden md:block">LinkedIn</h3>
                  <p className="text-gray-300 text-xs md:text-sm">Zubair Rauf</p>
                </div>
              </a>
            </div>

            {/* Right Column: Dynamic Form Area */}
            <div className="md:col-span-3 bg-[#111]/80 backdrop-blur-sm border border-orange-500/20 rounded-2xl p-6 md:p-8 shadow-2xl">
              <h3 className="text-xl font-bold mb-6 text-white tracking-wide">Send a Quick Message</h3>
              
              <form ref={formRef} onSubmit={handleFormSubmit} className="flex flex-col gap-5">
                <div>
                  <label className="text-xs font-semibold text-gray-400 block mb-2 tracking-wider uppercase">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Zubair Rauf"
                    className="w-full bg-[#0a0a0a] border border-orange-500/20 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition duration-300"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-400 block mb-2 tracking-wider uppercase">Your Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="zubair@example.com"
                    className="w-full bg-[#0a0a0a] border border-orange-500/20 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition duration-300"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-400 block mb-2 tracking-wider uppercase">Message</label>
                  <textarea
                    name="message"
                    required
                    rows="4"
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Hi Zubair, I looked at your portfolio and loved your projects..."
                    className="w-full bg-[#0a0a0a] border border-orange-500/20 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none resize-none transition duration-300"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-800 text-white font-bold py-3.5 rounded-xl text-sm transition duration-300 flex items-center justify-center gap-2 shadow-lg active:scale-95 disabled:scale-100 uppercase tracking-wider"
                >
                  {isSending ? (
                    <span>Sending Message...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <FaPaperPlane className="text-xs" />
                    </>
                  )}
                </button>

                {submitStatus.message && (
                  <div className={`mt-2 p-3 rounded-lg text-xs md:text-sm font-medium text-center ${submitStatus.success ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-rose-500/10 text-rose-400 border border-rose-500/20"}`}>
                    {submitStatus.message}
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>

      </div>

      {/* FOOTER */}
      <footer className="border-t border-orange-500/20 py-8 bg-[#0a0a0a]/90 backdrop-blur-md relative z-10 w-full">
        <div className="max-w-7xl mx-auto text-center px-6">
          <h3 className="text-xl md:text-3xl font-bold text-orange-500 mb-2 whitespace-nowrap">Muhammad Zubair Rauf</h3>
          <p className="text-gray-400 text-xs sm:text-base mb-4">Frontend Developer | Software Engineering Student at IIUI</p>
          
          <div className="flex justify-center gap-4 mb-6 md:hidden">
            <a href="http://github.com/Zubair673" target="_blank" rel="noreferrer" className="bg-[#111] border border-orange-500/30 text-gray-300 p-3 rounded-full text-lg active:scale-95 shadow-md">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/muhammad-zubair-rauf-607a063ab" target="_blank" rel="noreferrer" className="bg-[#111] border border-orange-500/30 text-blue-500 p-3 rounded-full text-lg active:scale-95 shadow-md">
              <FaLinkedin />
            </a>
          </div>

          <div className="flex justify-center gap-3 md:gap-6 flex-wrap mb-4 text-xs sm:text-base">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={`#${item.name.toLowerCase()}`}
                onClick={() => handleNavClick(item.name)}
                className={`transition duration-300 font-medium ${active === item.name ? "text-orange-500 font-bold scale-105" : "text-gray-400 hover:text-orange-400"}`}
              >
                {item.name}
              </a>
            ))}
          </div>
          <p className="text-gray-500 text-xs">© 2026 All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
}

export default App;