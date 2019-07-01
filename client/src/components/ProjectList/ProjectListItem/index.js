import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

export default function MyProjectsCard({ title, id }) {
  return (
    <Link to={`/project/${id}`}>
      {" "}
      <div className="project-list-item">{title}</div>{" "}
    </Link>
  );
}
