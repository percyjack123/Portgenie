import React, { useState } from "react";

const Step1Profile = ({ data, setData, next }) => {
  const [form, setForm] = useState({
    template: "",
    fullName: "",
    email: "",
    profession: "",
    tagline: "",
    profilePicFile: null,   // UI ONLY
    profilePic: "",         // STRING for DB
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setForm((prev) => ({
      ...prev,
      profilePicFile: file,      // preview
      profilePic: file.name,     // SAFE string
    }));
  };

  const handleNext = () => {
    // ⛔ DO NOT SEND FILE OBJECT TO BACKEND
    const { profilePicFile, ...safeMeta } = form;

    setData({
      ...data,
      meta: safeMeta,
    });

    next();
  };

  return (
    <div className="flex flex-col items-center w-full">

      <h2 className="text-[#E85102] text-sm mb-4">
        Select a template
      </h2>

      <select
        name="template"
        value={form.template}
        onChange={handleChange}
        className="mb-6 w-64 h-10 px-4 bg-black border border-[#E85102] rounded-full text-white outline-none hover:cursor-pointer"
      >
        <option value="" disabled>Select template</option>
        <option value="minimal">Minimal</option>
        <option value="professional">Professional</option>
        <option value="creative">Creative</option>
        <option value="developer">Developer</option>
      </select>

      <div className="w-[360px] border border-[#E85102] rounded-4xl px-6 py-6 flex flex-col gap-4">

        <div>
          <label className="text-sm text-gray-300">Full Name</label>
          <input
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            className="w-full h-10 mt-1 px-4 bg-transparent border border-[#E85102] rounded-full outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-gray-300">Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full h-10 mt-1 px-4 bg-transparent border border-[#E85102] rounded-full outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-gray-300">Profession</label>
          <input
            name="profession"
            value={form.profession}
            onChange={handleChange}
            className="w-full h-10 mt-1 px-4 bg-transparent border border-[#E85102] rounded-full outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-gray-300">Tagline</label>
          <input
            name="tagline"
            value={form.tagline}
            onChange={handleChange}
            className="w-full h-12 mt-1 px-4 bg-transparent border border-[#E85102] rounded-2xl outline-none"
          />
        </div>

        {/* PROFILE IMAGE */}
        <div>
          <label className="text-sm text-gray-300 mb-2 block">
            Profile Picture
          </label>

          <label className="w-full h-28 flex items-center justify-center border border-dashed border-[#E85102] rounded-2xl cursor-pointer">
            {form.profilePicFile ? (
              <img
                src={URL.createObjectURL(form.profilePicFile)}
                alt="Preview"
                className="h-20 w-20 rounded-full object-cover border border-[#E85102]"
              />
            ) : (
              <span className="text-[#E85102] text-sm">
                Click to upload image
              </span>
            )}

            <input
              type="file"
              accept="image/png,image/jpeg,image/jpg"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        <button
          onClick={handleNext}
          className="mt-4 self-center px-8 py-2 border border-[#E85102] rounded-full hover:bg-[#E85102] hover:cursor-pointer hover:text-black"
        >
          next
        </button>

      </div>
    </div>
  );
};

export default Step1Profile;
