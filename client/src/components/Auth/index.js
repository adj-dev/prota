import React, { Component } from "react";
import "./style.css";

export default class Auth extends Component {
  render() {
    return (
      <div className="auth-container">
        {/* This href will change to /auth/github in production*/}
        <a href="http://localhost:3001/auth/github">
          <div className="github-button">Sign in with Github</div>
        </a>
        {/* <a href="/api/auth/github">Sign in with Github</a> */}
      </div>
    );
  }
}
