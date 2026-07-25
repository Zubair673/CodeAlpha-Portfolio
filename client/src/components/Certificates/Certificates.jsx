import { useEffect, useState } from "react";

const Certificates = () => {
  const [certs, setCerts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/certificates")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setCerts(data.certificates);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <section id="certificates" className="py-20 bg-[#050505] px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-12">Certificates</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(certs || []).map((cert) => (
            <div key={cert._id} className="bg-[#111] border border-gray-800 p-6 rounded-2xl hover:border-orange-500 transition-all duration-300">
              {/* Image */}
              {cert.image && (
                <img src={cert.image} alt={cert.title} className="w-full h-40 object-cover rounded-lg mb-4" />
              )}
              
              {/* Details */}
              <h3 className="text-xl font-bold text-white">{cert.title}</h3>
              <p className="text-orange-400 font-medium">{cert.organization}</p>
              <p className="text-gray-500 text-sm mt-1">{cert.issueDate}</p>
              <p className="text-gray-400 mt-4 leading-relaxed">{cert.description}</p>
              
              {/* View Button */}
              {cert.certificateUrl && (
                <a 
                  href={cert.certificateUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block mt-6 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
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