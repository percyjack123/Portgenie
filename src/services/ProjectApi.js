const API_BASE = "http://localhost:5000";

/* =========================
   CREATE / SAVE PROJECT
========================= */
export const createProject = async (projectData) => {
  const res = await fetch(`${API_BASE}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(projectData),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to save project");
  }

  return res.json();
};

/* =========================
   AI: PROJECT SUMMARY
========================= */
export const generateProjectSummary = async (project) => {
  const res = await fetch(`${API_BASE}/ai/generate-project-summary`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(project),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "AI summary failed");
  }

  return res.json(); // { summary: "..." }
};

/* =========================
   AI: PORTFOLIO PLANNER
========================= */
export const planPortfolio = async (portfolioData) => {
  const res = await fetch(`${API_BASE}/ai/plan-portfolio`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(portfolioData),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Portfolio planning failed");
  }

  return res.json(); 
  /*
    {
      layout,
      sectionOrder,
      headline,
      about,
      aiFallback?
    }
  */
};

/* =========================
   DASHBOARD: USER PROJECTS
========================= */
export const getUserProjects = async (userId) => {
  const res = await fetch(`${API_BASE}/projects/user/${userId}`);

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to fetch user projects");
  }

  return res.json(); // array of projects
};

/* =========================
   PORTFOLIO: PUBLIC VIEW
========================= */
export const getPortfolio = async (userId) => {
  const res = await fetch(`${API_BASE}/projects/portfolio/${userId}`);

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to fetch portfolio");
  }

  return res.json(); // single project (latest)
};
// DELETE PORTFOLIO
export const deleteProject = async (projectId) => {
  const res = await fetch(`http://localhost:5000/projects/${projectId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete portfolio");
  }

  return res.json();
};
