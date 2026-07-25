import fs from "fs";
import Hero from "../models/Hero.js";
import cloudinary from "../config/cloudinary.js";

// ==========================================
// Get Hero
// ==========================================

export const getHero = async (req, res) => {
  try {
    let hero = await Hero.findOne();

    if (!hero) {
      hero = await Hero.create({});
    }

    res.status(200).json({
      success: true,
      hero,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Update Hero
// ==========================================

export const updateHero = async (req, res) => {
  try {
    let hero = await Hero.findOne();

    if (!hero) {
      hero = await Hero.create({});
    }

    // =====================================
    // Profile Image Upload
    // =====================================

    if (req.files?.profileImage) {
      if (hero.profileImageId) {
        await cloudinary.uploader.destroy(hero.profileImageId);
      }

      const result = await cloudinary.uploader.upload(
        req.files.profileImage[0].path,
        {
          folder: "portfolio/hero",
        }
      );

      hero.profileImage = result.secure_url;
      hero.profileImageId = result.public_id;

      fs.unlinkSync(req.files.profileImage[0].path);
    }

    // =====================================
    // Resume Upload
    // =====================================

    if (req.files?.resume) {
      if (hero.resumeId) {
        await cloudinary.uploader.destroy(hero.resumeId, {
          resource_type: "raw",
        });
      }

      const result = await cloudinary.uploader.upload(
        req.files.resume[0].path,
        {
          folder: "portfolio/resume",
          resource_type: "raw",
        }
      );

      hero.resume = result.secure_url;
      hero.resumeId = result.public_id;

      fs.unlinkSync(req.files.resume[0].path);
    }

    // =====================================
    // Basic Info
    // =====================================

    hero.name = req.body.name;
    hero.title = req.body.title;
    hero.availability = req.body.availability;
    hero.description = req.body.description;

    hero.typingTexts = JSON.parse(
      req.body.typingTexts || "[]"
    );

    // =====================================
    // Hero Stats
    // =====================================

    hero.stats = [
      {
        value: req.body.stat1Value || "",
        label: req.body.stat1Label || "",
      },
      {
        value: req.body.stat2Value || "",
        label: req.body.stat2Label || "",
      },
      {
        value: req.body.stat3Value || "",
        label: req.body.stat3Label || "",
      },
      {
        value: req.body.stat4Value || "",
        label: req.body.stat4Label || "",
      },
    ];

    await hero.save();

    res.status(200).json({
      success: true,
      message: "Hero Updated Successfully",
      hero,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};