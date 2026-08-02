import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddProject = () => {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(false);

  const [project, setProject] = useState({
    title: "",
    description: "",
    github: "",
    liveDemo: "",
    technologies: "",
    featured: false,
  });

  const [image, setImage] = useState(null);

  const [preview, setPreview] = useState("");

  useEffect(() => {

    return () => {

      if (preview) {

        URL.revokeObjectURL(preview);

      }

    };

  }, [preview]);

  const handleChange = (e) => {

    const { name, value, checked, type } = e.target;

    setProject({

      ...project,

      [name]: type === "checkbox" ? checked : value,

    });

  };

  const handleImageChange = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {

      alert("Please select a valid image.");

      return;

    }

    if (file.size > 5 * 1024 * 1024) {

      alert("Image size should be less than 5MB.");

      return;

    }

    setImage(file);

    setPreview(URL.createObjectURL(file));

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const formData = new FormData();

      formData.append("title", project.title);

      formData.append("description", project.description);

      formData.append("github", project.github);

      formData.append("liveDemo", project.liveDemo);

      formData.append(
        "technologies",
        JSON.stringify(
          project.technologies
            .split(",")
            .map((item) => item.trim())
        )
      );

      formData.append("featured", project.featured);

      if (image) {

        formData.append("image", image);

      }

      const response = await fetch(

        "https://lucid-caring-production-a6e4.up.railway.app/api/projects",

        {

          method: "POST",

          headers: {

            Authorization: `Bearer ${token}`,

          },

          body: formData,

        }

      );

      const data = await response.json();

      if (data.success) {

        alert("Project Added Successfully");

        navigate("/dashboard/projects");

      } else {

        alert(data.message || "Failed to add project");

      }

    } catch (error) {

      console.log(error);

      alert("Something went wrong");

    } finally {

      setLoading(false);

    }

  };
    return (

    <div className="max-w-4xl mx-auto">

      <h1 className="text-4xl font-bold mb-10">
        Add New Project
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-[#111] p-8 rounded-3xl border border-orange-500/20"
      >

        {/* Project Title */}

        <input
          type="text"
          name="title"
          placeholder="Project Title"
          required
          value={project.title}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-[#1b1b1b] text-white border border-transparent focus:border-orange-500 outline-none"
        />

        {/* Description */}

        <textarea
          rows="5"
          name="description"
          placeholder="Project Description"
          required
          value={project.description}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-[#1b1b1b] text-white border border-transparent focus:border-orange-500 outline-none"
        />

        {/* Image Upload */}

        <div>

          <label className="block mb-3 font-medium text-white">
            Project Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-3 rounded-xl bg-[#1b1b1b] text-gray-400
            file:mr-4
            file:py-2
            file:px-5
            file:rounded-full
            file:border-0
            file:bg-orange-500
            file:text-white
            file:cursor-pointer"
          />

          {preview && (

            <img
              src={preview}
              alt="Preview"
              className="mt-6 w-full max-w-sm rounded-xl border border-orange-500/20"
            />

          )}

        </div>

        {/* Github */}

        <input
          type="url"
          name="github"
          placeholder="GitHub URL"
          value={project.github}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-[#1b1b1b] text-white border border-transparent focus:border-orange-500 outline-none"
        />

        {/* Live Demo */}

        <input
          type="url"
          name="liveDemo"
          placeholder="Live Demo URL"
          value={project.liveDemo}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-[#1b1b1b] text-white border border-transparent focus:border-orange-500 outline-none"
        />

        {/* Technologies */}

        <input
          type="text"
          name="technologies"
          placeholder="React, Node.js, Express, MongoDB"
          value={project.technologies}
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-[#1b1b1b] text-white border border-transparent focus:border-orange-500 outline-none"
        />

        {/* Featured */}

        <label className="flex items-center gap-3 cursor-pointer">

          <input
            type="checkbox"
            name="featured"
            checked={project.featured}
            onChange={handleChange}
            className="w-5 h-5 accent-orange-500"
          />

          <span className="text-white">
            Featured Project
          </span>

        </label>

        {/* Submit */}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 rounded-xl font-semibold transition duration-300 ${
            loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600"
          }`}
        >

          {loading ? "Adding Project..." : "Add Project"}

        </button>

      </form>

    </div>

  );

};

export default AddProject;