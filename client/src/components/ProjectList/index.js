import React from "react";
import ProjectListItem from "./ProjectListItem";
import "./style.css";

export default function ProjectList({ projects, toggleCreateProjectDialog }) {
  return (
    <div className="project-list-container">
      <div className="project-list-header">
        <h1>Projects</h1>
        <div
          className="create-project-button"
          onClick={toggleCreateProjectDialog}
        >
          +
        </div>
      </div>
      <div className="project-list">
        {projects.map((project, key) => (
          <ProjectListItem lang="en" key={key} project={project} />
        ))}
        <div className="project-list-gradient" />
      </div>
    </div>
  );
}
