import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ProjectList from "../../components/ProjectList";
import ProfileCard from "../../components/ProfileCard";
import MyTasks from "../../components/MyTasks";

import mockAPI from "../../utils/mockAPI";
import "./style.css";

class Profile extends Component {
  state = {
    user: null,
    tasks: null
  };

  componentDidMount = async () => {
    if (!this.state.user) {
      let user = await mockAPI.getUser().then(user => {
        console.log("User:", user);
        return user;
      });
      let tasks = await mockAPI.getTasks(user.username).then(tasks => {
        console.log("Tasks:", tasks);
        return tasks;
      });
      this.setState({ user, tasks });
    }
  };
  render() {
    return (
      <>
        {this.state.user ? (
          <div className="profile-container">
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
                <ProjectList projects={this.state.user.projects} />
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
