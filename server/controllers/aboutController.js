import fs from "fs";
import About from "../models/About.js";
import cloudinary from "../config/cloudinary.js";

// ==========================================
// Get About
// ==========================================

export const getAbout = async (req, res) => {
  try {
    let about = await About.findOne();

    if (!about) {
      about = await About.create({});
    }

    res.status(200).json({
      success: true,
      about,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ==========================================
// Update About
// ==========================================

export const updateAbout = async (req, res) => {
  try {

    let about = await About.findOne();

    if (!about) {
      about = await About.create({});
    }

    // ======================================
    // Image Upload
    // ======================================

    if (req.files?.image) {

      if (about.imageId) {
        await cloudinary.uploader.destroy(about.imageId);
      }

      const result = await cloudinary.uploader.upload(
        req.files.image[0].path,
        {
          folder: "portfolio/about",
        }
      );

      about.image = result.secure_url;
      about.imageId = result.public_id;

      fs.unlinkSync(req.files.image[0].path);
    }

    // ======================================
    // Update Fields
    // ======================================

    about.title = req.body.title;
    about.description = req.body.description;
    about.education = req.body.education;
    about.university = req.body.university;
    about.location = req.body.location;

    // Career Goal
    about.goal = req.body.goal;

    // Experience
    about.experience = req.body.experience;

    // Projects
    about.projects = req.body.projects;

    await about.save();

    res.status(200).json({
      success: true,
      message: "About Updated Successfully",
      about,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};