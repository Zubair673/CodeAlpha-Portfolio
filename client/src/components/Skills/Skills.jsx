import React, { useEffect, useState } from "react";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGitAlt, FaGithub, FaBootstrap } from "react-icons/fa";
import { SiTailwindcss, SiExpress, SiMongodb, SiTypescript, SiNextdotjs, SiPostgresql, SiFirebase, SiDocker, SiRedux, SiFigma } from "react-icons/si";

const API = "https://lucid-caring-production-a6e4.up.railway.app/api/skills";

const iconMap = {
  html: <FaHtml5 className="text-4xl text-orange-500" />,
  css: <FaCss3Alt className="text-4xl text-blue-500" />,
  javascript: <FaJs className="text-4xl text-yellow-400" />,
  react: <FaReact className="text-4xl text-cyan-400" />,
  tailwind: <SiTailwindcss className="text-4xl text-sky-400" />,
  node: <FaNodeJs className="text-4xl text-green-500" />,
  express: <SiExpress className="text-4xl text-gray-300" />,
  mongodb: <SiMongodb className="text-4xl text-green-600" />,
  git: <FaGitAlt className="text-4xl text-red-500" />,
  github: <FaGithub className="text-4xl text-white" />,
  typescript: <SiTypescript className="text-4xl text-blue-600" />,
  next: <SiNextdotjs className="text-4xl text-white" />,
  postgres: <SiPostgresql className="text-4xl text-blue-400" />,
  firebase: <SiFirebase className="text-4xl text-yellow-500" />,
  docker: <SiDocker className="text-4xl text-blue-500" />,
  redux: <SiRedux className="text-4xl text-purple-500" />,
  bootstrap: <FaBootstrap className="text-4xl text-purple-600" />,
  figma: <SiFigma className="text-4xl text-pink-500" />,
};

const Skills = () => {
  const [skills, setSkills] = useState([]);

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

  const getIcon = (iconName) => {
    if (!iconName) return <FaReact className="text-4xl text-cyan-400" />;
    const normalizedName = iconName.toLowerCase().trim();
    return iconMap[normalizedName] || <FaReact className="text-4xl text-cyan-400" />;
  };

  return (
    <section id="skills" className="bg-[#050505] py-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white">Skills</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {skills.map((skill) => (
            <div key={skill._id} className="bg-[#111] border border-orange-500/20 rounded-xl p-4 text-center hover:border-orange-500 transition-all duration-300">
              <div className="flex justify-center mb-3">
                {getIcon(skill.icon)}
              </div>
              <h3 className="text-white font-semibold text-sm">{skill.name}</h3>
              <div className="mt-3 w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
                <div className="bg-orange-500 h-full rounded-full" style={{ width: `${skill.percentage}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;