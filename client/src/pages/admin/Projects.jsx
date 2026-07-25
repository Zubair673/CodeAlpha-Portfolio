import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaStar,
} from "react-icons/fa";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/projects"
      );

      const data = await response.json();

      if (data.success) {
        setProjects(data.projects);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProject = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this project?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/projects/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        fetchProjects();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div>
      {/* Header */}

      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold">
          Manage Projects
        </h1>

        <Link
          to="/dashboard/add-project"
          className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-xl flex items-center gap-3 transition"
        >
          <FaPlus />
          Add Project
        </Link>
      </div>

      {/* Table */}

      <div className="overflow-x-auto rounded-2xl border border-orange-500/20">
        <table className="w-full">
          <thead className="bg-[#111]">
            <tr>
              <th className="p-4 text-left">
                Image
              </th>

              <th className="p-4 text-left">
                Title
              </th>

              <th className="p-4 text-left">
                Featured
              </th>

              <th className="p-4 text-left">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {projects.length > 0 ? (
              projects.map((project) => (
                <tr
                  key={project._id}
                  className="border-t border-orange-500/10"
                >
                  <td className="p-4">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-24 h-16 rounded object-cover"
                    />
                  </td>

                  <td className="p-4">
                    {project.title}
                  </td>

                  <td className="p-4">
                    {project.featured ? (
                      <FaStar className="text-yellow-400 text-xl" />
                    ) : (
                      "-"
                    )}
                  </td>

                  <td className="p-4">
                    <div className="flex gap-3">
                      <Link
                        to={`/dashboard/edit-project/${project._id}`}
                        className="bg-blue-600 hover:bg-blue-700 p-3 rounded-lg transition"
                      >
                        <FaEdit />
                      </Link>

                      <button
                        onClick={() =>
                          deleteProject(project._id)
                        }
                        className="bg-red-600 hover:bg-red-700 p-3 rounded-lg transition"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-10 text-gray-400"
                >
                  No Projects Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Projects;