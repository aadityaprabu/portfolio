import React from "react";

const Education = ({ education }) => {
  if (!education || education.length === 0) {
    return <p>No education data available.</p>;
  }

  return (
    <section>
      <h2>Education</h2>
      {education.map((edu, idx) => (
        <div key={idx} style={{ marginBottom: "1.5rem" }}>
          <h3>
            {edu.degree ? edu.degree + ", " : ""}
            {edu.institution}
          </h3>
          <p>
            <strong>Level:</strong> {edu.level} <br />
            <strong>Location:</strong> {edu.location} <br />
            <strong>Duration:</strong> {edu.dateStart} — {edu.dateEnd} <br />
            {edu.percentage && (
              <>
                <strong>Percentage:</strong> {edu.percentage} <br />
              </>
            )}
            {edu.cgpa && (
              <>
                <strong>CGPA:</strong> {edu.cgpa} <br />
              </>
            )}
            {edu.board && (
              <>
                <strong>Board:</strong> {edu.board} <br />
              </>
            )}
            {edu.degree && (
              <>
                <strong>Degree:</strong> {edu.degree} <br />
              </>
            )}
          </p>
        </div>
      ))}
    </section>
  );
};
export default Education;
