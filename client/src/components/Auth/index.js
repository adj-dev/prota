import React, { Component } from "react";
import "./style.css";

export default class Auth extends Component {
  render() {
    return (
      <div className="auth-container">
        {/* DEVELOPMENT: http://localhost:3001/auth/github */}
        {/* PRODUCTION: /auth/github */}
        <a href="/auth/github">
          <div className="github-button">Sign in with Github</div>
        </a>
        {/* <a href="/api/auth/github">Sign in with Github</a> */}
      </div>
    );
  }
}
