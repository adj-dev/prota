import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ProjectList from "../../components/ProjectList";
import API from "../../utils/API";

class Profile extends Component {
  state = {
    user: null,
    projects: [
      { title: "Project 1", id: 1 },
      { title: "Project 2", id: 2 },
      { title: "Final Project", id: 3 }
    ]
  };
  componentDidMount = () => {
    if (!this.state.user) {
      API.getUser().then(user => {
        this.setState({ user });
      });
    }
  };
  render() {
    return (
      <>
        {this.state.user ? (
          <div>
            <div>{this.state.user.display_name}</div>
            <ProjectList projects={this.state.projects} />
          </div>
        ) : (
          ""
        )}
      </>
    );
  }
}

export default withRouter(Profile);
