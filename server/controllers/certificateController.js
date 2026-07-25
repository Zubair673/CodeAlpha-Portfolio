import Certificate from "../models/Certificate.js";
import cloudinary from "../config/cloudinary.js";

export const addCertificate = async (req, res) => {
  try {
    let imageData = { url: "", public_id: "" };

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, { folder: "certificates" });
      imageData = { url: result.secure_url, public_id: result.public_id };
    }

    const newCert = new Certificate({
      ...req.body,
      image: imageData.url,
      imageId: imageData.public_id
    });

    await newCert.save();
    res.json({ success: true, message: "Certificate added", certificate: newCert });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

export const updateCertificate = async (req, res) => {
  try {
    let updateData = { ...req.body };
    
    if (req.file) {
      // Purani image delete karna zaroori hai
      const oldCert = await Certificate.findById(req.params.id);
      if (oldCert && oldCert.imageId) {
        await cloudinary.uploader.destroy(oldCert.imageId);
      }
      
      const result = await cloudinary.uploader.upload(req.file.path, { folder: "certificates" });
      updateData.image = result.secure_url;
      updateData.imageId = result.public_id;
    }

    const updatedCert = await Certificate.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json({ success: true, message: "Updated", certificate: updatedCert });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

// ... deleteCertificate mein cloudinary.uploader.destroy(cert.imageId) zaroor call kar lena!
export const deleteCertificate = async (req, res) => {
  try {
    const cert = await Certificate.findByIdAndDelete(req.params.id);
    if (cert && cert.imageId) await cloudinary.uploader.destroy(cert.imageId);
    res.json({ success: true, message: "Deleted" });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

export const getCertificates = async (req, res) => {
  try {
    const certs = await Certificate.find();
    res.json({ success: true, certificates: certs });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};