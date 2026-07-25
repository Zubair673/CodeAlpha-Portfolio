import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Check karein ke token localStorage mein hai ya nahi
  const token = localStorage.getItem("token"); 
  
  // Agar token nahi hai, toh login page par bhej dein
  if (!token) {
    return <Navigate to="/admin/login" />;
  }
  
  // Agar token hai, toh dashboard dikhayein
  return children;
};

export default ProtectedRoute;