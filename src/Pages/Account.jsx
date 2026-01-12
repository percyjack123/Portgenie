import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";
import { updateProfile } from "firebase/auth";
import { auth } from "../firebase";

const STORAGE_KEY = (uid) => `portgenie_user_${uid}`;

const Account = () => {
  const { user, profile, updateProfileData } = useAuth();

  const [form, setForm] = useState({
    username: "",
    email: "",
    github: "",
    bio: "",
  });

  const [profilePic, setProfilePic] = useState(""); // Base64
  const [saving, setSaving] = useState(false);

  /* ======================
     LOAD DATA
  ====================== */
  useEffect(() => {
    if (!user || !profile) return;

    setForm({
      username: user.displayName || "",
      email: user.email || "",
      github: profile.github || "",
      bio: profile.bio || "",
    });

    setProfilePic(profile.profilePic || "");
  }, [user, profile]);

  /* ======================
     HANDLERS
  ====================== */
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // ✅ Base64 image (LOCAL ONLY)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePic(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUpdate = async () => {
    if (!user) return;

    try {
      setSaving(true);

      // 🔒 Firebase Auth: ONLY displayName
      await updateProfile(auth.currentUser, {
        displayName: form.username,
      });

      // ✅ Update app-level profile (localStorage + context)
      updateProfileData({
        github: form.github,
        bio: form.bio,
        profilePic, // Base64
      });

      alert("Profile updated successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  /* ======================
     RENDER
  ====================== */
  return (
    <div className="flex min-h-screen bg-[#0A0502] text-white">
      <Sidebar />

      <div className="flex-1 flex justify-center mt-10 mb-10 px-4">
        <div className="w-full max-w-[420px] rounded-3xl border border-[#E85102] p-6">

          {/* HEADER */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-[#E85102] text-xl font-semibold">
                Account
              </h1>
              <p className="text-sm text-gray-400">
                Manage your profile
              </p>
            </div>

            {/* PROFILE PIC */}
            <label className="cursor-pointer text-center">
              <div className="h-16 w-16 rounded-full border border-[#E85102] overflow-hidden">
                {profilePic ? (
                  <img
                    src={profilePic}
                    alt="profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-white" />
                )}
              </div>

              <span className="text-xs text-[#E85102] mt-1 block">
                Change
              </span>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          {/* FORM */}
          <div className="space-y-4">
            <div>
              <label className="text-sm">Username</label>
              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                className="w-full bg-transparent border border-[#E85102] rounded-xl px-3 py-2 mt-1 outline-none"
              />
            </div>

            <div>
              <label className="text-sm">Email</label>
              <input
                value={form.email}
                disabled
                className="w-full bg-transparent border border-[#E85102] rounded-xl px-3 py-2 mt-1 outline-none opacity-60"
              />
            </div>

            <div>
              <label className="text-sm">GitHub</label>
              <input
                name="github"
                value={form.github}
                onChange={handleChange}
                className="w-full bg-transparent border border-[#E85102] rounded-xl px-3 py-2 mt-1 outline-none"
              />
            </div>

            <div>
              <label className="text-sm">Bio</label>
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                rows={3}
                className="w-full bg-transparent border border-[#E85102] rounded-xl px-3 py-2 mt-1 outline-none resize-none"
              />
            </div>
          </div>

          <button
            onClick={handleUpdate}
            disabled={saving}
            className="
              w-full mt-6
              border border-[#E85102]
              rounded-xl py-2
              hover:bg-[#E85102]
              hover:text-black
              transition
              disabled:opacity-50
            "
          >
            {saving ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;
