import { useEffect, useState } from "react";
import "./App.css";
import PersonalInfo from "./components/PersonalInfo";
import Education from "./components/Education";
import QuestionAnswering from "./components/QuestionAnswering";
const basePath = import.meta.env.BASE_URL;

function App() {
  const [portfolioData, setPortfolioData] = useState(0);
  useEffect(() => {
    const url = (basePath + "/data.json").replace("//", "/");
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load data.json");
        }
        return response.json();
      })
      .then((data) => setPortfolioData(data))
      .catch((error) => console.error("Error:", error));
  }, []);
  if (!portfolioData) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <PersonalInfo personal={portfolioData.personal} />
      <Education education={portfolioData.education} />
      <QuestionAnswering />
    </div>
  );
}
export default App;
