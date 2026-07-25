import React, { useEffect, useState } from "react";

import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaGithub,
} from "react-icons/fa";

import {
  SiTailwindcss,
  SiExpress,
  SiMongodb,
} from "react-icons/si";

const API = "https://codealpha-portfolio-drii.onrender.com/api/skills";

// ==========================================
// Icon Mapping
// ==========================================

const iconMap = {

  html: <FaHtml5 className="text-6xl text-orange-500" />,

  css: <FaCss3Alt className="text-6xl text-blue-500" />,

  javascript: <FaJs className="text-6xl text-yellow-400" />,

  react: <FaReact className="text-6xl text-cyan-400" />,

  tailwind: (
    <SiTailwindcss className="text-6xl text-sky-400" />
  ),

  node: (
    <FaNodeJs className="text-6xl text-green-500" />
  ),

  express: (
    <SiExpress className="text-6xl text-gray-300" />
  ),

  mongodb: (
    <SiMongodb className="text-6xl text-green-600" />
  ),

  git: (
    <FaGitAlt className="text-6xl text-red-500" />
  ),

  github: (
    <FaGithub className="text-6xl text-white" />
  ),

};

const Skills = () => {

  const [skills, setSkills] = useState([]);

  // ==========================================
  // Fetch Skills
  // ==========================================

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {

    try {

      const response = await fetch(API);

      const data = await response.json();

      if (data.success) {

        setSkills(data.skills);

      }

    } catch (error) {

      console.log(error);

    }

  };

  // ==========================================
  // Get Icon
  // ==========================================

  const getIcon = (icon) => {

    if (!icon) {

      return (
        <FaReact className="text-6xl text-cyan-400" />
      );

    }

    return (
      iconMap[icon.toLowerCase()] ||
      <FaReact className="text-6xl text-cyan-400" />
    );

  };

  return (
        <section
      id="skills"
      className="bg-[#050505] py-20 px-6 md:px-20"
    >

      <div className="max-w-7xl mx-auto">

        {/* Heading */}

        <div className="text-center mb-12">

          <h2 className="text-5xl md:text-6xl font-bold text-white">
            Skills
          </h2>

          <p className="text-gray-400 text-lg mt-4 max-w-3xl mx-auto">
            Technologies I use to build modern, responsive and scalable web
            applications.
          </p>

        </div>

        {/* Skills */}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">

          {skills.length > 0 ? (

            skills.map((skill) => (

              <div
                key={skill._id}
                className="group bg-[#111] border border-orange-500/20 rounded-2xl p-7 text-center hover:border-orange-500 hover:-translate-y-1 transition-all duration-300"
              >

                <div className="flex justify-center mb-5 group-hover:scale-110 transition duration-300">

                  {getIcon(skill.icon)}

                </div>

                <h3 className="text-white font-semibold text-lg">

                  {skill.name}

                </h3>

                {/* Category */}

                <p className="text-orange-400 text-sm mt-2">

                  {skill.category}

                </p>

                {/* Percentage */}

                <div className="mt-5">

                  <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">

                    <div
                      className="bg-orange-500 h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${skill.percentage}%`,
                      }}
                    ></div>

                  </div>

                  <p className="text-gray-400 text-sm mt-2">

                    {skill.percentage}%

                  </p>

                </div>

              </div>

            ))

          ) : (

            <div className="col-span-full text-center py-16">

              <h3 className="text-2xl text-gray-400">

                No Skills Found

              </h3>

            </div>

          )}

        </div>

        {/* Bottom */}

        <div className="mt-12 text-center">

          <span className="inline-block px-7 py-3 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 font-medium">

            🚀 Always Learning New Technologies

          </span>

        </div>

      </div>

    </section>

  );

};

export default Skills;