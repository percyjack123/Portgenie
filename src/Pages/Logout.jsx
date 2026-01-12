import React from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Logout = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logOut();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-[#0A0502] text-white">
      <Sidebar />

      <div className="flex-1 flex justify-center mt-24">
        <div className="w-[320px] h-60 rounded-4xl border border-[#E85102] p-6 text-center">

          <h1 className="text-[#E85102] text-xl font-semibold mb-2">
            Hey there!
          </h1>
          <p className="mb-6">Are you sure you want to log out?</p>

          <div className="flex justify-center gap-4">
            <button
              onClick={handleLogout}
              className="px-6 py-1 rounded-xl border border-[#E85102] hover:bg-[#E85102] hover:text-black"
            >
              Yes
            </button>

            <button
              onClick={() => navigate(-1)}
              className="px-6 py-1 rounded-xl border  hover:bg-[#E85102] hover:text-black border-[#E85102]"
            >
              No
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Logout;
