import Settings from "../models/Settings.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

// Make sure 'export' is written before 'const'
export const getSettings = async (req, res) => {
  try {
    const settings = await Settings.findOne().select("-password");
    res.json({ success: true, settings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Make sure 'export' is written before 'const'
export const updateSettings = async (req, res) => {
  try {
    const { newPassword, ...otherFields } = req.body;
    let updateData = { ...otherFields };

    if (newPassword && newPassword.length > 0) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      updateData.password = hashedPassword;

      // Update User collection - Email check kar lein yahan
      await User.findOneAndUpdate(
        { email: "zubairrauf5945@gmail.com" }, 
        { password: hashedPassword }
      );
    }

    const updated = await Settings.findOneAndUpdate(
      {},
      updateData,
      { new: true, upsert: true }
    );
    
    res.json({ success: true, message: "Settings and Password updated successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};