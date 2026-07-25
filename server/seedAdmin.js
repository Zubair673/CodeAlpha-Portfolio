import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import connectDB from "./config/db.js";
import User from "./models/User.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    await connectDB();

    const existingAdmin = await User.findOne({
      email: "zubairrauf5945@gmail.com",
    });

    if (existingAdmin) {
      console.log("Admin already exists.");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("12345678", 10);

    await User.create({
      name: "Admin",
      email: "zubairrauf5945@gmail.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin Created Successfully!");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedAdmin();