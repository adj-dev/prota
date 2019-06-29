import React, { Component } from "react";

export default class Auth extends Component {
  render() {
    return (
      <div>
        {/* This href will change to /auth/github in production*/}
        <a href="http://localhost:3001/auth/github">Sign in with Github</a>
        {/* <a href="/api/auth/github">Sign in with Github</a> */}
      </div>
    );
  }
}
