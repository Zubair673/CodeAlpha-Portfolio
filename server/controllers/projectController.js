import fs from "fs";
import Project from "../models/Project.js";
import cloudinary from "../config/cloudinary.js";

// ==========================================
// Get All Projects
// ==========================================

export const getProjects = async (req, res) => {

  try {

    const projects = await Project.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: projects.length,
      projects,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// ==========================================
// Get Single Project
// ==========================================

export const getProject = async (req, res) => {

  try {

    const project = await Project.findById(req.params.id);

    if (!project) {

      return res.status(404).json({
        success: false,
        message: "Project Not Found",
      });

    }

    res.status(200).json({
      success: true,
      project,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// ==========================================
// Add Project
// ==========================================

export const addProject = async (req, res) => {

  try {

    let image = "";
    let public_id = "";

    if (req.file) {

      const result = await cloudinary.uploader.upload(
        req.file.path,
        {
          folder: "portfolio/projects",
        }
      );

      image = result.secure_url;
      public_id = result.public_id;

      fs.unlinkSync(req.file.path);

    }

    const project = await Project.create({

      title: req.body.title,

      description: req.body.description,

      github: req.body.github,

      liveDemo: req.body.liveDemo,

      technologies: JSON.parse(req.body.technologies),

      featured:
        req.body.featured === "true" ||
        req.body.featured === true,

      image,

      public_id,

    });

    res.status(201).json({

      success: true,

      message: "Project Added Successfully",

      project,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};
// ==========================================
// Update Project
// ==========================================

export const updateProject = async (req, res) => {

  try {

    const project = await Project.findById(req.params.id);

    if (!project) {

      return res.status(404).json({
        success: false,
        message: "Project Not Found",
      });

    }

    let image = project.image;
    let public_id = project.public_id;

    // New Image Uploaded
    if (req.file) {

      // Delete old image from Cloudinary
      if (project.public_id) {

        await cloudinary.uploader.destroy(project.public_id);

      }

      // Upload new image
      const result = await cloudinary.uploader.upload(
        req.file.path,
        {
          folder: "portfolio/projects",
        }
      );

      image = result.secure_url;
      public_id = result.public_id;

      // Delete local uploaded file
      fs.unlinkSync(req.file.path);

    }

    project.title = req.body.title || project.title;

    project.description =
      req.body.description || project.description;

    project.github =
      req.body.github || project.github;

    project.liveDemo =
      req.body.liveDemo || project.liveDemo;

    project.featured =
      req.body.featured === "true" ||
      req.body.featured === true;

    if (req.body.technologies) {

      project.technologies = JSON.parse(
        req.body.technologies
      );

    }

    project.image = image;
    project.public_id = public_id;

    await project.save();

    res.status(200).json({

      success: true,

      message: "Project Updated Successfully",

      project,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

// ==========================================
// Delete Project
// ==========================================

export const deleteProject = async (req, res) => {

  try {

    const project = await Project.findById(req.params.id);

    if (!project) {

      return res.status(404).json({

        success: false,

        message: "Project Not Found",

      });

    }

    // Delete image from Cloudinary

    if (project.public_id) {

      await cloudinary.uploader.destroy(
        project.public_id
      );

    }

    await project.deleteOne();

    res.status(200).json({

      success: true,

      message: "Project Deleted Successfully",

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};