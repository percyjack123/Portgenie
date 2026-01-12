import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import vector from "../assets/vector.svg";
import vector1 from "../assets/vector1.svg";
import vector2 from "../assets/vector2.svg";
import vector3 from "../assets/vector3.svg";
import vector4 from "../assets/vector4.svg";
import frame1 from "../assets/Frame1.svg";
import vector5 from "../assets/vector5.svg";

const Sidebar = () => {
  const { user, profile } = useAuth();

  // 🔑 unified profile image source
  const profileImage =
    profile?.profilePic || user?.photoURL || "";

  return (
    <div className="flex">
      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside
        className="
          hidden md:flex
          sticky top-3
          h-[calc(100vh-1.5rem)]
          w-48
          m-3
          rounded-2xl
          bg-linear-110 from-[#f1610143] to-[#23222265]
          flex-col items-center justify-between
          py-6
          text-white
        "
      >
        {/* PROFILE */}
        <div className="flex flex-col items-center">
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="
                h-24 w-24
                rounded-full
                object-cover
                border border-[#E85102]/40
                mb-6
              "
            />
          ) : (
            <div
              className="
                h-24 w-24
                rounded-full
                bg-white
                border border-[#E85102]/30
                mb-6
              "
            />
          )}

          <span className="text-md text-gray-100">
            {user?.displayName || "User"}
          </span>
        </div>

        {/* NAVIGATION */}
        <nav className="w-full px-6">
          <ul className="space-y-8 mb-8">
            <li>
              <Link
                to="/dashboard"
                className="flex items-center gap-2 hover:text-[#f16101]"
              >
                <img src={vector} className="w-5" />
                Dashboard
              </Link>
            </li>

            <li>
              <Link
                to="/create"
                className="flex items-center gap-2 hover:text-[#f16101]"
              >
                <img src={vector1} className="w-5" />
                Create Project
              </Link>
            </li>

            <li>
              <Link
                to="/settings"
                className="flex items-center gap-2 hover:text-[#f16101]"
              >
                <img src={vector2} className="w-5" />
                Settings
              </Link>
            </li>

            <li>
              <Link
                to="/account"
                className="flex items-center gap-2 hover:text-[#f16101]"
              >
                <img src={vector3} className="w-5" />
                Account
              </Link>
            </li>

            {/* LOGOUT */}
            <li className="pt-6 border-t border-white/10 mt-6">
              <Link
                to="/logout"
                className="flex items-center gap-2 hover:text-red-400"
              >
                <img src={vector4} className="w-5" />
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* ================= MOBILE TOP ACTIONS ================= */}
      <div className="fixed top-3 right-4 z-50 flex items-center gap-3">
        <img
          src={frame1}
          alt="Theme"
          className="w-8 h-8 cursor-pointer"
        />
        <img
          src={vector5}
          alt="Notifications"
          className="w-8 h-8 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Sidebar;
