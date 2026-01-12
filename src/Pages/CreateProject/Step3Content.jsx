import React, { useState } from "react";

const TagInput = ({
  label,
  value,
  onChange,
  onAdd,
  items,
  onRemove,
  placeholder,
}) => (
  <div className="mb-6">
    <label className="block text-sm text-gray-300 mb-2">{label}</label>

    <div className="flex gap-3">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            onAdd();
          }
        }}
        placeholder={placeholder}
        className="flex-1 h-10 px-4 bg-transparent border border-[#E85102] rounded-full outline-none text-sm"
      />
      <button
        onClick={onAdd}
        className="px-5 border border-[#E85102] rounded-full text-sm hover:bg-[#E85102] hover:text-black hover:cursor-pointer"
      >
        Add
      </button>
    </div>

    <div className="flex flex-wrap gap-2 mt-3">
      {items.map((item, index) => (
        <span
          key={index}
          className="px-3 py-1 border border-[#E85102] rounded-full text-sm flex items-center gap-2"
        >
          {item}
          <button
            onClick={() => onRemove(index)}
            className="text-xs hover:text-red-400"
          >
            ✕
          </button>
        </span>
      ))}
    </div>
  </div>
);

const Step3Content = ({ data, setData, next, back }) => {
  const [content, setContent] = useState({
    skills: data.content?.skills || [],
    projects: data.content?.projects || [],
    experience: data.content?.experience || [],
    education: data.content?.education || [],
    certificates: data.content?.certificates || [],
    links: data.content?.links || [],
  });

  const [inputs, setInputs] = useState({
    skills: "",
    projects: "",
    experience: "",
    education: "",
    certificates: "",
    links: "",
  });

  const addItem = (key) => {
    if (!inputs[key].trim()) return;

    setContent((prev) => ({
      ...prev,
      [key]: [...prev[key], inputs[key].trim()],
    }));

    setInputs((prev) => ({ ...prev, [key]: "" }));
  };

  const removeItem = (key, index) => {
    setContent((prev) => ({
      ...prev,
      [key]: prev[key].filter((_, i) => i !== index),
    }));
  };

  const handleNext = () => {
    setData({ ...data, content });
    next();
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-[520px] border border-[#E85102] rounded-4xl px-10 py-10">

        <TagInput
          label="Skills"
          value={inputs.skills}
          onChange={(v) => setInputs({ ...inputs, skills: v })}
          onAdd={() => addItem("skills")}
          items={content.skills}
          onRemove={(i) => removeItem("skills", i)}
          placeholder="React"
        />

        <TagInput
          label="Projects (titles only)"
          value={inputs.projects}
          onChange={(v) => setInputs({ ...inputs, projects: v })}
          onAdd={() => addItem("projects")}
          items={content.projects}
          onRemove={(i) => removeItem("projects", i)}
          placeholder="PortGenie"
        />

        <TagInput
          label="Experience"
          value={inputs.experience}
          onChange={(v) => setInputs({ ...inputs, experience: v })}
          onAdd={() => addItem("experience")}
          items={content.experience}
          onRemove={(i) => removeItem("experience", i)}
          placeholder="Frontend Intern at XYZ"
        />

        <TagInput
          label="Education"
          value={inputs.education}
          onChange={(v) => setInputs({ ...inputs, education: v })}
          onAdd={() => addItem("education")}
          items={content.education}
          onRemove={(i) => removeItem("education", i)}
          placeholder="B.Tech CSE – XYZ University"
        />

        <TagInput
          label="Certificates (image or link URLs)"
          value={inputs.certificates}
          onChange={(v) => setInputs({ ...inputs, certificates: v })}
          onAdd={() => addItem("certificates")}
          items={content.certificates}
          onRemove={(i) => removeItem("certificates", i)}
          placeholder="https://certificate-link"
        />

        <TagInput
          label="Links"
          value={inputs.links}
          onChange={(v) => setInputs({ ...inputs, links: v })}
          onAdd={() => addItem("links")}
          items={content.links}
          onRemove={(i) => removeItem("links", i)}
          placeholder="https://github.com/username"
        />

        <div className="flex justify-between mt-10">
          <button
            onClick={back}
            className="px-8 py-2 rounded-full border border-[#E85102] text-[#E85102] hover:cursor-pointer"
          >
            Back
          </button>

          <button
            onClick={handleNext}
            className="px-8 py-2 rounded-full border border-[#E85102]
                       hover:bg-[#E85102] hover:text-black hover:cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step3Content;
