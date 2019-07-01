import React from "react";
import "./style.css";

export default function ProfileCard({ avatar_url, display_name }) {
  return (
    <div className="profile-card-container">
      <img alt="avatar" src={avatar_url} className="avatar" />
      <div>{display_name}</div>
    </div>
  );
}
