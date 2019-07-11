import React, { Component } from "react";
import ProjectList from "../../components/ProjectList";
import MyTasks from "../../components/MyTasks";

import API from "../../utils/API";
import "./style.css";
import CreateProject from "../../components/CreateProject";
import NavBar from "../../components/NavBar";
import ProjectCard from "../../components/ProjectCard";

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
        user.projects = user.projects.reverse();
        return user;
      });
      let tasks = await API.getTasksByUser(user._id).then(tasks => {
        console.log("Tasks:", tasks);
        return tasks;
      });
      this.setState({ user, tasks });
    }
  };

  handleChangeStatus = (taskId, status) => {
    API.updateTask(taskId, { status }).then(newTask => {
      newTask.assignee = newTask.assignee._id;
      let newTasks = this.state.tasks.map(task => {
        if (task._id === taskId) {
          return newTask;
        } else {
          return { ...task };
        }
      });
      console.log("Previous Tasks:");
      console.table(this.state.tasks);
      console.log("New Tasks:");
      console.table(newTasks);
      this.setState({ tasks: newTasks });
    });
  };

  toggleCreateProjectDialog = e => {
    let targetElement = e.target;
    if (targetElement.closest(".modal")) {
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
            <div className="page">
              {this.state.creatingProject ? (
                <CreateProject
                  toggleCreateProjectDialog={this.toggleCreateProjectDialog}
                  user={this.state.user}
                />
              ) : null}

              <div className="row">
                <div className="col full">
                  <ProjectCard
                    project={{ name: this.state.user.display_name }}
                    team={[]}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col half">
                  {this.state.user.projects ? (
                    <ProjectList
                      toggleCreateProjectDialog={this.toggleCreateProjectDialog}
                      projects={[...this.state.user.projects]}
                    />
                  ) : (
                      ""
                    )}
                </div>
                <div className="col half">
                  <MyTasks
                    handleChangeStatus={this.handleChangeStatus}
                    projects={this.state.user.projects}
                    tasks={this.state.tasks}
                    username={this.state.user.username}
                  />
                </div>
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
