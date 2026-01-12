const PortfolioPreview = ({ data }) => {
  const { meta, generatedContent } = data;

  const themeMap = {
    dark: { bg: "#0A0502", text: "#fff", accent: "#E85102" },
    light: { bg: "#fff", text: "#000", accent: "#E85102" },
    amber: { bg: "#1a0e05", text: "#f5f5f5", accent: "#f16101" },
  };

  const theme = themeMap[generatedContent?.theme || "dark"];

  return (
    <div
      className="w-full h-full rounded-2xl p-4 border"
      style={{
        backgroundColor: theme.bg,
        color: theme.text,
        borderColor: theme.accent,
      }}
    >
      <h3 className="text-lg font-semibold">{meta.fullName}</h3>
      <p className="text-sm opacity-70">{meta.profession}</p>

      <div className="flex flex-wrap gap-2 mt-4">
        {(generatedContent.sectionOrder || []).map((s) => (
          <span
            key={s}
            className="text-xs px-2 py-1 rounded-full border"
            style={{ borderColor: theme.accent }}
          >
            {s}
          </span>
        ))}
      </div>

      <p className="text-xs opacity-60 mt-4">
        Layout: {generatedContent.layout}
      </p>
    </div>
  );
};

export default PortfolioPreview;
