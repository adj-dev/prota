import React, { Component } from "react";
import API from "../../../utils/API";
import FuzzyList from "./FuzzyList";
import "./style.css";

export default class SearchUsers extends Component {
  state = {
    users: [],
    userQuery: ""
  };

  handleSelectUser = user => {
    this.props.handleAddUser(user);
    if (!this.props.users.includes(user)) {
      this.setState({ users: [], userQuery: "" });
    }
    //this.setState({ contributorQuery: "" });
  };

  inviteUser = username => {
    this.props.handleInviteUser(username);
    this.setState({ users: [], userQuery: "" });
    //this.setState({ contributorQuery: "" });
  };

  handleInput = field => event => {
    const { value } = event.target;

    if (value === "") return this.setState({ users: [], userQuery: "" });

    API.getUsersFuzzy(value).then(users => {
      console.log(users);
      this.setState({ users, userQuery: value });
    });
  };

  render() {
    return (
      <>
        <input
          // className="search-contributors-input"
          placeholder={`Search for ${this.props.type}`}
          value={this.state.userQuery}
          onChange={this.handleInput("contributorQuery")}
        />
        <FuzzyList
          newUser={this.state.userQuery}
          users={this.state.users}
          handleInviteUser={this.inviteUser}
          handleSelectUser={this.handleSelectUser}
        />
      </>
    );
  }
}
