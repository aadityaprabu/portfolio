import "./App.css";
import "./theme.css";
import Title from "./components/Title";
import Navbar from "./components/Navbar";
import ContentView from "./components/ContentView";
import { BrowserRouter as Router } from "react-router-dom";
import { useState, useEffect } from "react";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import backendApi from "./utils/backendApi";
function App() {
  const [portfolio, setPortfolio] = useState(null);
  const [isCanvasLoaded, setIsCanvasLoaded] = useState(false);
  useEffect(() => {
    const fetchPortfolio = async () => {
      const response = await backendApi.get("/portfolio");
      if (response.status === "success") {
        setPortfolio(response.data);
      } else {
        console.error("Error fetching portfolio data:", response.message);
      }
    };
    fetchPortfolio();
  }, []);
  useEffect(() => {
    const initFingerprint = async () => {
      try {
        const fp = await FingerprintJS.load();
        const result = await fp.get();
        console.log(result.visitorId);
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
  return (
    <div className="app">
      <>
        <Title />
        <Router>
          <Navbar />

          <ContentView
            portfolio={portfolio}
            setIsCanvasLoaded={setIsCanvasLoaded}
          />
        </Router>
      </>
      {!isCanvasLoaded && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-[9999]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-6"></div>
          <p className="text-2xl font-semibold text-blue-600">
            Loading your avatar and animations...
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
