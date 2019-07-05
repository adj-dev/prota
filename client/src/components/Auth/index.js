import React, { Component } from "react";
import "./style.css";

export default class Auth extends Component {
  render() {
    return (
      <div className="auth-container">
        <a href={process.env.NODE_ENV === 'production' ? '/auth/github' : 'http://localhost:3001/auth/github'}>
          <div className="github-button">Sign in with Github</div>
        </a>
      </div>
    );
  }
}
