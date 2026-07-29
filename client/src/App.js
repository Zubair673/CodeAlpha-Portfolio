import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import ProtectedRoute from "./components/ProtectedRoute";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";

// Public Portfolio
import Home from "./pages/admin/Home";

// Admin
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";

import Hero from "./pages/admin/Hero";
import About from "./pages/admin/About";
import Skills from "./pages/admin/Skills";
import Experience from "./pages/admin/Experience";

import Projects from "./pages/admin/Projects";
import AddProject from "./pages/admin/AddProject";
import EditProject from "./pages/admin/EditProject";

import Certificates from "./pages/admin/Certificates";
import Messages from "./pages/admin/Messages";
import Contact from "./pages/admin/Contact";
import Settings from "./pages/admin/Settings";

function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const timer = setTimeout(() => {

      setLoading(false);

    }, 2500);

    return () => clearTimeout(timer);

  }, []);

  if (loading) {

    return <LoadingScreen />;

  }

  return (
    <BrowserRouter>

      <Routes>

        {/* Portfolio */}

        <Route
          path="/"
          element={<Home />}
        />

        {/* Admin Login */}

        <Route
          path="/admin"
          element={<AdminLogin />}
        />

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        {/* Protected Dashboard */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >

          <Route
            index
            element={<Dashboard />}
          />

          <Route
            path="hero"
            element={<Hero />}
          />

          <Route
            path="about"
            element={<About />}
          />

          <Route
            path="skills"
            element={<Skills />}
          />

          <Route
            path="experience"
            element={<Experience />}
          />

          <Route
            path="projects"
            element={<Projects />}
          />

          <Route
            path="add-project"
            element={<AddProject />}
          />

          <Route
            path="edit-project/:id"
            element={<EditProject />}
          />

          <Route
            path="certificates"
            element={<Certificates />}
          />

          <Route
            path="messages"
            element={<Messages />}
          />

          <Route
            path="contact"
            element={<Contact />}
          />

          <Route
            path="settings"
            element={<Settings />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;