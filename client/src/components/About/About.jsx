import React, { useEffect, useState, useCallback } from "react";
import {
  FaGraduationCap,
  FaLaptopCode,
  FaFolderOpen,
  FaMapMarkerAlt,
} from "react-icons/fa";

const API = "http://localhost:5000/api/about";

const About = () => {
  const [about, setAbout] = useState({
    title: "",
    description: "",
    education: "",
    university: "",
    location: "",
    goal: "",
    image: "",
    experience: "",
    projects: "",
  });

  // ==========================================
  // Fetch About Data (Memoized)
  // ==========================================
  const fetchAbout = useCallback(async () => {
    try {
      const response = await fetch(API);
      const data = await response.json();
      if (data.success) {
        setAbout(data.about);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchAbout();
  }, [fetchAbout]);

  return (
    <section id="about" className="bg-[#050505] py-10 md:py-12 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white">About Me</h2>
          <p className="text-gray-400 mt-3">A short introduction about who I am.</p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side */}
          <div>
            <span className="text-orange-500 font-semibold uppercase tracking-wider">
              Who Am I?
            </span>
            <h3 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-5 leading-tight">
              {about.title}
            </h3>
            <p className="text-gray-400 leading-8 mb-5">{about.description}</p>
            <p className="text-gray-400 leading-8 mb-8">{about.goal}</p>
            <a
              href="#contact"
              className="inline-block bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-xl font-semibold transition duration-300 hover:scale-105"
            >
              Let's Connect
            </a>
          </div>

          {/* Right Side (Corrected Structure) */}
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="bg-[#111] rounded-2xl p-6 border border-orange-500/20 hover:border-orange-500 hover:-translate-y-1 transition-all duration-300">
              <FaGraduationCap className="text-3xl text-orange-500 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Education</h3>
              <p className="text-gray-400 text-sm leading-7">
                {about.education}
                <br />
                {about.university}
              </p>
            </div>

            <div className="bg-[#111] rounded-2xl p-6 border border-orange-500/20 hover:border-orange-500 hover:-translate-y-1 transition-all duration-300">
              <FaLaptopCode className="text-3xl text-orange-500 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Experience</h3>
              <p className="text-gray-400 text-sm leading-7">{about.experience}</p>
            </div>

            <div className="bg-[#111] rounded-2xl p-6 border border-orange-500/20 hover:border-orange-500 hover:-translate-y-1 transition-all duration-300">
              <FaFolderOpen className="text-3xl text-orange-500 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Projects</h3>
              <p className="text-gray-400 text-sm leading-7">{about.projects}</p>
            </div>

            <div className="bg-[#111] rounded-2xl p-6 border border-orange-500/20 hover:border-orange-500 hover:-translate-y-1 transition-all duration-300">
              <FaMapMarkerAlt className="text-3xl text-orange-500 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Location</h3>
              <p className="text-gray-400 text-sm leading-7">{about.location}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;