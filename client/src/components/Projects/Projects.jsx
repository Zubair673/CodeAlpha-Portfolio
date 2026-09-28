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
        "https://codealpha-portfolio-1.onrender.com/api/projects"
      );

      const data = await response.json();

      if (data.success) {
        setProjects(data.projects);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="projects"
      className="py-20 px-6 md:px-20 bg-themeBg text-themeText transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-themeText">
            Projects
          </h2>

          <p className="text-gray-600 dark:text-gray-400 text-lg mt-4">
            Recent MERN Stack & Frontend work.
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="text-center text-orange-500 text-xl py-10">
            Loading...
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">

            {/* No Projects */}
            {projects.length === 0 ? (
              <div className="col-span-full text-center text-gray-500 py-10">
                No Projects Found
              </div>
            ) : (

              /* Projects */
              projects.map((project) => (
                <div
                  key={project._id}
                  className="bg-themeCard rounded-xl overflow-hidden border border-orange-500/20 hover:border-orange-500 transition-all duration-300 p-3"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-32 object-cover rounded-lg"
                  />

                  <div className="mt-3">

                    {/* Featured */}
                    {project.featured && (
                      <span className="inline-block bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded mb-2">
                        FEATURED
                      </span>
                    )}

                    {/* Title */}
                    <h3 className="text-xl font-bold text-themeText">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-400 mt-1 leading-snug text-sm">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {project.technologies?.map((tech, index) => (
                        <span
                          key={index}
                          className="bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-2 mt-4">

                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 flex justify-center items-center gap-1.5 border border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white py-1.5 rounded text-sm transition"
                        >
                          <FaGithub size={14} />
                          Code
                        </a>
                      )}

                      {project.liveDemo && (
                        <a
                          href={project.liveDemo}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 flex justify-center items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white py-1.5 rounded text-sm transition"
                        >
                          <FaExternalLinkAlt size={12} />
                          Live
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