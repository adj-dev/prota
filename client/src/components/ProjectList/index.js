import React from "react";
import ProjectListItem from "./ProjectListItem";

export default function ProjectList({ projects }) {
  return (
    <div>
      {projects.map((project, key) => (
        <ProjectListItem key={key} id={project.id} title={project.title} />
      ))}
    </div>
  );
}
