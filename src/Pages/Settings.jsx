import React from "react";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";

const Settings = () => {
  const { profile, updateProfileData, logOut } = useAuth();

  if (!profile) return null;

  return (
    <div className="flex min-h-screen bg-[#0A0502] text-white">
      <Sidebar />

      <div className="flex-1 flex justify-center mt-10 mb-6">
        <div className="w-[420px] rounded-4xl border border-[#E85102] p-6">

          <h1 className="text-[#E85102] text-xl font-semibold mb-6">
            Settings
          </h1>

          {/* Theme */}
          <div className="mb-6">
            <p className="mb-2">Theme</p>
            <div className="flex gap-4">
              {["dark", "light"].map((t) => (
                <button
                  key={t}
                  onClick={() => updateProfileData({ theme: t })}
                  className={`px-4 py-1 rounded-xl border ${
                    profile.theme === t
                      ? "bg-[#E85102] text-black"
                      : "border-[#E85102] text-[#E85102]"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="mb-6">
            <p className="mb-2">Notifications</p>
            <div className="flex gap-4">
              <button
                onClick={() => updateProfileData({ notifications: true })}
                className={`px-4 py-1 rounded-xl border ${
                  profile.notifications
                    ? "bg-[#E85102] text-black"
                    : "border-[#E85102] text-[#E85102]"
                }`}
              >
                On
              </button>
              <button
                onClick={() => updateProfileData({ notifications: false })}
                className={`px-4 py-1 rounded-xl border ${
                  !profile.notifications
                    ? "bg-[#E85102] text-black"
                    : "border-[#E85102] text-[#E85102]"
                }`}
              >
                Off
              </button>
            </div>
          </div>

          {/* Language */}
          <div className="mb-8">
            <p className="mb-2">Language</p>
            <select
              value={profile.language}
              onChange={(e) =>
                updateProfileData({ language: e.target.value })
              }
              className="w-full bg-transparent border border-[#E85102] rounded-xl px-3 py-1 outline-none"
            >
              <option>English</option>
              <option>Hindi</option>
            </select>
          </div>

          <button
            onClick={logOut}
            className="w-full border border-[#E85102] rounded-xl py-2 text-[#E85102]"
          >
            Logout
          </button>

        </div>
      </div>
    </div>
  );
};

export default Settings;
