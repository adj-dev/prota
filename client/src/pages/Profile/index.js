import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ProjectList from "../../components/ProjectList";
import ProfileCard from "../../components/ProfileCard";
import MyTasks from "../../components/MyTasks";

import API from "../../utils/API";
import "./style.css";
import CreateProject from "../../components/CreateProject";

class Profile extends Component {
  state = {
    user: null,
    tasks: null,
    creatingProject: false
  };

  componentDidMount = async () => {
    if (!this.state.user) {
      let user = await API.getUser().then(user => {
        console.log("User:", user);
        console.log("Projects: ", user.projects);
        return user;
      });
      let tasks = await API.getTasksByUser(user._id).then(tasks => {
        console.log("Tasks:", tasks);
        return tasks;
      });
      this.setState({ user, tasks });
    }
  };

  toggleCreateProjectDialog = e => {
    let targetElement = e.target;
    if (targetElement.closest(".create-project-content-container")) {
      return;
    }

    console.log("Create a Project!");
    this.setState(prevState => {
      return { creatingProject: !prevState.creatingProject };
    });
  };

  render() {
    return (
      <>
        {this.state.user ? (
          <div className="profile-container">
            {this.state.creatingProject ? (
              <CreateProject
                toggleCreateProjectDialog={this.toggleCreateProjectDialog}
                username={this.state.user.username}
              />
            ) : null}
            <div className="profile-left-container">
              <MyTasks
                projects={this.state.user.projects}
                tasks={this.state.tasks}
                username={this.state.user.username}
              />
            </div>
            <div className="profile-right-container">
              <ProfileCard
                avatar_url={this.state.user.avatar_url}
                display_name={this.state.user.display_name}
              />
              {this.state.user.projects ? (
                <ProjectList
                  toggleCreateProjectDialog={this.toggleCreateProjectDialog}
                  projects={this.state.user.projects}
                />
              ) : (
                ""
              )}
            </div>
          </div>
        ) : (
          ""
        )}
      </>
    );
  }
}

export default withRouter(Profile);
