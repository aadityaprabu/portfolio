import React from "react";

const PositionsOfResponsibility = ({ positionsOfResponsibility }) => {
  if (!positionsOfResponsibility || positionsOfResponsibility.length === 0) {
    return <p>No positions of responsibility available.</p>;
  }

  return (
    <div className="positions-of-responsibility">
      <h2>Positions of Responsibility</h2>
      {positionsOfResponsibility.map((pos, index) => (
        <div
          key={index}
          className="position-card"
          style={{
            border: "1px solid #ccc",
            padding: "1rem",
            marginBottom: "1rem",
            borderRadius: "8px",
          }}
        >
          <h3>{pos.role}</h3>
          <p>
            <strong>Organization:</strong> {pos.organization}
          </p>
          <p>
            <strong>Duration:</strong> {pos.dateStart} → {pos.dateEnd}
          </p>
          <p>{pos.description}</p>
        </div>
      ))}
    </div>
  );
};

export default PositionsOfResponsibility;
