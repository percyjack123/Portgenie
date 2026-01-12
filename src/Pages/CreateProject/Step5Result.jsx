import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  createProject,
  planPortfolio,
} from "../../services/ProjectApi";

/* ---------------- MINI PREVIEW COMPONENT ---------------- */

const MiniPreview = ({ meta, content, generatedContent }) => {
  const accent = "#E85102";
  const bg =
    generatedContent?.layout === "creative"
      ? "#140a04"
      : "#0A0502";

  return (
    <div
      className="w-full h-full rounded-2xl p-6 overflow-hidden"
      style={{ background: bg }}
    >
      <h3 className="text-lg font-bold mb-1">
        {meta.fullName || "Your Name"}
      </h3>
      <p className="text-sm text-gray-400 mb-4">
        {meta.profession || "Your Profession"}
      </p>

      {/* PROJECTS */}
      {content.projects?.length > 0 && (
        <div className="mb-4">
          <p
            className="text-sm font-semibold mb-2"
            style={{ color: accent }}
          >
            Projects
          </p>
          <ul className="space-y-1 text-sm">
            {content.projects.slice(0, 2).map((p, i) => (
              <li
                key={i}
                className="border border-[#E85102]/40 rounded px-2 py-1"
              >
                {typeof p === "string" ? p : p.title}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* SKILLS */}
      {content.skills?.length > 0 && (
        <div>
          <p
            className="text-sm font-semibold mb-2"
            style={{ color: accent }}
          >
            Skills
          </p>
          <div className="flex flex-wrap gap-1 text-xs">
            {content.skills.slice(0, 6).map((s, i) => (
              <span
                key={i}
                className="px-2 py-1 border border-[#E85102]/40 rounded-full"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/* ---------------- MAIN STEP ---------------- */

const Step5Result = ({ data, back }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleFinish = async () => {
    try {
      if (!user) throw new Error("User not logged in");

      const { meta, design, content } = data;
      if (!meta || !content) throw new Error("Wizard data incomplete");

      /* ---- CLEAN CONTENT ---- */
      const cleanContent = {
  skills: content.skills || [],
  experience: content.experience || [],
  education: content.education || [],
  certificates: content.certificates || [],
  links: content.links || [],
  projects: Array.isArray(content.projects)
    ? content.projects.map((p) => String(p))
    : [],
};


      /* ---- AI FALLBACK SAFE ---- */
      let generatedContent = {
        layout: "professional",
        sectionOrder: ["hero", "projects", "skills"],
        aiFallback: true,
      };

      try {
        generatedContent = await planPortfolio({
          meta,
          content: cleanContent,
        });
      } catch {
        // quota-safe fallback
      }

      const payload = {
        userId: user.uid,
        meta,
        design,
        content: cleanContent,
        generatedContent,
      };

      await createProject(payload);
      navigate("/dashboard");
    } catch (err) {
      console.error("SAVE FAILED:", err);
      alert(err.message || "Failed to create project");
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-[#E85102] text-lg mb-6">
        Your Portfolio is Ready
      </h2>

      {/* ===== REAL PREVIEW ===== */}
      <div className="w-[520px] h-[300px] rounded-3xl border border-[#E85102] mb-6">
        <MiniPreview
          meta={data.meta}
          content={data.content}
          generatedContent={data.generatedContent}
        />
      </div>

      <div className="flex gap-4">
        <button
          onClick={back}
          className="border px-6 py-2 rounded-full hover:cursor-pointer"
        >
          Edit
        </button>

        <button
          onClick={handleFinish}
          className="border px-6 py-2 rounded-full bg-[#E85102] text-black hover:cursor-pointer"
        >
          Save & Finish
        </button>
      </div>
    </div>
  );
};

export default Step5Result;
