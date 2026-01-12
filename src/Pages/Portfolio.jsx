import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPortfolio } from "../services/ProjectApi";
import { LAYOUTS } from "../layouts/layoutConfig";

const DEFAULT_SECTION_ORDER = [
  "hero",
  "about",
  "projects",
  "skills",
  "experience",
  "education",
  "certificates",
  "links",
];

/* ---------- HELPERS ---------- */
const isImage = (url = "") =>
  url.match(/\.(jpg|jpeg|png|webp)$/i);

const isURL = (str = "") =>
  str.startsWith("http");

/* ---------- SECTION ---------- */
const Section = ({ title, accent, children }) => (
  <section className="space-y-6">
    <h2 className="text-2xl font-semibold" style={{ color: accent }}>
      {title}
    </h2>
    {children}
  </section>
);

const Portfolio = () => {
  const { userId } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    getPortfolio(userId)
      .then(setPortfolio)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading portfolio…
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Portfolio not found
      </div>
    );
  }

  const { meta = {}, content = {}, generatedContent = {} } = portfolio;

  /* ---------- LAYOUT + THEME ---------- */
  const layoutKey = generatedContent.layout || "professional";
  const layout = LAYOUTS[layoutKey] || LAYOUTS.professional;

  const theme = generatedContent.theme || {
    background: "#0A0502",
    text: "#ffffff",
    accent: "#E85102",
  };

  const sectionOrder =
    generatedContent.sectionOrder?.length > 0
      ? generatedContent.sectionOrder
      : DEFAULT_SECTION_ORDER;

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: theme.background,
        color: theme.text,
      }}
    >
      <div
        className={`mx-auto px-8 py-24 ${layout.container} ${layout.sectionGap}`}
      >

       {/* ================= HERO ================= */}
<section className="flex items-center gap-10 flex-wrap mb-24">

  {/* PROFILE IMAGE */}
  <div
    className="w-32 h-32 rounded-full border overflow-hidden shrink-0"
    style={{ borderColor: theme.accent }}
  >
    {meta.profilePic ? (
      <img
        src={meta.profilePic}
        alt="profile"
        className="w-full h-full object-cover"
      />
    ) : (
      <div className="w-full h-full bg-gray-300" />
    )}
  </div>

  {/* TEXT */}
  <div className="max-w-2xl space-y-3">
    <h1 className={`${layout.heading} leading-tight`}>
      {meta.fullName}
    </h1>

    <p className="text-lg opacity-80">
      {meta.profession}
    </p>

    {/* 🔑 TAGLINE / SUMMARY */}
    {meta.tagline && (
      <p className="text-base opacity-70 leading-relaxed mt-4">
        {meta.tagline}
      </p>
    )}
  </div>
</section>


        {/* ================= ABOUT ================= */}
        {sectionOrder.includes("about") && meta.tagline && (
          <Section title="About" accent={theme.accent}>
            <p className="opacity-80 leading-relaxed">
              {meta.tagline}
            </p>
          </Section>
        )}

        {/* ================= PROJECTS ================= */}
        {content.projects?.length > 0 && (
          <Section title="Projects" accent={theme.accent}>
            <ul className="space-y-4">
              {content.projects.map((p, i) => (
                <li
                  key={i}
                  className="p-5 rounded-xl border"
                  style={{ borderColor: `${theme.accent}55` }}
                >
                  <p className="font-semibold text-lg">
                    {typeof p === "string" ? p : p.title}
                  </p>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* ================= SKILLS ================= */}
        {content.skills?.length > 0 && (
          <Section title="Skills" accent={theme.accent}>
            <div className="flex flex-wrap gap-3">
              {content.skills.map((s, i) => (
                <span
                  key={i}
                  className="px-4 py-2 rounded-full border text-sm"
                  style={{ borderColor: `${theme.accent}55` }}
                >
                  {s}
                </span>
              ))}
            </div>
          </Section>
        )}

        {/* ================= EXPERIENCE ================= */}
        {content.experience?.length > 0 && (
          <Section title="Experience" accent={theme.accent}>
            <ul className="space-y-2 opacity-80">
              {content.experience.map((e, i) => (
                <li key={i}>{e}</li>
              ))}
            </ul>
          </Section>
        )}

        {/* ================= EDUCATION ================= */}
        {content.education?.length > 0 && (
          <Section title="Education" accent={theme.accent}>
            <ul className="space-y-2 opacity-80">
              {content.education.map((e, i) => (
                <li key={i}>{e}</li>
              ))}
            </ul>
          </Section>
        )}

        {/* ================= CERTIFICATES ================= */}
        {content.certificates?.length > 0 && (
          <Section title="Certificates" accent={theme.accent}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {content.certificates.map((c, i) => (
                <div
                  key={i}
                  className="border rounded-xl p-3"
                  style={{ borderColor: `${theme.accent}55` }}
                >
                  {isImage(c) ? (
                    <img
                      src={c}
                      alt="certificate"
                      className="rounded-lg w-full h-48 object-cover"
                    />
                  ) : isURL(c) ? (
                    <a
                      href={c}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: theme.accent }}
                      className="underline"
                    >
                      View Certificate
                    </a>
                  ) : (
                    <span>{c}</span>
                  )}
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* ================= LINKS ================= */}
        {content.links?.length > 0 && (
          <Section title="Links" accent={theme.accent}>
            <ul className="space-y-2">
              {content.links.map((l, i) => (
                <li key={i}>
                  <a
                    href={l}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: theme.accent }}
                    className="hover:underline"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </Section>
        )}

      </div>
    </div>
  );
};

export default Portfolio;
