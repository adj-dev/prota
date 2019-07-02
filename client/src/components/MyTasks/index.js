import React, { Component } from "react";
import MyTaskStatusPicker from "./MyTaskStatusPicker";
import MyProjectPicker from "./MyProjectPicker";
import MyTaskList from "./MyTasksList";
import "./style.css";

export default class MyTasks extends Component {
  projects = [...this.props.projects];
  tasks = this.props.tasks;
  username = this.props.username;

  state = {
    selectedProject: "ALL",
    selectedStatus: "OPEN",
    selectedTasks: []
  };

  componentDidMount() {
    //if we recieved projct and task props, set up project and task state
    if (this.projects && this.tasks) {
      if (this.projects[0]._id !== "ALL") {
        //add an "all" projects button to the project selector
        this.projects.unshift({ _id: "ALL", name: "All" });
      }
      //if we have a selected status, get selected tasks
      if (this.state.selectedStatus) {
        let selectedTasks = this.getSelectedTasks(
          this.state.selectedStatus,
          this.state.selectedProject
        );

        this.setState({ selectedTasks });
      }
    }
  }

  selectProject = projectId => {
    console.log("selected: ", projectId);
    let selectedTasks = this.getSelectedTasks(
      this.state.selectedStatus,
      projectId
    );
    this.setState({ selectedTasks, selectedProject: projectId });
  };

  selectStatus = status => {
    console.log("selected: ", status);
    let selectedTasks = this.getSelectedTasks(
      status,
      this.state.selectedProject
    );
    this.setState({ selectedTasks, selectedStatus: status });
  };

  getSelectedTasks = (status, projectId) => {
    let selectedTasks = [];
    if (projectId === "ALL") {
      selectedTasks = this.tasks.filter(task => {
        if (task.status === status) {
          return true;
        }
        return false;
      });
    } else {
      let projectTasks = [];
      let project = this.projects.filter(
        project => project._id === projectId
      )[0];

      project.sprints.forEach(sprint => {
        let sprintTasks = sprint.tasks;

        for (let i in sprintTasks) {
          if (sprintTasks[i].assignee.username === this.props.username) {
            projectTasks.unshift(sprintTasks[i]);
          }
        }
      });
      selectedTasks = projectTasks.filter(task => {
        if (task.status === status) {
          return true;
        }
        return false;
      });
    }
    return selectedTasks;
  };

  render() {
    return (
      <div className="my-tasks-container">
        <div>My Tasks</div>
        <MyProjectPicker
          handleSelectProject={this.selectProject}
          projects={this.projects}
        />
        <MyTaskStatusPicker handleSelectStatus={this.selectStatus} />
        <MyTaskList tasks={this.state.selectedTasks} />
      </div>
    );
  }
}
