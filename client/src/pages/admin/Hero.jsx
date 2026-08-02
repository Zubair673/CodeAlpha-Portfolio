import { useState, useEffect } from "react";

const Hero = () => {
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [resume, setResume] = useState(null);

  const API_URL = "https://lucid-caring-production-a6e4.up.railway.app";

  const [hero, setHero] = useState({
    name: "", title: "", availability: "", typingTexts: "", description: "",
    stat1Value: "", stat1Label: "", stat2Value: "", stat2Label: "",
    stat3Value: "", stat3Label: "", stat4Value: "", stat4Label: "",
  });

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await fetch(`${API_URL}/api/hero`);
        const data = await res.json();
        if (data.success) {
          setHero({
            ...data.hero,
            typingTexts: data.hero.typingTexts?.join(", ") || "",
            stat1Value: data.hero.stats?.[0]?.value || "", stat1Label: data.hero.stats?.[0]?.label || "",
            stat2Value: data.hero.stats?.[1]?.value || "", stat2Label: data.hero.stats?.[1]?.label || "",
            stat3Value: data.hero.stats?.[2]?.value || "", stat3Label: data.hero.stats?.[2]?.label || "",
            stat4Value: data.hero.stats?.[3]?.value || "", stat4Label: data.hero.stats?.[3]?.label || "",
          });
          setPreview(data.hero.profileImage || "");
        }
      } catch (err) { console.log(err); }
    };
    fetchHero();
  }, []);

  const handleChange = (e) => setHero({ ...hero, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    
    Object.entries(hero).forEach(([key, val]) => formData.append(key, val));
    formData.set("typingTexts", JSON.stringify(hero.typingTexts.split(",").map(t => t.trim())));
    
    if (profileImage) formData.append("profileImage", profileImage);
    if (resume) formData.append("resume", resume);

    try {
      const res = await fetch(`${API_URL}/api/hero`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      data.success ? alert("Updated Successfully") : alert(data.message);
    } catch (err) { alert("Something went wrong"); } finally { setLoading(false); }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-10">Hero Section</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-[#111] p-8 rounded-3xl border border-orange-500/20">
        <input type="text" name="name" placeholder="Name" value={hero.name} onChange={handleChange} className="w-full p-4 rounded-xl bg-[#1b1b1b] text-white" />
        <input type="text" name="title" placeholder="Title" value={hero.title} onChange={handleChange} className="w-full p-4 rounded-xl bg-[#1b1b1b] text-white" />
        <input type="text" name="availability" placeholder="Availability" value={hero.availability} onChange={handleChange} className="w-full p-4 rounded-xl bg-[#1b1b1b] text-white" />
        <input type="text" name="typingTexts" placeholder="Typing texts" value={hero.typingTexts} onChange={handleChange} className="w-full p-4 rounded-xl bg-[#1b1b1b] text-white" />
        <textarea name="description" rows="5" placeholder="Description" value={hero.description} onChange={handleChange} className="w-full p-4 rounded-xl bg-[#1b1b1b] text-white" />

        <h2 className="text-2xl font-bold pt-6">Hero Statistics</h2>
        <div className="grid grid-cols-2 gap-5">
          <input type="text" name="stat1Value" placeholder="5+" value={hero.stat1Value} onChange={handleChange} className="p-4 rounded-xl bg-[#1b1b1b] text-white" />
          <input type="text" name="stat1Label" placeholder="Projects" value={hero.stat1Label} onChange={handleChange} className="p-4 rounded-xl bg-[#1b1b1b] text-white" />
          <input type="text" name="stat2Value" placeholder="3+" value={hero.stat2Value} onChange={handleChange} className="p-4 rounded-xl bg-[#1b1b1b] text-white" />
          <input type="text" name="stat2Label" placeholder="Internships" value={hero.stat2Label} onChange={handleChange} className="p-4 rounded-xl bg-[#1b1b1b] text-white" />
          <input type="text" name="stat3Value" placeholder="MERN" value={hero.stat3Value} onChange={handleChange} className="p-4 rounded-xl bg-[#1b1b1b] text-white" />
          <input type="text" name="stat3Label" placeholder="Learning" value={hero.stat3Label} onChange={handleChange} className="p-4 rounded-xl bg-[#1b1b1b] text-white" />
          <input type="text" name="stat4Value" placeholder="Open" value={hero.stat4Value} onChange={handleChange} className="p-4 rounded-xl bg-[#1b1b1b] text-white" />
          <input type="text" name="stat4Label" placeholder="To Work" value={hero.stat4Label} onChange={handleChange} className="p-4 rounded-xl bg-[#1b1b1b] text-white" />
        </div>

        <div>
          <label className="block mb-3 font-semibold">Profile Image</label>
          <input type="file" onChange={(e) => { 
            if(e.target.files[0]) {
                setProfileImage(e.target.files[0]); 
                setPreview(URL.createObjectURL(e.target.files[0])); 
            }
          }} className="w-full p-3 rounded-xl bg-[#1b1b1b]" />
          {preview && <img src={preview} className="mt-5 w-56 rounded-xl" alt="Preview" />}
        </div>
        <div>
          <label className="block mb-3 font-semibold">Resume PDF</label>
          <input type="file" onChange={(e) => setResume(e.target.files[0])} className="w-full p-3 rounded-xl bg-[#1b1b1b]" />
        </div>

        <button type="submit" disabled={loading} className="w-full py-4 bg-orange-500 rounded-xl font-semibold">
          {loading ? "Saving..." : "Save Hero"}
        </button>
      </form>
    </div>
  );
};

export default Hero;