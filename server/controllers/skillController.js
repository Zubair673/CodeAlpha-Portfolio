import Skill from "../models/Skill.js";

// ==========================================
// Get All Skills
// ==========================================

export const getSkills = async (req, res) => {
  try {

    const skills = await Skill.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      skills,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ==========================================
// Create Skill
// ==========================================

export const createSkill = async (req, res) => {
  try {

    const {
      name,
      icon,
      category,
      percentage,
    } = req.body;

    const skill = await Skill.create({
      name,
      icon,
      category,
      percentage,
    });

    res.status(201).json({
      success: true,
      message: "Skill Added Successfully",
      skill,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ==========================================
// Update Skill
// ==========================================

export const updateSkill = async (req, res) => {
  try {

    const skill = await Skill.findById(
      req.params.id
    );

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill Not Found",
      });
    }

    skill.name =
      req.body.name || skill.name;

    skill.icon =
      req.body.icon || skill.icon;

    skill.category =
      req.body.category || skill.category;

    skill.percentage =
      req.body.percentage || skill.percentage;

    await skill.save();

    res.status(200).json({
      success: true,
      message: "Skill Updated Successfully",
      skill,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ==========================================
// Delete Skill
// ==========================================

export const deleteSkill = async (req, res) => {
  try {

    const skill = await Skill.findById(
      req.params.id
    );

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill Not Found",
      });
    }

    await skill.deleteOne();

    res.status(200).json({
      success: true,
      message: "Skill Deleted Successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};