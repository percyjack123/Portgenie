import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import design from "../assets/designs.svg";
import vector6 from "../assets/Vector6.svg";
import vector7 from "../assets/Vector7.svg";
import { useAuth } from "../context/AuthContext";
import { getUserProjects, deleteProject } from "../services/ProjectApi";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const loadProjects = async () => {
      try {
        const data = await getUserProjects(user.uid);
        setProjects(data);
      } catch (err) {
        console.error("Dashboard load error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, [user]);
  const handleDelete = async (projectId) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this portfolio?"
  );

  if (!confirmDelete) return;

  try {
    await deleteProject(projectId);

    // Remove from UI instantly
    setProjects((prev) =>
      prev.filter((project) => project._id !== projectId)
    );
  } catch (err) {
    console.error(err);
    alert("Failed to delete portfolio");
  }
};


  return (
    <div className="flex min-h-screen bg-[#0A0502] text-white">
      <Sidebar />

      <div className="flex flex-col w-full p-4">
        {/* Welcome Card */}
        <div className="border border-[#E85102] p-6 mt-3 rounded-[20px]
                        w-full max-w-md text-[#E85102]
                        font-bold flex justify-between items-center">
          <div className="text-left">
            <div className="text-xl">Welcome back !!</div>
            <div className="text-2xl my-1 text-white">
              {user?.displayName || "User"}
            </div>
            <div className="font-light text-sm text-gray-400">
              Don't miss out latest updates
            </div>
          </div>
          <img
            src={design}
            alt="design"
            className="h-14 w-14 mx-5 mt-4 scale-600 object-contain"
          />
        </div>

        {/* Search */}
        <div className="flex items-center mt-6 gap-4 max-w-md">
          <div className="border border-[#E85102] p-2 rounded-[20px]
                          flex items-center h-12 flex-1 px-4">
            <img src={vector6} alt="" className="h-5 w-5" />
            <input
              placeholder="search for..."
              className="mx-2 bg-transparent outline-none w-full
                         text-sm placeholder-gray-500"
            />
          </div>

          <div className="border border-[#E85102] p-2 rounded-[20px]
                          flex items-center h-12 px-6 gap-2 cursor-pointer">
            <img src={vector7} alt="" className="h-4 w-4" />
            <span className="text-sm">edit</span>
          </div>
        </div>

        {/* Projects */}
        <div className="border border-[#E85102] p-8 rounded-[40px]
                        w-full mt-10 max-w-5xl min-h-[300px]">

          <h1 className="text-center font-bold text-[#E85102] text-2xl mb-8">
            Projects
          </h1>

          <button
            onClick={() => navigate("/create")}
            className="block mx-auto mb-6 border border-[#E85102]
                       px-6 py-2 rounded-full text-[#E85102]
                       hover:bg-[#E85102] hover:text-black hover:cursor-pointer transition"
          >
            + Add Project
          </button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {loading && (
              <p className="col-span-3 text-center text-gray-500">
                Loading projects...
              </p>
            )}

            {!loading && projects.length === 0 && (
              <p className="col-span-3 text-center text-gray-500">
                You haven’t added any projects yet.
              </p>
            )}

            {!loading &&
              projects.map((project) => (
                <div
  key={project._id}
  className="relative border border-[#E85102] rounded-[30px]
             h-40 flex flex-col items-center justify-center
             hover:bg-[#E85102]/5 transition"
>
  <div
    onClick={() => navigate(`/portfolio/${user.uid}`)}
    className="cursor-pointer text-center"
  >
    <h3 className="text-[#E85102] font-semibold">
      {project.meta?.fullName || "Untitled Portfolio"}
    </h3>

    <p className="text-xs text-gray-500 mt-2">
      {new Date(project.createdAt).toLocaleDateString()}
    </p>
  </div>

  {/* DELETE BUTTON */}
  <button
    onClick={() => handleDelete(project._id)}
    className="
      absolute top-3 right-4
      text-xs text-red-400
      hover:text-red-500
    "
  >
    Delete
  </button>
</div>

              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
