import React, { Component } from "react";
import ProjectList from "../../components/ProjectList";
import MyTasks from "../../components/MyTasks";

import API from "../../utils/API";
import "./style.css";
import CreateProject from "../../components/CreateProject";
import NavBar from "../../components/NavBar";

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
          <>
            <NavBar
              avatarUrl={this.state.user.avatar_url}
              displayName={this.state.user.display_name}
            />
            <div className="profile-container">
              {this.state.creatingProject ? (
                <CreateProject
                  toggleCreateProjectDialog={this.toggleCreateProjectDialog}
                  user={this.state.user}
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
          </>
        ) : (
          ""
        )}
      </>
    );
  }
}

export default Profile;
