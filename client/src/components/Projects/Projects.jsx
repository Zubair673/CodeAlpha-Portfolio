import React, { useEffect, useState } from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const Projects = () => {

  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchProjects();

  }, []);

  const fetchProjects = async () => {

    try {

      const response = await fetch(
        "https://codealpha-portfolio-drii.onrender.com/api/projects"
      );

      const data = await response.json();

      if (data.success) {

        setProjects(data.projects);

      }

    }

    catch (error) {

      console.log(error);

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <section
      id="projects"
      className="py-14 md:py-16 px-6 md:px-20 bg-[#050505]"
    >

      <div className="max-w-6xl mx-auto">

        {/* Heading */}

        <div className="text-center mb-10">

          <h2 className="text-4xl md:text-5xl font-bold text-white">

            Projects

          </h2>

          <p className="text-gray-400 mt-3 max-w-2xl mx-auto">

            Some of my recent frontend and MERN Stack projects.

          </p>

        </div>

        {/* Loading */}

        {loading ? (

          <div className="text-center text-orange-500 text-xl py-20">

            Loading Projects...

          </div>

        ) : (

          <div className="grid md:grid-cols-2 gap-6">
                        {projects.length === 0 ? (

              <div className="col-span-2 text-center text-gray-400 py-16">

                No Projects Found

              </div>

            ) : (

              projects.map((project) => (

                <div
                  key={project._id}
                  className="bg-[#111] rounded-2xl overflow-hidden border border-orange-500/20 hover:border-orange-500 transition-all duration-300 hover:-translate-y-1"
                >

                  {/* Image */}

                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover hover:scale-105 transition duration-500"
                  />

                  <div className="p-5">

                    {project.featured && (

                      <span className="inline-block bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">

                        Featured

                      </span>

                    )}

                    <h3 className="text-xl font-bold text-white mb-3">

                      {project.title}

                    </h3>

                    <p className="text-gray-400 text-sm leading-6 mb-5">

                      {project.description}

                    </p>

                    {/* Technologies */}

                    <div className="flex flex-wrap gap-2 mb-5">

                      {project.technologies?.map((tech, index) => (

                        <span
                          key={index}
                          className="bg-orange-500/10 border border-orange-500/20 text-orange-400 px-3 py-1 rounded-full text-xs"
                        >

                          {tech}

                        </span>

                      ))}

                    </div>

                    {/* Buttons */}

                    <div className="flex gap-3">

                      {project.github && (

                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 flex justify-center items-center gap-2 border border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white py-2.5 rounded-lg transition"
                        >

                          <FaGithub />

                          GitHub

                        </a>

                      )}

                      {project.liveDemo && (

                        <a
                          href={project.liveDemo}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 flex justify-center items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-lg transition"
                        >

                          <FaExternalLinkAlt />

                          Live Demo

                        </a>

                      )}

                    </div>

                  </div>

                </div>

              ))

            )}

          </div>

        )}

      </div>
          </section>

  );

};

export default Projects;