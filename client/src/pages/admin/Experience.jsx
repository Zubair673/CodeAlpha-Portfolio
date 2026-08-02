import { useState, useEffect } from "react";

const API = "lucid-caring-production-a6e4.up.railway.app/api/experience";

const Experience = () => {

  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [experiences, setExperiences] = useState([]);

  const [experience, setExperience] = useState({
    title: "",
    company: "",
    duration: "",
    description: "",
    icon: "work",
  });

  // ==========================================
  // Fetch Experience
  // ==========================================

  useEffect(() => {
    fetchExperience();
  }, []);

  const fetchExperience = async () => {

    try {

      const response = await fetch(API);

      const data = await response.json();

      if (data.success) {
        setExperiences(data.experiences || []);
      }

    } catch (error) {

      console.log(error);

    }

  };

  // ==========================================
  // Handle Change
  // ==========================================

  const handleChange = (e) => {

    setExperience({
      ...experience,
      [e.target.name]: e.target.value,
    });

  };

  // ==========================================
  // Add / Update Experience
  // ==========================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const response = await fetch(
        editingId ? `${API}/${editingId}` : API,
        {
          method: editingId ? "PUT" : "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(experience),
        }
      );

      const data = await response.json();

      if (data.success) {

        alert(
          editingId
            ? "Experience Updated Successfully"
            : "Experience Added Successfully"
        );

        setExperience({
          title: "",
          company: "",
          duration: "",
          description: "",
          icon: "work",
        });

        setEditingId(null);

        fetchExperience();

      } else {

        alert(data.message);

      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };
    // ==========================================
  // Edit Experience
  // ==========================================

  const handleEdit = (item) => {

    setEditingId(item._id);

    setExperience({
      title: item.title,
      company: item.company,
      duration: item.duration,
      description: item.description,
      icon: item.icon,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };

  // ==========================================
  // Delete Experience
  // ==========================================

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this experience?"
    );

    if (!confirmDelete) return;

    try {

      const response = await fetch(`${API}/${id}`, {
        method: "DELETE",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {

        alert("Experience Deleted Successfully");

        fetchExperience();

      } else {

        alert(data.message);

      }

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-3xl font-bold text-white mb-8">
        Experience Management
      </h1>

      {/* Form */}

      <form
        onSubmit={handleSubmit}
        className="bg-[#111] border border-gray-800 rounded-2xl p-8 mb-10"
      >

        <div className="grid md:grid-cols-2 gap-6">

          <InputGroup
            label="Job Title"
            name="title"
            value={experience.title}
            onChange={handleChange}
            placeholder="Frontend Developer Intern"
          />

          <InputGroup
            label="Company"
            name="company"
            value={experience.company}
            onChange={handleChange}
            placeholder="CodeAlpha • Remote"
          />

          <InputGroup
            label="Duration"
            name="duration"
            value={experience.duration}
            onChange={handleChange}
            placeholder="May 2026 - June 2026"
          />

          <div>

            <label className="block text-gray-400 mb-2">
              Icon
            </label>

            <select
              name="icon"
              value={experience.icon}
              onChange={handleChange}
              className="w-full bg-[#1d1d1d] p-4 rounded-lg border border-gray-700 text-white"
            >

              <option value="work">
                Work
              </option>

              <option value="education">
                Education
              </option>

            </select>

          </div>

        </div>

        <div className="mt-6">

          <label className="block text-gray-400 mb-2">
            Description
          </label>

          <textarea
            rows="5"
            name="description"
            value={experience.description}
            onChange={handleChange}
            placeholder="Describe your responsibilities..."
            className="w-full bg-[#1d1d1d] p-4 rounded-lg border border-gray-700 text-white resize-none"
          />

        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 bg-orange-500 hover:bg-orange-600 py-4 rounded-xl font-bold text-white"
        >

          {loading
            ? "Saving..."
            : editingId
            ? "Update Experience"
            : "Save Experience"}

        </button>

      </form>

      {/* Table */}

      <div className="bg-[#111] rounded-2xl border border-gray-800 overflow-hidden">

        <table className="w-full">

          <thead className="bg-[#1b1b1b]">

            <tr>

              <th className="p-4 text-left">
                Title
              </th>

              <th className="p-4 text-left">
                Company
              </th>

              <th className="p-4 text-left">
                Duration
              </th>

              <th className="p-4 text-left">
                Icon
              </th>

              <th className="p-4 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {experiences.length > 0 ? (

              experiences.map((item) => (

                <tr
                  key={item._id}
                  className="border-t border-gray-800"
                >

                  <td className="p-4">
                    {item.title}
                  </td>

                  <td className="p-4">
                    {item.company}
                  </td>

                  <td className="p-4">
                    {item.duration}
                  </td>

                  <td className="p-4 capitalize">
                    {item.icon}
                  </td>

                  <td className="p-4 flex justify-center gap-3">

                    <button
                      onClick={() => handleEdit(item)}
                      className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="5"
                  className="text-center p-8 text-gray-500"
                >
                  No Experience Found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

};

const InputGroup = ({
  label,
  name,
  value,
  onChange,
  placeholder,
}) => (

  <div>

    <label className="block text-gray-400 mb-2">
      {label}
    </label>

    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-[#1d1d1d] p-4 rounded-lg border border-gray-700 text-white"
    />

  </div>

);

export default Experience;