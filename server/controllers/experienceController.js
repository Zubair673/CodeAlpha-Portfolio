import Experience from "../models/Experience.js";

// ==========================================
// Get All Experience
// ==========================================

export const getExperiences = async (req, res) => {
  try {

    const experiences = await Experience.find().sort({
      createdAt: 1,
    });

    res.status(200).json({
      success: true,
      experiences,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ==========================================
// Add Experience
// ==========================================

export const addExperience = async (req, res) => {
  try {

    const {
      title,
      company,
      duration,
      description,
      icon,
    } = req.body;

    const experience = await Experience.create({
      title,
      company,
      duration,
      description,
      icon,
    });

    res.status(201).json({
      success: true,
      message: "Experience Added Successfully",
      experience,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ==========================================
// Update Experience
// ==========================================

export const updateExperience = async (req, res) => {
  try {

    const experience = await Experience.findById(req.params.id);

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience Not Found",
      });
    }

    experience.title = req.body.title;
    experience.company = req.body.company;
    experience.duration = req.body.duration;
    experience.description = req.body.description;
    experience.icon = req.body.icon;

    await experience.save();

    res.status(200).json({
      success: true,
      message: "Experience Updated Successfully",
      experience,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ==========================================
// Delete Experience
// ==========================================

export const deleteExperience = async (req, res) => {
  try {

    const experience = await Experience.findById(req.params.id);

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience Not Found",
      });
    }

    await experience.deleteOne();

    res.status(200).json({
      success: true,
      message: "Experience Deleted Successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};