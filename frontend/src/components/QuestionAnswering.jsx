import React, { useEffect, useState } from "react";

export default function QuestionAnswering() {
  const [answer, setAnswer] = useState(0);
  useEffect(() => {
    const url = import.meta.env.VITE_BACKEND_URL;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load answers");
        }
        return response.json();
      })
      .then((data) => setAnswer(data))
      .catch((error) => console.error("Error:", error));
  }, []);
  if (!answer) return <div>Loading answer..</div>;

  return <section>{answer.message}</section>;
}
