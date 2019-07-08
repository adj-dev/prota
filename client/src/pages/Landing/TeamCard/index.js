import React from "react";
import "./style.css";

export default function TeamCard({ imageUrl, name, githubUrl }) {
  return (
    <div className="team-card">
      <a href={githubUrl} alt={name + " Github"} target="_blank" rel="noopener noreferrer">
        <img
          className="profile-image"
          src={imageUrl}
          alt={name + " profile image"}
        />
      </a>
      {name}
    </div>
  );
}
