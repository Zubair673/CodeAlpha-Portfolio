import { useEffect, useState } from "react";

const Certificates = () => {
  const [certs, setCerts] = useState([]);

  useEffect(() => {
    fetch("https://codealpha-portfolio-1.onrender.com/api/certificates")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setCerts(data.certificates);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <section id="certificates" className="py-20 bg-[#050505] px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">Certificates</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {(certs || []).map((cert) => (
            <div key={cert._id} className="bg-[#111] border border-gray-800 p-3 rounded-xl hover:border-orange-500 transition-all duration-300">
              {cert.image && (
                <img src={cert.image} alt={cert.title} className="w-full h-32 object-cover rounded-lg mb-3" />
              )}
              
              <h3 className="text-lg font-bold text-white leading-tight">{cert.title}</h3>
              <p className="text-orange-400 font-medium text-sm">{cert.organization}</p>
              <p className="text-gray-500 text-xs mt-1">{cert.issueDate}</p>
              <p className="text-gray-400 mt-2 leading-snug text-xs">{cert.description}</p>
              
              {cert.certificateUrl && (
                <a 
                  href={cert.certificateUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block mt-3 px-4 py-1.5 bg-orange-500 text-white rounded text-sm hover:bg-orange-600 transition"
                >
                  View Certificate
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;