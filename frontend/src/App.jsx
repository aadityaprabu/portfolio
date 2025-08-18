import { useEffect, useState } from "react";
import "./App.css";
import Personal from "./components/Personal";
import Education from "./components/Education";
import ChatComponent from "./components/Chat";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import backendApi from "./utils/backendApi";
import Internships from "./components/Internships";
import WorkExperience from "./components/WorkExperience";
import PositionsOfResponsibility from "./components/PositionsOfResponsibility";
import Achievements from "./components/Achievements";

const basePath = import.meta.env.BASE_URL;

function App() {
  const [portfolio, setPortfolio] = useState(0);

  useEffect(() => {
    const loadPortfolioData = async () => {
      const response = await backendApi.get("/portfolio");
      if (response.status === "success") {
        setPortfolio(response.data);
      } else {
        console.error("Error loading portfolio data:", response.message);
      }
    };
    loadPortfolioData();
  }, []);

  useEffect(() => {
    const initFingerprint = async () => {
      try {
        const fp = await FingerprintJS.load();
        const result = await fp.get();
        const headers = { "Content-Type": "application/json" };
        const data = {
          visitorId: result.visitorId,
        };
        backendApi.post("/set-fingerprint-id", data, headers);
        console.log("Fingerprint sent successfully");
      } catch (err) {
        console.error("Error initializing fingerprint:", err);
      }
    };
    initFingerprint();
  }, []);
  console.log(portfolio);
  if (!portfolio) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Personal personal={portfolio.personal} />
      <Education education={portfolio.education} />
      <Internships internships={portfolio.internships} />
      <WorkExperience workExperience={portfolio.workExperience} />
      <Achievements achievements={portfolio.achievements} />
      <PositionsOfResponsibility
        positionsOfResponsibility={portfolio.positionsOfResponsibility}
      />
      <ChatComponent canLoadChat={!!portfolio} />
    </div>
  );
}
export default App;
