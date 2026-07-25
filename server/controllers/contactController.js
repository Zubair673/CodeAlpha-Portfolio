import Contact from "../models/Contact.js";

export const getContact = async (req, res) => {
  try {
    const contact = await Contact.findOne();
    res.json({ success: true, contact });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

export const updateContact = async (req, res) => {
  try {
    const updated = await Contact.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json({ success: true, contact: updated });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};