import dotenv from "dotenv";
import bcrypt from "bcryptjs";

import connectDB from "../config/db.js";
import User from "../models/User.js";

dotenv.config();

const createAdmin = async () => {

  try {

    await connectDB();

    const adminExists = await User.findOne({

      email: "admin@gmail.com",

    });

    if (adminExists) {

      console.log("Admin Already Exists");

      process.exit();

    }

    const hashedPassword = await bcrypt.hash(

      "admin123",

      10

    );

    await User.create({

      name: "Muhammad Zubair Rauf",

      email: "admin@gmail.com",

      password: hashedPassword,

      role: "admin",

    });

    console.log("Admin Created Successfully");

    process.exit();

  }

  catch (error) {

    console.log(error.message);

    process.exit(1);

  }

};

createAdmin();