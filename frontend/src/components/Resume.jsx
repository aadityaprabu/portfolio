import React, { useState, useEffect } from "react";
const Resume = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 900);
    const handleResize = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="p-8 bg-transparent text-[var(--primary)]">
      <h2 className="text-3xl font-bold mb-4">Resume</h2>
      <a
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-6 py-3 bg-[var(--primary)] text-white rounded-lg font-semibold shadow hover:bg-[var(--primary-dark)] active:bg-[var(--primary-dark)] transition duration-150"
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        Download Resume (PDF)
      </a>
      <div className="mt-8">
        {isMobile ? (
          <div className="bg-yellow-100 text-yellow-800 rounded-lg p-4 text-center">
            PDF preview is not supported on most mobile browsers.
            <br />
            Please use the download button above to view the resume.
          </div>
        ) : (
          <iframe
            src="/resume.pdf"
            title="Resume PDF"
            width="100%"
            height="600px"
            style={{ border: "1px solid #ccc", borderRadius: "8px" }}
          />
        )}
      </div>
    </div>
  );
};

export default Resume;
