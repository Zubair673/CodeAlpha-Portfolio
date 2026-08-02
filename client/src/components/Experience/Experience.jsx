import React, { useEffect, useState } from "react";
import { FaBriefcase, FaGraduationCap } from "react-icons/fa";

const API = "lucid-caring-production-a6e4.up.railway.app/api/experience";

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const response = await fetch(API);
      const data = await response.json();

      console.log(data);

      if (data.success) {
        setExperiences(data.experiences || []);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="experience"
      className="py-10 md:py-12 px-6 md:px-20 bg-[#050505]"
    >
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Experience
          </h2>

          <p className="text-gray-400 mt-3">
            My internships and academic journey.
          </p>
        </div>

        <div className="relative border-l-2 border-orange-500/30 ml-4 md:ml-8">

          {loading ? (

            <p className="text-white ml-10">Loading...</p>

          ) : experiences.length > 0 ? (

            experiences.map((item) => (

              <div
                key={item._id}
                className="relative pl-10 pb-6"
              >

                <div className="absolute -left-[18px] top-6 w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white shadow-lg">
                  {item.icon === "education" ? (
                    <FaGraduationCap />
                  ) : (
                    <FaBriefcase />
                  )}
                </div>

                <div className="bg-[#111] border border-orange-500/20 rounded-2xl p-6 hover:border-orange-500 hover:-translate-y-1 transition-all duration-300">

                  <span className="text-orange-400 text-sm font-semibold">
                    {item.duration}
                  </span>

                  <h3 className="text-2xl font-bold text-white mt-2">
                    {item.title}
                  </h3>

                  <p className="text-orange-400 mt-1">
                    {item.company}
                  </p>

                  <p className="text-gray-400 leading-7 mt-4">
                    {item.description}
                  </p>

                </div>

              </div>

            ))

          ) : (

            <div className="text-center py-10">
              <p className="text-gray-500">
                No Experience Added Yet.
              </p>
            </div>

          )}

        </div>

      </div>
    </section>
  );
};

export default Experience;