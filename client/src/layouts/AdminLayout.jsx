import { Outlet, useNavigate, NavLink } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaCode,
  FaBriefcase,
  FaCertificate,
  FaProjectDiagram,
  FaEnvelope,
  FaCog,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";

import { useState } from "react";

const AdminLayout = () => {

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const admin = JSON.parse(localStorage.getItem("admin"));

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("admin");

    navigate("/admin");

  };

  const menu = [

    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaHome />,
    },

    {
      name: "Hero",
      path: "/dashboard/hero",
      icon: <FaHome />,
    },

    {
      name: "About",
      path: "/dashboard/about",
      icon: <FaUser />,
    },

    {
      name: "Skills",
      path: "/dashboard/skills",
      icon: <FaCode />,
    },

    {
      name: "Experience",
      path: "/dashboard/experience",
      icon: <FaBriefcase />,
    },

    {
      name: "Certificates",
      path: "/dashboard/certificates",
      icon: <FaCertificate />,
    },

    {
      name: "Projects",
      path: "/dashboard/projects",
      icon: <FaProjectDiagram />,
    },

    {
      name: "Messages",
      path: "/dashboard/messages",
      icon: <FaEnvelope />,
    },

    {
      name: "Contact",
      path: "/dashboard/contact",
      icon: <FaEnvelope />,
    },

    {
      name: "Settings",
      path: "/dashboard/settings",
      icon: <FaCog />,
    },

  ];

  return (

    <div className="min-h-screen flex bg-[#050505] text-white">

      {/* Sidebar */}

      <aside

        className={`
        fixed lg:static
        top-0 left-0
        h-screen
        w-72
        bg-[#111]
        border-r
        border-orange-500/20
        p-6
        duration-300
        z-50

        ${open ? "translate-x-0" : "-translate-x-full"}

        lg:translate-x-0
        `}

      >

        <h1 className="text-3xl font-bold text-orange-500 mb-10">

          Admin Panel

        </h1>

        <nav className="space-y-2">

          {

            menu.map((item) => (

              <NavLink

                key={item.path}

                to={item.path}

                onClick={() => setOpen(false)}

                className={({ isActive }) =>

                  `flex items-center gap-4 px-5 py-4 rounded-xl transition

                  ${

                    isActive

                      ? "bg-orange-500"

                      : "hover:bg-orange-500/20"

                  }

                  `

                }

              >

                {item.icon}

                {item.name}

              </NavLink>

            ))

          }

        </nav>

        <button

          onClick={logout}

          className="mt-10 bg-red-600 hover:bg-red-700 w-full py-4 rounded-xl"

        >

          <FaSignOutAlt className="inline mr-3"/>

          Logout

        </button>

      </aside>

      {/* Main */}

      <div className="flex-1">

        {/* Topbar */}

        <header className="h-20 bg-[#111] border-b border-orange-500/20 flex justify-between items-center px-8">

          <button

            className="lg:hidden"

            onClick={() => setOpen(!open)}

          >

            <FaBars size={25}/>

          </button>

          <div>

            <h2 className="text-2xl font-bold">

              Welcome

            </h2>

          </div>

          <div className="text-right">

            <p className="font-semibold">

              {admin?.name}

            </p>

            <p className="text-sm text-gray-400">

              {admin?.email}

            </p>

          </div>

        </header>

        {/* Page */}

        <main className="p-8">

          <Outlet />

        </main>

      </div>

    </div>

  );

};

export default AdminLayout;