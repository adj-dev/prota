import React, { Component } from "react";
import mockAPI from "../../../utils/mockAPI";
import FuzzyList from "./FuzzyList";
import "./style.css";

export default class SearchContributors extends Component {
  state = {
    users: [],
    contributorQuery: ""
  };

  handleSelectContributor = contributor => {
    this.props.handleAddContributor(contributor);
    if (!this.props.contributors.includes(contributor)) {
      this.setState({ users: [], contributorQuery: "" });
    }
    //this.setState({ contributorQuery: "" });
  };

  handleInput = field => event => {
    const { value } = event.target;

    if (value === "") return this.setState({ users: [], contributorQuery: "" });

    mockAPI.getUsersFuzzy(value).then(users => {
      this.setState({ users, contributorQuery: value });
    });
  };

  render() {
    return (
      <div>
        <input
          className="search-contributors-input"
          placeholder="Search for users"
          value={this.state.contributorQuery}
          onChange={this.handleInput("contributorQuery")}
        />
        <FuzzyList
          newUser={this.state.contributorQuery}
          users={this.state.users}
          handleSelectContributor={this.handleSelectContributor}
        />
      </div>
    );
  }
}
