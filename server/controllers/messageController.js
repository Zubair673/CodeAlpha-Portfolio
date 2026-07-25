import Message from "../models/Message.js";

// YEH FUNCTION ADD KAREIN
export const createMessage = async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    await newMessage.save();
    res.json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json({ success: true, messages });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

export const deleteMessage = async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Message deleted" });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};