import React from "react";
import ProjectListItem from "./ProjectListItem";
import "./style.css";

export default function ProjectList({ projects, toggleCreateProjectDialog }) {
  return (
    <div className="project-list-container">
      <div className="project-list">
        {projects.map((project, key) => (
          <ProjectListItem key={key} id={project._id} title={project.name} />
        ))}
      </div>
      <div
        className="create-project-button"
        onClick={toggleCreateProjectDialog}
      >
        +
      </div>
    </div>
  );
}
