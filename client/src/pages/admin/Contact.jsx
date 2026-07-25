import { useState, useEffect } from "react";

const Contact = () => {
  // State updated to include github and linkedin
  const [contact, setContact] = useState({ 
    email: "", 
    phone: "", 
    address: "",
    github: "",    // Added
    linkedin: ""   // Added
  });

  useEffect(() => {
    fetchContact();
  }, []);

  const fetchContact = async () => {
    try {
      const res = await fetch("https://codealpha-portfolio-drii.onrender.com/api/contact");
      const data = await res.json();
      if (data.success && data.contact) {
        setContact(data.contact);
      }
    } catch (err) {
      console.log("Failed to load contact info");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://codealpha-portfolio-drii.onrender.com/api/contact", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });
      const data = await res.json();
      
      if (data.success) {
        alert("Contact information updated successfully!");
      } else {
        alert("Failed to update.");
      }
    } catch (err) {
      alert("Server error, please try again.");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">Manage Contact Info</h1>
      
      <form onSubmit={handleSubmit} className="bg-[#111] p-8 rounded-2xl border border-gray-800">
        <label className="text-gray-400 block mb-2">Email Address</label>
        <input 
          className="w-full p-4 mb-4 bg-[#1d1d1d] text-white rounded-lg border border-gray-700" 
          value={contact.email || ""} 
          onChange={(e) => setContact({...contact, email: e.target.value})} 
          placeholder="Email" 
        />
        
        <label className="text-gray-400 block mb-2">Phone Number</label>
        <input 
          className="w-full p-4 mb-4 bg-[#1d1d1d] text-white rounded-lg border border-gray-700" 
          value={contact.phone || ""} 
          onChange={(e) => setContact({...contact, phone: e.target.value})} 
          placeholder="Phone" 
        />
        
        <label className="text-gray-400 block mb-2">Address</label>
        <textarea 
          className="w-full p-4 mb-4 bg-[#1d1d1d] text-white rounded-lg border border-gray-700" 
          value={contact.address || ""} 
          onChange={(e) => setContact({...contact, address: e.target.value})} 
          placeholder="Address" 
          rows="3"
        />

        {/* New GitHub Field */}
        <label className="text-gray-400 block mb-2">GitHub URL</label>
        <input 
          className="w-full p-4 mb-4 bg-[#1d1d1d] text-white rounded-lg border border-gray-700" 
          value={contact.github || ""} 
          onChange={(e) => setContact({...contact, github: e.target.value})} 
          placeholder="https://github.com/your-username" 
        />

        {/* New LinkedIn Field */}
        <label className="text-gray-400 block mb-2">LinkedIn URL</label>
        <input 
          className="w-full p-4 mb-4 bg-[#1d1d1d] text-white rounded-lg border border-gray-700" 
          value={contact.linkedin || ""} 
          onChange={(e) => setContact({...contact, linkedin: e.target.value})} 
          placeholder="https://linkedin.com/in/your-profile" 
        />
        
        <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold mt-2">
          Update Info
        </button>
      </form>
    </div>
  );
};

export default Contact;