import React from "react";
import API from "../../utils/API";
import "./style.css";

export default function NavBar() {
  const handleLogout = () => {
    API.logout().then(() => {
      window.location = "/login";
    });
  };
  return (
    <div className="nav-bar">
      <div className="nav-item" onClick={() => (window.location = "/")}>
        Logo
      </div>
      <div className="nav-item" onClick={handleLogout}>
        Logout
      </div>
    </div>
  );
}
