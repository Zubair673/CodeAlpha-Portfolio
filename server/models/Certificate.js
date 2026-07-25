import mongoose from 'mongoose';

const CertificateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  organization: { type: String, required: true },
  issueDate: { type: String, required: true },
  credentialId: { type: String },
  certificateUrl: { type: String },
  description: { type: String },
  image: { type: String },
  imageId: { type: String }
});

const Certificate = mongoose.model('Certificate', CertificateSchema);

export default Certificate;