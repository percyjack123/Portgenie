import React, { useState } from "react";

const Step2Template = ({ data, setData, next, back }) => {
  const [selected, setSelected] = useState({
    theme: data.design?.theme || "",
    style: data.design?.style || "",
    tone: data.design?.tone || ""
  });

  const handleSelect = (group, value) => {
    setSelected(prev => ({ ...prev, [group]: value }));
  };

  const handleNext = () => {
    setData({
      ...data,
      design: selected
    });
    next();
  };

  const Pill = ({ active, label, onClick }) => (
    <button
      onClick={onClick}
      className={`
        px-4 py-1.5 rounded-full text-sm border
        transition
        ${
          active
            ? "bg-[#E85102] text-black border-[#E85102]"
            : "border-[#E85102] text-[#E85102] hover:bg-[#E85102]/10"
        }
      `}
    >
      {label}
    </button>
  );

  return (
    <div className="flex flex-col items-center w-full">

      {/* Title */}
      <h2 className="text-[#E85102] text-sm mb-4">
        Select a template
      </h2>

      {/* Selected Template Preview */}
      <div
        className="
          w-72 h-10 mb-6
          rounded-full
          bg-[#E85102]
          flex items-center justify-center
          text-black text-sm font-medium
        "
      >
        {selected.theme || selected.style || selected.tone
          ? `${selected.theme || ""} ${selected.style || ""} ${selected.tone || ""}`.trim()
          : "Your Selection"}
      </div>

      {/* Card */}
      <div
        className="
          w-[360px]
          rounded-4xl
          border border-[#E85102]
          px-6 py-6
          flex flex-col gap-6
        "
      >
        {/* THEME */}
        <div>
          <p className="text-sm text-gray-300 mb-2">Theme</p>
          <div className="flex gap-2 flex-wrap">
            {["Dark", "Light", "Surprise"].map(opt => (
              <Pill
                key={opt}
                label={opt}
                active={selected.theme === opt}
                onClick={() => handleSelect("theme", opt)}
              />
            ))}
          </div>
        </div>

        {/* STYLE */}
        <div>
          <p className="text-sm text-gray-300 mb-2">Style</p>
          <div className="flex gap-2 flex-wrap">
            {["Minimal", "Bold", "Professional", "Artsy"].map(opt => (
              <Pill
                key={opt}
                label={opt}
                active={selected.style === opt}
                onClick={() => handleSelect("style", opt)}
              />
            ))}
          </div>
        </div>

        {/* TONE */}
        <div>
          <p className="text-sm text-gray-300 mb-2">Tone</p>
          <div className="flex gap-2 flex-wrap ">
            {["Friendly", "Formal", "Corporate", "Creative"].map(opt => (
              <Pill
                key={opt}
                label={opt}
                active={selected.tone === opt}
                onClick={() => handleSelect("tone", opt)}
              />
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <button
            onClick={back}
            className="px-6 py-1.5 rounded-full border border-[#E85102] text-sm text-[#E85102] hover:cursor-pointer"
          >
            back
          </button>
          <button
            onClick={handleNext}
            className="px-6 py-1.5 rounded-full border border-[#E85102] text-sm
                    hover:cursor-pointer   hover:bg-[#E85102] hover:text-black transition"
          >
            next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step2Template;
