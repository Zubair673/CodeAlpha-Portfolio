import React, { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaPaperPlane } from "react-icons/fa";

const Contact = () => {
  const [contactInfo, setContactInfo] = useState({
    email: "",
    phone: "",
    github: "",
    linkedin: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://codealpha-portfolio-1.onrender.com/api/contact")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.contact) {
          setContactInfo(data.contact);
        }
      })
      .catch((err) => console.log("Error loading contact:", err));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const response = await fetch("https://codealpha-portfolio-1.onrender.com/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess("Message Sent Successfully 🚀");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setError(data.message || "Something went wrong!");
      }
    } catch (err) {
      setError("Server connection failed. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <section id="contact" className="max-w-6xl mx-auto px-6 py-20 bg-themeBg text-themeText transition-colors duration-300">
      {/* Heading */}
      <div className="flex items-center justify-center gap-5 mb-14">
        <div className="w-10 md:w-24 h-[2px] bg-orange-500"></div>
        <h2 className="text-3xl md:text-5xl font-bold text-themeText">Contact Me</h2>
        <div className="w-10 md:w-24 h-[2px] bg-orange-500"></div>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Left Side */}
        <div>
          <h3 className="text-3xl font-bold mb-5 text-themeText">Let's Work Together</h3>
          <p className="text-gray-600 dark:text-gray-400 leading-8 mb-8">
            Have an idea or project? Feel free to contact me. I'm always open to
            internships, freelance work and collaborations.
          </p>

          <div className="space-y-5">
            <div>
              <h4 className="text-orange-500 font-semibold">Email</h4>
              <p className="text-gray-600 dark:text-gray-400">{contactInfo.email || "Loading..."}</p>
            </div>
            <div>
              <h4 className="text-orange-500 font-semibold">Phone</h4>
              <p className="text-gray-600 dark:text-gray-400">{contactInfo.phone || "Loading..."}</p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex gap-5 mt-10">
            <a href={contactInfo.github || "#"} target="_blank" rel="noreferrer" className="text-3xl text-themeText hover:text-orange-500 transition">
              <FaGithub />
            </a>
            <a href={contactInfo.linkedin || "#"} target="_blank" rel="noreferrer" className="text-3xl text-themeText hover:text-orange-500 transition">
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Right Side - Form */}
        <form onSubmit={handleSubmit} className="bg-themeCard/80 border border-orange-500/20 rounded-3xl p-8 space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-themeBg text-themeText placeholder-gray-500 rounded-xl p-4 outline-none border border-orange-500/20 focus:border-orange-500 transition"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-themeBg text-themeText placeholder-gray-500 rounded-xl p-4 outline-none border border-orange-500/20 focus:border-orange-500 transition"
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            required
            value={formData.subject}
            onChange={handleChange}
            className="w-full bg-themeBg text-themeText placeholder-gray-500 rounded-xl p-4 outline-none border border-orange-500/20 focus:border-orange-500 transition"
          />
          <textarea
            rows="6"
            name="message"
            placeholder="Write your message..."
            required
            value={formData.message}
            onChange={handleChange}
            className="w-full bg-themeBg text-themeText placeholder-gray-500 rounded-xl p-4 outline-none border border-orange-500/20 focus:border-orange-500 transition"
          />
          <button
            disabled={loading}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-3 transition disabled:opacity-60"
          >
            <FaPaperPlane />
            {loading ? "Sending..." : "Send Message"}
          </button>

          {/* Feedback Messages */}
          {success && <p className="text-green-400 font-semibold mt-4">{success}</p>}
          {error && <p className="text-red-400 font-semibold mt-4">{error}</p>}
        </form>
      </div>
    </section>
  );
};

export default Contact;