import React from "react";
import "./style.css";

export default function MyProjectPicker({ projects, handleSelectProject }) {
  return (
    <div className="project-picker-container">
      {projects
        ? projects.map(project => {
            return (
              <div
                className="project-button"
                id={project._id}
                key={project._id}
                onClick={() => {
                  handleSelectProject(project._id);
                }}
              >
                {project.name}
              </div>
            );
          })
        : "No Projects"}
    </div>
  );
}
