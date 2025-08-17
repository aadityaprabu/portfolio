import React, { useEffect, useState } from "react";

export default function PersonalInfo({ personal }) {
  if (!personal) return <div>Loading personal info...</div>;

  const { fullName, tagline, location, email, website, social } = personal;

  return (
    <section>
      <h1>{fullName}</h1>
      <p>
        <em>{tagline}</em>
      </p>
      <p>{location}</p>
      <p>
        Email: <a href={`mailto:${email}`}>{email}</a>
      </p>
      <p>
        Website:{" "}
        <a href={website} target="_blank" rel="noopener noreferrer">
          {website}
        </a>
      </p>
      <div>
        {social.github && (
          <a href={social.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        )}
        {" | "}
        {social.linkedin && (
          <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        )}
        {" | "}
        {social.instagram && (
          <a href={social.instagram} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
        )}
        {social.youtube && (
          <>
            {" | "}
            <a href={social.youtube} target="_blank" rel="noopener noreferrer">
              YouTube
            </a>
          </>
        )}
      </div>
    </section>
  );
}
