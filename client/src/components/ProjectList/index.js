import React from "react";
import ProjectListItem from "./ProjectListItem";
import "./style.css";

export default function ProjectList({ projects, toggleCreateProjectDialog }) {
  return (
    <div className="wrapper">
      <div className="projectlist-header">
        <h1>Projects</h1>
        <img className="icon add" src={require('../../assets/img/add.png')} alt="" onClick={toggleCreateProjectDialog} />
      </div>
      <div className="projectlist-content">
        {projects.map((project, key) => (
          <ProjectListItem lang="en" key={key} project={project} />
        ))}
        <div className="project-list-gradient" />
      </div>
    </div>
  );
}
