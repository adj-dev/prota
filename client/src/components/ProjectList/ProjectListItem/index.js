import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

export default function MyProjectsCard({ project }) {
  return (
    <Link to={`/project/${project._id}`}>
      <div className="project-item">
        <div>
          <div>{project.name}</div>
          <div className="created-by">Created by: {project.created_by}</div>
          {/* <div>
            {new Date(project.created_on)
              .toDateString()
              .split(" ")
              .slice(1, 4)
              .join(" ")}
          </div> */}
        </div>
        <div>
          <div>{project.status}</div>
        </div>
      </div>
    </Link>
  );
}
