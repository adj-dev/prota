import React, { Component } from "react";
import MyTaskStatusPicker from "./MyTaskStatusPicker";
import MyProjectPicker from "./MyProjectPicker";
import MyTaskList from "./MyTasksList";
import { ALL, OPEN } from "../../helpers";
import "./style.css";

export default class MyTasks extends Component {
  projects = [...this.props.projects];
  tasks = this.props.tasks;
  username = this.props.username;

  state = {
    selectedProject: ALL,
    selectedStatus: OPEN,
    selectedTasks: []
  };

  componentDidMount() {
    //if we recieved projcts and task props, set up project and task state
    if (this.projects[0] && this.tasks) {
      if (this.projects[0]._id !== ALL) {
        //add an "all" projects button to the project selector
        this.projects.unshift({ _id: ALL, name: "all" });
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
    if (projectId === ALL) {
      selectedTasks = this.tasks.filter(task => {
        if (status === ALL) {
          return true;
        }
        if (task.status === status) {
          return true;
        }
        return false;
      });
    } else {
      let projectTasks = this.tasks.filter(
        task => task.project_ref === projectId
      );

      selectedTasks = projectTasks.filter(task => {
        if (status === ALL) {
          return true;
        }
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
        <h1>My Tasks</h1>
        <MyProjectPicker
          handleSelectProject={this.selectProject}
          projects={this.projects}
        />
        <MyTaskStatusPicker handleSelectStatus={this.selectStatus} />
        <MyTaskList
          tasks={this.state.selectedTasks}
          status={this.state.selectedStatus}
        />
      </div>
    );
  }
}
