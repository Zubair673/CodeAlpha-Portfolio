import { useState, useEffect } from "react";

const API = "https://codealpha-portfolio-drii.onrender.com/api/about";

const About = () => {
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(false);

  const [preview, setPreview] = useState("");

  const [about, setAbout] = useState({
    title: "",
    description: "",
    education: "",
    university: "",
    location: "",
    goal: "",
    experience: "",
    projects: "",
    image: null,
  });

  // ==========================================
  // Fetch About Data
  // ==========================================

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      const response = await fetch(API);

      const data = await response.json();

      if (data.success) {
        setAbout({
          title: data.about.title || "",
          description: data.about.description || "",
          education: data.about.education || "",
          university: data.about.university || "",
          location: data.about.location || "",
          goal: data.about.goal || "",
          experience: data.about.experience || "",
          projects: data.about.projects || "",
          image: null,
        });

        setPreview(data.about.image || "");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ==========================================
  // Handle Input
  // ==========================================

  const handleChange = (e) => {
    setAbout({
      ...about,
      [e.target.name]: e.target.value,
    });
  };

  // ==========================================
  // Handle Image
  // ==========================================

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setAbout({
      ...about,
      image: file,
    });

    setPreview(URL.createObjectURL(file));
  };

  // ==========================================
  // Submit
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("title", about.title);
      formData.append("description", about.description);
      formData.append("education", about.education);
      formData.append("university", about.university);
      formData.append("location", about.location);
      formData.append("goal", about.goal);
      formData.append("experience", about.experience);
      formData.append("projects", about.projects);

      if (about.image) {
        formData.append("image", about.image);
      }

      const response = await fetch(API, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        alert("About Section Updated Successfully");
        fetchAbout();
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
    <div className="max-w-4xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-8 text-white">
        Edit About Section
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-[#111] border border-gray-800 rounded-2xl p-8 shadow-xl"
      >

        {/* Image Upload */}

        <div className="mb-8">

          <label className="block text-gray-400 mb-2">
            About Section Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="w-full bg-[#1d1d1d] text-gray-300 p-3 rounded-lg border border-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-orange-500 file:text-white hover:file:bg-orange-600"
          />

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-5 w-64 rounded-xl border border-orange-500"
            />
          )}

        </div>
                <InputGroup
          label="Title"
          name="title"
          value={about.title}
          onChange={handleChange}
          placeholder="Frontend Developer"
        />

        <TextAreaGroup
          label="Description"
          name="description"
          value={about.description}
          onChange={handleChange}
          rows={6}
          placeholder="Write about yourself..."
        />

        <div className="grid md:grid-cols-2 gap-6">

          <InputGroup
            label="Education"
            name="education"
            value={about.education}
            onChange={handleChange}
            placeholder="BS Software Engineering"
          />

          <InputGroup
            label="University"
            name="university"
            value={about.university}
            onChange={handleChange}
            placeholder="International Islamic University Islamabad"
          />

        </div>

        <InputGroup
          label="Location"
          name="location"
          value={about.location}
          onChange={handleChange}
          placeholder="Islamabad, Pakistan"
        />

        <InputGroup
          label="Experience"
          name="experience"
          value={about.experience}
          onChange={handleChange}
          placeholder="3 Frontend Internships"
        />

        <InputGroup
          label="Projects"
          name="projects"
          value={about.projects}
          onChange={handleChange}
          placeholder="Portfolio, MERN & Academic Projects"
        />

        <TextAreaGroup
          label="Career Goal"
          name="goal"
          value={about.goal}
          onChange={handleChange}
          rows={4}
          placeholder="Become a Professional MERN Stack Developer..."
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-500 hover:bg-orange-600 transition duration-300 py-4 rounded-xl font-bold text-lg text-white disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>

      </form>

    </div>
  );
};

// ==========================================
// Helper Components
// ==========================================

const InputGroup = ({
  label,
  name,
  value,
  onChange,
  placeholder,
}) => (
  <div className="mb-6">

    <label className="block text-gray-400 mb-2">
      {label}
    </label>

    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-[#1d1d1d] p-4 rounded-lg outline-none border border-gray-700 focus:border-orange-500 text-white"
    />

  </div>
);

const TextAreaGroup = ({
  label,
  name,
  value,
  onChange,
  rows,
  placeholder,
}) => (
  <div className="mb-6">

    <label className="block text-gray-400 mb-2">
      {label}
    </label>

    <textarea
      rows={rows}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-[#1d1d1d] p-4 rounded-lg outline-none border border-gray-700 focus:border-orange-500 text-white resize-none"
    />

  </div>
);

export default About;