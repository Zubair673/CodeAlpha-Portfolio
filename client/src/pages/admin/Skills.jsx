import { useState, useEffect } from "react";

const API = "lucid-caring-production-a6e4.up.railway.app/api/skills";

const Skills = () => {

  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(false);

  const [skills, setSkills] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [skill, setSkill] = useState({
    name: "",
    icon: "",
    category: "",
    percentage: "",
  });

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
  // Handle Change
  // ==========================================

  const handleChange = (e) => {

    setSkill({
      ...skill,
      [e.target.name]: e.target.value,
    });

  };

  // ==========================================
  // Save / Update Skill
  // ==========================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const response = await fetch(

        editingId
          ? `${API}/${editingId}`
          : API,

        {
          method: editingId ? "PUT" : "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(skill),

        }

      );

      const data = await response.json();

      if (data.success) {

        alert(
          editingId
            ? "Skill Updated Successfully"
            : "Skill Added Successfully"
        );

        setSkill({
          name: "",
          icon: "",
          category: "",
          percentage: "",
        });

        setEditingId(null);

        fetchSkills();

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
  // Edit Skill
  // ==========================================

  const handleEdit = (item) => {

    setEditingId(item._id);

    setSkill({

      name: item.name,

      icon: item.icon,

      category: item.category,

      percentage: item.percentage,

    });

    window.scrollTo({

      top: 0,

      behavior: "smooth",

    });

  };

  // ==========================================
  // Delete Skill
  // ==========================================

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this skill?"
    );

    if (!confirmDelete) return;

    try {

      const response = await fetch(
        `${API}/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {

        alert("Skill Deleted Successfully");

        fetchSkills();

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
        Skills Management
      </h1>

      {/* Form */}

      <form
        onSubmit={handleSubmit}
        className="bg-[#111] border border-gray-800 rounded-2xl p-8 mb-10"
      >

        <div className="grid md:grid-cols-2 gap-6">

          <InputGroup
            label="Skill Name"
            name="name"
            value={skill.name}
            onChange={handleChange}
            placeholder="React.js"
          />

          <InputGroup
            label="Icon"
            name="icon"
            value={skill.icon}
            onChange={handleChange}
            placeholder="react"
          />

          <div>

            <label className="block text-gray-400 mb-2">
              Category
            </label>

            <select
              name="category"
              value={skill.category}
              onChange={handleChange}
              className="w-full bg-[#1d1d1d] p-4 rounded-lg border border-gray-700 text-white"
            >

              <option value="">Select</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Database">Database</option>
              <option value="Tools">Tools</option>

            </select>

          </div>

          <InputGroup
            label="Percentage"
            name="percentage"
            type="number"
            value={skill.percentage}
            onChange={handleChange}
            placeholder="90"
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
            ? "Update Skill"
            : "Save Skill"}

        </button>

      </form>

      {/* Skills Table */}

      <div className="bg-[#111] rounded-2xl border border-gray-800 overflow-hidden">

        <table className="w-full">

          <thead className="bg-[#1b1b1b]">

            <tr>

              <th className="p-4 text-left">Skill</th>

              <th className="p-4 text-left">Category</th>

              <th className="p-4 text-left">Icon</th>

              <th className="p-4 text-left">Percentage</th>

              <th className="p-4 text-center">Actions</th>

            </tr>

          </thead>

          <tbody>

            {skills.length > 0 ? (

              skills.map((item) => (

                <tr
                  key={item._id}
                  className="border-t border-gray-800"
                >

                  <td className="p-4">
                    {item.name}
                  </td>

                  <td className="p-4">
                    {item.category}
                  </td>

                  <td className="p-4">
                    {item.icon}
                  </td>

                  <td className="p-4">
                    {item.percentage}%
                  </td>

                  <td className="p-4">

                    <div className="flex justify-center gap-3">

                      <button
                        onClick={() => handleEdit(item)}
                        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-white"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(item._id)}
                        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white"
                      >
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="5"
                  className="text-center py-8 text-gray-400"
                >
                  No Skills Found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

};

// ==========================================
// Helper Component
// ==========================================

const InputGroup = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}) => (

  <div>

    <label className="block text-gray-400 mb-2">
      {label}
    </label>

    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-[#1d1d1d] p-4 rounded-lg border border-gray-700 text-white"
    />

  </div>

);

export default Skills;