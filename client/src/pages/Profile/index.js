import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ProjectList from "../../components/ProjectList";

class Profile extends Component {
  state = {
    projects: [
      { title: "Project 1", id: 1 },
      { title: "Project 2", id: 2 },
      { title: "Final Project", id: 3 }
    ]
  };
  render() {
    return (
      <div>
        {this.props.user.name}
        <ProjectList projects={this.state.projects} />
      </div>
    );
  }
}

export default withRouter(Profile);
