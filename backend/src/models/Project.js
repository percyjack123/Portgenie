import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    /* ---------- PROFILE META ---------- */
    meta: {
      fullName: String,
      email: String,
      profession: String,
      tagline: String,
      template: String,
      profilePic: String, // Firebase Storage URL
    },

    /* ---------- DESIGN (OPTIONAL) ---------- */
    design: {
      theme: String,
      style: String,
      tone: String,
    },

    /* ---------- USER CONTENT ---------- */
    content: {
      skills: [String],

      // 🔑 PROJECT TITLES ONLY (YOUR DECISION)
      projects: [String],

      experience: [String],
      education: [String],

      // URLs OR filenames (Firebase Storage URLs preferred)
      certificates: [String],

      links: [String],
    },

    /* ---------- AI OUTPUT ---------- */
    generatedContent: {
      layout: String,
      sectionOrder: [String],
      headline: String,
      about: String,

      theme: {
        background: String,
        text: String,
        accent: String,
      },

      aiFallback: Boolean,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Project", ProjectSchema);
