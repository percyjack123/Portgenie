import express from "express";
import OpenAI from "openai";

const router = express.Router();

// Lazy init (prevents crash if env not loaded instantly)
let openai;

const getOpenAI = () => {
  if (!openai) {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  return openai;
};

/**
 * POST /ai/generate-project-summary
 * Body:
 * {
 *   title: string,
 *   techStack: string[],
 *   description: string
 * }
 */
router.post("/generate-project-summary", async (req, res) => {
  try {
    const { title, techStack, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: "Missing project data" });
    }

    const prompt = `
Rewrite the following project into a concise, professional portfolio description.

Project Title: ${title}
Tech Stack: ${techStack?.join(", ") || "N/A"}
Description: ${description}

Write 3–4 sentences using resume-ready language.
`;

    const response = await getOpenAI().chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({
      summary: response.choices[0].message.content,
    });
  } catch (err) {
    console.error("AI SUMMARY ERROR:", err.message);
    res.status(500).json({ error: "AI summary failed" });
  }
});
// AI PORTFOLIO PLANNER
// AI PORTFOLIO PLANNER (FIXED & SAFE)
router.post("/plan-portfolio", async (req, res) => {
  try {
    const openai = getOpenAI();
    const { meta = {}, content = {} } = req.body;

   const prompt = `
You are an expert portfolio designer.

Decide the best layout and structure based on the user's data.

Rules:
- If user has strong projects → professional
- If user is a fresher → minimal
- If user has many skills + links → creative
- Do NOT include empty sections
- Choose a layout that fits the profile

User Data:
Profession: ${meta.profession}
Projects count: ${content.projects?.length || 0}
Skills count: ${content.skills?.length || 0}
Experience count: ${content.experience?.length || 0}

Return STRICT JSON ONLY:
{
  "layout": "minimal | professional | creative",
  "sectionOrder": ["hero", "projects", "skills"],
  "headline": "One-line headline",
  "about": "Short professional summary",
  "theme": {
    "background": "#0A0502",
    "text": "#ffffff",
    "accent": "#E85102"
  }
}
`;


    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    const text = response.choices[0].message.content;

    // 🔒 Safe JSON parsing
    const parsed = JSON.parse(text);

    res.json(parsed);
  } catch (err) {
  console.error("PORTFOLIO PLANNER ERROR:", err.message);

  // 🔁 FALLBACK LOGIC (NO AI)
  const { meta = {}, content = {} } = req.body;

  const sectionOrder = ["hero"];

  if (content.projects?.length > 0) sectionOrder.push("projects");
  if (content.skills?.length > 0) sectionOrder.push("skills");
  if (content.experience?.length > 0) sectionOrder.push("experience");
  if (content.education?.length > 0) sectionOrder.push("education");
  if (content.certificates?.length > 0) sectionOrder.push("certificates");
  if (content.links?.length > 0) sectionOrder.push("links");

  return res.json({
    layout: meta.template || "professional",
    sectionOrder,
    headline: `${meta.profession || "Developer"} Portfolio`,
    about: meta.tagline || "Passionate about building real-world projects.",
    aiFallback: true
  });
}

});


export default router;
