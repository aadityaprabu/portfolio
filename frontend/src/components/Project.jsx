import React, { useState } from "react";

const Loading = () => (
  <div className="flex items-center justify-center h-full">
    <svg
      className="animate-spin h-8 w-8 text-[var(--primary)]"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v8z"
      />
    </svg>
    <span className="ml-2 text-lg text-[var(--primary)]">Loading...</span>
  </div>
);

const Project = ({ project }) => {
  const safeProject = Array.isArray(project) ? project : [];
  if (safeProject.length === 0) {
    return <Loading />;
  }
  const sortedProjects = [...safeProject].sort((a, b) => {
    const parseDate = (date) => {
      if (!date) return 0;
      const [year, month] = date.split("-");
      return new Date(Number(year), Number(month) - 1).getTime();
    };
    return parseDate(b.dateStart) - parseDate(a.dateStart);
  });
  return (
    <div className="max-w-6xl mx-auto py-16">
      <h2 className="text-4xl font-extrabold text-center mb-10 text-[var(--primary)]">
        Projects
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {sortedProjects.map((item, idx) => {
          return (
            <div
              key={idx}
              className="bg-white/80 rounded-xl shadow-lg border border-[var(--primary)] p-6 flex flex-col transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl aspect-square justify-between"
              style={{ minHeight: "300px", minWidth: "300px" }}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-2sm font-bold">{item.title}</h3>
                <span className="text-sm font-semibold">
                  {item.dateStart} - {item.dateEnd}
                </span>
              </div>
              {item.toolsAndTechnology && (
                <div className="mb-2 text-sm font-medium">
                  <span className="font-semibold">Tools &amp; Tech:</span>{" "}
                  {item.toolsAndTechnology}
                </div>
              )}
              <div className="mb-2 text-base mt-2 overflow-y-auto max-h-32 w-full text-left">
                <div
                  className="w-full text-justify"
                  style={{
                    height: "auto",
                    maxHeight: "none",
                    overflow: "visible",
                  }}
                >
                  {item.description}
                </div>
              </div>
              <div className="flex gap-4 mt-auto pt-4">
                {Array.isArray(item.githubLink) &&
                  item.githubLink.length > 0 &&
                  item.githubLink.map((link, idx) => (
                    <a
                      key={idx}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-black text-white rounded hover:bg-gray-800 transition"
                      onClick={(e) => e.stopPropagation()}
                    >
                      GitHub
                      {item.githubLink.length > 1 ? `\u00A0#${idx + 1}` : ""}
                    </a>
                  ))}
                {item.demoLink && (
                  <a
                    href={item.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-[var(--primary)] text-white rounded transition hover:brightness-110"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Demo
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Project;
