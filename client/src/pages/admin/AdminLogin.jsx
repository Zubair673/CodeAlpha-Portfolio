import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      // Console mein check karein ke token aa raha hai ya nahi
      console.log("Login Response Data:", data);

      if (data.success) {
        // Token save karna
        localStorage.setItem("token", data.token);
        localStorage.setItem("admin", JSON.stringify(data.user));

        // Correct route: /dashboard
        navigate("/dashboard");
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Server Error - Could not connect");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-[#111]/80 border border-orange-500/20 rounded-3xl p-8">
        <h1 className="text-4xl font-bold text-center text-orange-500 mb-8">
          Admin Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-4 rounded-xl bg-[#1b1b1b] border border-orange-500/20 outline-none text-white"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-4 rounded-xl bg-[#1b1b1b] border border-orange-500/20 outline-none text-white"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 py-4 rounded-xl font-semibold transition"
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;