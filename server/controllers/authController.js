import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// =======================================
// Admin Login
// =======================================

export const login = async (req, res) => {

  try {

    const { email, password } = req.body;

    // Check Email
    const user = await User.findOne({ email });

    if (!user) {

      return res.status(404).json({

        success: false,
        message: "Invalid Email",

      });

    }

    // Check Password
    const isMatch = await bcrypt.compare(

      password,
      user.password

    );

    if (!isMatch) {

      return res.status(401).json({

        success: false,
        message: "Invalid Password",

      });

    }

    // Generate JWT
    const token = jwt.sign(

      {

        id: user._id,

      },

      process.env.JWT_SECRET,

      {

        expiresIn: "7d",

      }

    );

    res.status(200).json({

      success: true,

      message: "Login Successful",

      token,

      user: {

        id: user._id,
        name: user.name,
        email: user.email,

      },

    });

  }

  catch (error) {

    res.status(500).json({

      success: false,
      message: error.message,

    });

  }

};