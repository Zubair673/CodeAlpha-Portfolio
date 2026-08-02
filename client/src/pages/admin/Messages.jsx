import { useState, useEffect } from "react";

const Messages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => { fetchMessages(); }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch("https://lucid-caring-production-a6e4.up.railway.app/api/messages");
      const data = await res.json();
      if (data.success) setMessages(data.messages);
    } catch (err) { console.log("Failed to load"); }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this message?")) {
      try {
        const res = await fetch(`https://lucid-caring-production-a6e4.up.railway.app/api/messages/${id}`, { method: 'DELETE' });
        const data = await res.json();
        if (data.success) {
          alert("Message deleted!");
          fetchMessages();
        }
      } catch (err) { alert("Error deleting message"); }
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">Messages</h1>
      <div className="bg-[#111] rounded-2xl border border-gray-800 overflow-hidden">
        <table className="w-full text-white">
          <thead className="bg-[#1b1b1b]">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Message</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg) => (
              <tr key={msg._id} className="border-t border-gray-800">
                <td className="p-4">{msg.name}</td>
                <td className="p-4">{msg.email}</td>
                <td className="p-4 text-gray-400">{msg.message}</td>
                <td className="p-4 text-center">
                  <button onClick={() => handleDelete(msg._id)} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Messages;