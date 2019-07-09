import React from "react";
import "./style.css";

const Auth = () => {
  return (
    <div className="auth-container">
      <a
        href={
          process.env.NODE_ENV === "production"
            ? "/auth/github"
            : "http://localhost:3001/auth/github"
        }
      >
        <div className="github-button">Sign in with Github</div>
      </a>
    </div>
  );
};

export default Auth;
