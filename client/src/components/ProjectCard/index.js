import React from "react";
import "./style.css";

export default function ProjectCard({ name, status, created_by }) {
  return (
    <div className="project-card">
      <h2>{name}</h2>
      <div>{status}</div>
      <div>Created By: {created_by}</div>
    </div>
  );
}
