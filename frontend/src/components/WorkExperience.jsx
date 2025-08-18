import React from "react";

const WorkExperience = ({ workExperience }) => {
  if (!workExperience || workExperience.length === 0) {
    return <p>No work experience available.</p>;
  }
  return (
    <div className="work-experience">
      <h2>Work Experience</h2>
      {workExperience.map((job, index) => (
        <div
          key={index}
          className="job-card"
          style={{
            border: "1px solid #ccc",
            padding: "1rem",
            marginBottom: "1rem",
            borderRadius: "8px",
          }}
        >
          <h3>{job.title}</h3>
          <p>
            <strong>Company:</strong> {job.company}
          </p>
          {job.squad && (
            <p>
              <strong>Squad:</strong> {job.squad}
            </p>
          )}
          <p>
            <strong>Location:</strong> {job.location}
          </p>
          <p>
            <strong>Duration:</strong> {job.dateStart} → {job.dateEnd}
          </p>
          <p>{job.description}</p>
        </div>
      ))}
    </div>
  );
};

export default WorkExperience;
