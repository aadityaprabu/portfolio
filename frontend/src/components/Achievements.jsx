import React from "react";

const Achievements = ({ achievements }) => {
  if (!achievements || achievements.length === 0) {
    return <p>No achievements available.</p>;
  }

  return (
    <div className="achievements">
      <h2>Achievements</h2>
      {achievements.map((item, index) => (
        <div
          key={index}
          className="achievement-card"
          style={{
            border: "1px solid #ccc",
            padding: "1rem",
            marginBottom: "1rem",
            borderRadius: "8px",
          }}
        >
          <h3>{item.title}</h3>
          <p>
            <strong>Category:</strong> {item.category}
          </p>
          <p>
            <strong>Date:</strong> {item.date}
          </p>
          <p>
            <strong>Level:</strong> {item.level}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Achievements;
