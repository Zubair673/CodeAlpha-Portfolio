import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // React icons se eye icons

const Settings = () => {
  const [settings, setSettings] = useState({
    siteTitle: "",
    footerText: "",
    copyrightText: "",
    newPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Password dikhane/chupane ke liye

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/settings");
      const data = await res.json();
      if (data.success && data.settings) {
        setSettings({ ...data.settings, newPassword: "" });
      }
    } catch (err) {
      console.log("Failed to load settings");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (data.success) {
        alert("Settings updated successfully!");
        setSettings({ ...settings, newPassword: "" });
      } else {
        alert("Failed to update: " + data.message);
      }
    } catch (err) {
      alert("Server error, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">Manage Settings</h1>

      <form onSubmit={handleUpdate} className="bg-[#111] p-8 rounded-2xl border border-gray-800">
        <label className="text-gray-400 block mb-2">Site Title</label>
        <input className="w-full p-4 mb-4 bg-[#1d1d1d] text-white rounded-lg border border-gray-700" value={settings.siteTitle || ""} onChange={(e) => setSettings({ ...settings, siteTitle: e.target.value })} />

        <label className="text-gray-400 block mb-2">Footer Text</label>
        <input className="w-full p-4 mb-4 bg-[#1d1d1d] text-white rounded-lg border border-gray-700" value={settings.footerText || ""} onChange={(e) => setSettings({ ...settings, footerText: e.target.value })} />

        <label className="text-gray-400 block mb-2">Copyright Text</label>
        <input className="w-full p-4 mb-4 bg-[#1d1d1d] text-white rounded-lg border border-gray-700" value={settings.copyrightText || ""} onChange={(e) => setSettings({ ...settings, copyrightText: e.target.value })} />

        {/* Password Reset Field with Show/Hide */}
        <label className="text-gray-400 block mb-2">Change Password</label>
        <div className="relative flex items-center mb-6">
          <input
            type={showPassword ? "text" : "password"} // Dynamic type
            className="w-full p-4 bg-[#1d1d1d] text-white rounded-lg border border-gray-700"
            value={settings.newPassword}
            onChange={(e) => setSettings({ ...settings, newPassword: e.target.value })}
            placeholder="New Password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 text-gray-400 hover:text-white"
          >
            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </button>
        </div>

        <button type="submit" disabled={loading} className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold">
          {loading ? "Updating..." : "Update Settings"}
        </button>
      </form>
    </div>
  );
};

export default Settings;