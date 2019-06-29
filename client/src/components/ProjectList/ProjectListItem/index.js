import React from "react";
import { Link } from "react-router-dom";

export default function MyProjectsCard({ title, id }) {
  return (
    <div>
      <Link to={`/project/${id}`}> {title} </Link>
    </div>
  );
}
