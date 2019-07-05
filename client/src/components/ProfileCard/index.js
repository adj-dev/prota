import React from "react";
import "./style.css";

export default function ProfileCard({
  avatarUrl,
  displayName,
  showDropdown,
  handleMouseHover,
  handleLogout
}) {
  return (
    <div
      onMouseEnter={() => handleMouseHover()}
      onMouseLeave={() => handleMouseHover()}
      className="profile-card-container"
    >
      <img alt="avatar" src={avatarUrl} className="avatar" />
      {showDropdown ? (
        <div className="dropdown-container">
          <div className="dropdown-content">
            <div className="dropdown-item username">{displayName}</div>
            <div className="dropdown-item logout-button" onClick={handleLogout}>
              Logout
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
