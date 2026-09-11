import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  
  // Render URL set kiya hai
  const API_URL = "https://codealpha-portfolio-1.onrender.com";

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

  // Fix: fetchProject ko useEffect ke andar rakha hai
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`${API_URL}/api/projects/${id}`);
        const data = await response.json();

        if (data.success) {
          setProject({
            title: data.project.title,
            description: data.project.description,
            github: data.project.github,
            liveDemo: data.project.liveDemo,
            technologies: data.project.technologies.join(", "),
            featured: data.project.featured,
          });

          setPreview(data.project.image);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProject();
  }, [id]); // 'id' dependency add ki hai

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

      const response = await fetch(`${API_URL}/api/projects/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        alert("Project Updated Successfully");
        navigate("/dashboard/projects");
      } else {
        alert(data.message);
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
      <h1 className="text-4xl font-bold mb-10">Edit Project</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-[#111] p-8 rounded-3xl border border-orange-500/20"
      >
        <input
          type="text"
          name="title"
          value={project.title}
          onChange={handleChange}
          placeholder="Project Title"
          className="w-full p-4 rounded-xl bg-[#1b1b1b]"
        />

        <textarea
          rows="5"
          name="description"
          value={project.description}
          onChange={handleChange}
          placeholder="Project Description"
          className="w-full p-4 rounded-xl bg-[#1b1b1b]"
        />

        <div>
          <label className="block mb-2 font-medium">Project Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-3 rounded-xl bg-[#1b1b1b]"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-5 w-72 rounded-xl border border-orange-500/20"
            />
          )}
        </div>

        <input
          type="text"
          name="github"
          value={project.github}
          onChange={handleChange}
          placeholder="GitHub URL"
          className="w-full p-4 rounded-xl bg-[#1b1b1b]"
        />

        <input
          type="text"
          name="liveDemo"
          value={project.liveDemo}
          onChange={handleChange}
          placeholder="Live Demo URL"
          className="w-full p-4 rounded-xl bg-[#1b1b1b]"
        />

        <input
          type="text"
          name="technologies"
          value={project.technologies}
          onChange={handleChange}
          placeholder="React, Node.js, Express..."
          className="w-full p-4 rounded-xl bg-[#1b1b1b]"
        />

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            name="featured"
            checked={project.featured}
            onChange={handleChange}
          />
          Featured Project
        </label>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 rounded-xl font-semibold transition ${
            loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600"
          }`}
        >
          {loading ? "Updating..." : "Update Project"}
        </button>
      </form>
    </div>
  );
};

export default EditProject;