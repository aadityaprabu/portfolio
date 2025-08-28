import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Welcome from "./Welcome";
import Education from "./Education";
import Work from "./Work";
import Resume from "./Resume";
import Project from "./Project";
import Welcome from "./Welcome";

function ContentView({ portfolio, setIsCanvasLoaded }) {
  const personal = {
    social: {
      github: "https://github.com/aadityaprabu",
      linkedin: "https://www.linkedin.com/in/aadityaprabu/",
      instagram: "https://instagram.com/aadityaprabu",
    },
  };

  return (
    <main>
      <Routes>
        <Route
          path="/"
          element={
            <Welcome
              personal={personal}
              setIsCanvasLoaded={setIsCanvasLoaded}
            />
          }
        />
        <Route path="/resume" element={<Resume />} />
        <Route
          path="/work"
          element={
            <Work work={portfolio?.work} internship={portfolio?.internship} />
          }
        />
        <Route
          path="/education"
          element={<Education education={portfolio?.education} />}
        />
        <Route
          path="/project"
          element={<Project project={portfolio?.project} />}
        />
        {/* <Route path="/other" element={<Other />} /> */}
      </Routes>
    </main>
  );
}

export default ContentView;
