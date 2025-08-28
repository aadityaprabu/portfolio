import React from "react";

function Title() {
  return (
    <header className="p-8 bg-transparent text-[var(--primary)] text-center shadow">
      <h1
        className="text-6xl font-extrabold tracking-tight mb-2 drop-shadow-lg"
        style={{ letterSpacing: "0.05em" }}
      >
        Aaditya Prabu K
      </h1>
      <h2 className="text-2xl mt-4 italic font-light tracking-wide">
        Artist who codes
      </h2>
    </header>
  );
}

export default Title;
