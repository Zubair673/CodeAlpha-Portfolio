import Resume from "../models/Resume.js";
import cloudinary from "../config/cloudinary.js";

// Get Resume

export const getResume = async (req, res) => {
  try {
    const resume = await Resume.findOne();

    res.status(200).json({
      success: true,
      resume,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Upload Resume

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume file is required.",
      });
    }

    // delete old resume

    const oldResume = await Resume.findOne();

    if (oldResume) {
      await cloudinary.uploader.destroy(oldResume.publicId, {
        resource_type: "raw",
      });

      await Resume.deleteMany();
    }

    const newResume = await Resume.create({
      title: "Resume",
      fileUrl: req.file.path,
      publicId: req.file.filename,
    });

    res.status(201).json({
      success: true,
      resume: newResume,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Resume

export const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOne();

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found.",
      });
    }

    await cloudinary.uploader.destroy(resume.publicId, {
      resource_type: "raw",
    });

    await Resume.deleteMany();

    res.json({
      success: true,
      message: "Resume deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};