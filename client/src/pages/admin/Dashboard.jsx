import { useEffect, useState } from "react";
import {
  FaProjectDiagram,
  FaStar,
  FaEnvelope,
  FaUserShield,
} from "react-icons/fa";

const Dashboard = () => {

  const [stats, setStats] = useState({
    totalProjects: 0,
    featuredProjects: 0,
    totalMessages: 0,
  });

  const admin = JSON.parse(localStorage.getItem("admin"));

  useEffect(() => {

    fetchDashboardData();

  }, []);

  const fetchDashboardData = async () => {

    try {

      const token = localStorage.getItem("token");

      // Projects

      const projectRes = await fetch(
        "https://lucid-caring-production-a6e4.up.railway.app/api/projects"
      );

      const projectData = await projectRes.json();

      // Messages

      const messageRes = await fetch(
        "https://lucid-caring-production-a6e4.up.railway.app/api/messages",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const messageData = await messageRes.json();

      const featured =
        projectData.projects.filter(
          (item) => item.featured === true
        ).length;

      setStats({

        totalProjects: projectData.count,

        featuredProjects: featured,

        totalMessages: messageData.count || 0,

      });

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div>

      <h1 className="text-4xl font-bold mb-2">

        Welcome Back 👋

      </h1>

      <p className="text-gray-400 mb-10">

        {admin?.name}

      </p>

      {/* Cards */}

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">

        {/* Card */}

        <div className="bg-[#111] border border-orange-500/20 rounded-3xl p-8">

          <FaProjectDiagram className="text-5xl text-orange-500 mb-5" />

          <h2 className="text-4xl font-bold">

            {stats.totalProjects}

          </h2>

          <p className="text-gray-400 mt-2">

            Total Projects

          </p>

        </div>

        {/* Card */}

        <div className="bg-[#111] border border-orange-500/20 rounded-3xl p-8">

          <FaStar className="text-5xl text-yellow-500 mb-5" />

          <h2 className="text-4xl font-bold">

            {stats.featuredProjects}

          </h2>

          <p className="text-gray-400 mt-2">

            Featured Projects

          </p>

        </div>

        {/* Card */}

        <div className="bg-[#111] border border-orange-500/20 rounded-3xl p-8">

          <FaEnvelope className="text-5xl text-blue-500 mb-5" />

          <h2 className="text-4xl font-bold">

            {stats.totalMessages}

          </h2>

          <p className="text-gray-400 mt-2">

            Contact Messages

          </p>

        </div>

        {/* Card */}

        <div className="bg-[#111] border border-orange-500/20 rounded-3xl p-8">

          <FaUserShield className="text-5xl text-green-500 mb-5" />

          <h2 className="text-2xl font-bold">

            Admin

          </h2>

          <p className="text-gray-400 mt-2">

            Authorized User

          </p>

        </div>

      </div>

      {/* Recent Activity */}

      <div className="mt-12 bg-[#111] border border-orange-500/20 rounded-3xl p-8">

        <h2 className="text-2xl font-bold mb-6">

          Dashboard Overview

        </h2>

        <p className="text-gray-400 leading-8">

          Welcome to your Portfolio CMS.

          From here you can manage your projects,
          contact messages and portfolio content.

          Every change you make here will automatically
          appear on your portfolio website.

        </p>

      </div>

    </div>

  );

};

export default Dashboard;