import React from "react";
import ProjectListItem from "./ProjectListItem";

export default function ProjectList({ projects }) {
  return (
    <div>
      {projects.map((project, key) => (
        <ProjectListItem key={key} id={project._id} title={project.name} />
      ))}
    </div>
  );
}
