import React, { useState } from "react";

const Step4Prompt = ({ data, setData, next, back }) => {
  const [prompt, setPrompt] = useState(
    data.aiPrompt || ""
  );

  const handleNext = () => {
    setData({
      ...data,
      aiPrompt: prompt
    });
    next();
  };

  return (
    <div className="flex flex-col items-center w-full">

      {/* Title */}
      <h2 className="text-[#E85102] text-lg mb-8 tracking-wide">
        AI PROMPT
      </h2>

      {/* Prompt Card */}
      <div
        className="
          w-[520px]
          rounded-4xl
          border border-[#E85102]
          px-10 py-15
          flex flex-col 
        "
      >
        {/* Input */}
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe how you want your portfolio to look and feel..."
          rows={4}
          className="
            w-full
            resize-none
            bg-transparent
            border border-[#E85102]
            rounded-2xl
            px-5 py-4
            text-sm
            outline-none
            placeholder-gray-500
          "
        />

        {/* Helper text (subtle, optional but good UX) */}
        <p className="text-xs text-gray-400 mt-3">
          Example: A clean, modern portfolio focused on frontend development with a dark theme.
        </p>

        {/* Navigation */}
        <div className="flex justify-between mt-10">
          <button
            onClick={back}
            className="
              px-8 py-2
              rounded-full
              border border-[#E85102]
              text-sm
              text-[#E85102] hover:cursor-pointer
            "
          >
            back
          </button>

          <button
            onClick={handleNext}
            className="
              px-8 py-2
              rounded-full
              border border-[#E85102]
              text-sm
              hover:bg-[#E85102]
              hover:text-black
              transition hover:cursor-pointer
            "
          >
            next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step4Prompt;
