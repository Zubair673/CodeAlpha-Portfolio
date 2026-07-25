import { useState, useEffect } from "react";

const Certificates = () => {
  const [certs, setCerts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({ 
    title: "", organization: "", issueDate: "", credentialId: "", 
    certificateUrl: "", description: "" 
  });

  useEffect(() => { fetchCerts(); }, []);

  const fetchCerts = async () => {
    try {
      const res = await fetch("https://codealpha-portfolio-drii.onrender.com/api/certificates");
      const data = await res.json();
      if (data.success) setCerts(data.certificates);
    } catch (err) { console.log("Failed to load"); }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (imageFile) data.append("image", imageFile);

    const url = editingId ? `https://codealpha-portfolio-drii.onrender.com/api/certificates/${editingId}` : "https://codealpha-portfolio-drii.onrender.com/api/certificates";
    const method = editingId ? "PUT" : "POST";
    
    try {
      const response = await fetch(url, { method: method, body: data });
      const result = await response.json();

      if (result.success) {
        alert(editingId ? "Certificate updated successfully!" : "Certificate added successfully!");
        
        // Reset
        setEditingId(null);
        setImageFile(null);
        setFormData({ title: "", organization: "", issueDate: "", credentialId: "", certificateUrl: "", description: "" });
        fetchCerts();
      } else {
        // Yeh wahi error dikhayega jo server se aayega (jaise aapke screenshot mein tha)
        alert(result.message || "Something went wrong!");
      }
    } catch (err) {
      alert("Server connection error!");
    }
  };

  const handleEdit = (cert) => {
    setEditingId(cert._id);
    setFormData({
      title: cert.title,
      organization: cert.organization,
      issueDate: cert.issueDate,
      credentialId: cert.credentialId,
      certificateUrl: cert.certificateUrl,
      description: cert.description
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if(window.confirm("Are you sure you want to delete this?")) {
      try {
        const res = await fetch(`https://codealpha-portfolio-drii.onrender.com/api/certificates/${id}`, { method: 'DELETE' });
        const data = await res.json();
        
        if (data.success) {
          alert("Certificate deleted!");
          fetchCerts();
        } else {
          alert(data.message || "Failed to delete");
        }
      } catch (err) { alert("Server error"); }
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">Manage Certificates</h1>
      
      <form onSubmit={handleSubmit} className="bg-[#111] p-8 rounded-2xl border border-gray-800 mb-10">
        <div className="grid md:grid-cols-2 gap-6">
          <input className="w-full p-4 bg-[#1d1d1d] text-white rounded-lg border border-gray-700" name="title" placeholder="Certificate Title" value={formData.title} onChange={handleChange} required />
          <input className="w-full p-4 bg-[#1d1d1d] text-white rounded-lg border border-gray-700" name="organization" placeholder="Organization" value={formData.organization} onChange={handleChange} required />
          <input className="w-full p-4 bg-[#1d1d1d] text-white rounded-lg border border-gray-700" name="issueDate" placeholder="Issue Date" value={formData.issueDate} onChange={handleChange} />
          <input className="w-full p-4 bg-[#1d1d1d] text-white rounded-lg border border-gray-700" name="credentialId" placeholder="Credential ID" value={formData.credentialId} onChange={handleChange} />
          <input className="w-full p-4 bg-[#1d1d1d] text-white rounded-lg border border-gray-700" name="certificateUrl" placeholder="Certificate URL" value={formData.certificateUrl} onChange={handleChange} />
          
          <div className="flex flex-col gap-2">
            <label className="text-gray-400 text-sm">Upload Image</label>
            <input type="file" onChange={(e) => setImageFile(e.target.files[0])} className="w-full p-3 bg-[#1d1d1d] text-white rounded-lg border border-gray-700" />
          </div>
        </div>
        <textarea className="w-full p-4 mt-6 bg-[#1d1d1d] text-white rounded-lg border border-gray-700" name="description" placeholder="Description" rows="4" value={formData.description} onChange={handleChange} />
        
        <button type="submit" className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold">
          {editingId ? "Update Certificate" : "Add Certificate"}
        </button>
      </form>

      <div className="bg-[#111] rounded-2xl border border-gray-800 overflow-hidden">
        <table className="w-full text-white">
          <thead className="bg-[#1b1b1b]">
            <tr>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Organization</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(certs || []).map((cert) => (
              <tr key={cert._id} className="border-t border-gray-800">
                <td className="p-4">{cert.title}</td>
                <td className="p-4">{cert.organization}</td>
                <td className="p-4 flex justify-center gap-2">
                  <button onClick={() => handleEdit(cert)} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-semibold transition">Edit</button>
                  <button onClick={() => handleDelete(cert._id)} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-semibold transition">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Certificates;