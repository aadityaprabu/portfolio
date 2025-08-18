import React from "react";

const Internships = ({ internships }) => {
  if (!internships || internships.length === 0) {
    return <p>No internship data available.</p>;
  }

  return (
    <div className="internships">
      <h2>Internships</h2>
      {internships.map((intern, index) => (
        <div
          key={index}
          className="internship-card"
          style={{
            border: "1px solid #ccc",
            padding: "1rem",
            marginBottom: "1rem",
            borderRadius: "8px",
          }}
        >
          <h3>{intern.title}</h3>
          <p>
            <strong>Company:</strong> {intern.company}
          </p>
          <p>
            <strong>Location:</strong> {intern.location}
          </p>
          <p>
            <strong>Duration:</strong> {intern.dateStart} → {intern.dateEnd}
          </p>
          <p>{intern.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Internships;
