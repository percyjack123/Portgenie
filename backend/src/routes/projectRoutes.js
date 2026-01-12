import express from "express";
import Project from "../models/Project.js";

const router = express.Router();

/* =========================
   CREATE PROJECT
========================= */
router.post("/", async (req, res) => {
  try {
    console.log("INCOMING PROJECT PAYLOAD:");
    console.log(JSON.stringify(req.body, null, 2));

    if (!req.body.userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    const project = new Project({
      userId: req.body.userId,

      meta: req.body.meta || {},
      design: req.body.design || {},
      content: {
        skills: req.body.content?.skills || [],
        projects: req.body.content?.projects || [],
        experience: req.body.content?.experience || [],
        education: req.body.content?.education || [],
        certificates: req.body.content?.certificates || [],
        links: req.body.content?.links || [],
      },

      aiPrompt: req.body.aiPrompt || "",
      generatedContent: req.body.generatedContent || {},
    });

    await project.save();

    res.status(201).json(project);
  } catch (error) {
    console.error("❌ PROJECT SAVE ERROR:");
    console.error(error);

    res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
});


/* =========================
   GET ALL PROJECTS (DASHBOARD)
========================= */
router.get("/user/:userId", async (req, res) => {
  try {
    const projects = await Project.find({
      userId: req.params.userId,
    }).sort({ createdAt: -1 });

    res.json(projects);
  } catch (err) {
    console.error("FETCH PROJECTS ERROR:", err.message);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

/* =========================
   GET PORTFOLIO (PUBLIC)
========================= */
router.get("/portfolio/:userId", async (req, res) => {
  try {
    const portfolio = await Project.findOne({
      userId: req.params.userId,
    }).sort({ createdAt: -1 });

    if (!portfolio) {
      return res.status(404).json({ error: "Portfolio not found" });
    }

    res.json(portfolio);
  } catch (err) {
    console.error("FETCH PORTFOLIO ERROR:", err.message);
    res.status(500).json({ error: "Failed to fetch portfolio" });
  }
});
// DELETE portfolio by ID
router.delete("/:projectId", async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.projectId);

    if (!deleted) {
      return res.status(404).json({ error: "Portfolio not found" });
    }

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete portfolio" });
  }
});

export default router;
