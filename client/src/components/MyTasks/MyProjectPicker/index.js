import React, { useState } from "react";
import "./style.css";
import { ALL } from "../../../helpers";

export default function MyProjectPicker({ projects, handleSelectProject }) {
  const [selectedProject, setSelectedProject] = useState(ALL);
  const selectProject = id => {
    setSelectedProject(id);
    handleSelectProject(id);
  };

  return (
    <div className="project-picker-container">
      {projects
        ? projects.map(project => {
            return (
              <div
                className={`project-button ${
                  selectedProject === project._id ? "active" : ""
                }`}
                id={project._id}
                key={project._id}
              >
                <button
                  onClick={() => {
                    selectProject(project._id);
                  }}
                >
                  {project.name}
                </button>
              </div>
            );
          })
        : "No Projects"}
    </div>
  );
}
