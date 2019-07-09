import React, { useState, useEffect } from "react";
import MyTaskStatusPicker from "./MyTaskStatusPicker";
import MyProjectPicker from "./MyProjectPicker";
import MyTaskList from "./MyTasksList";
import { ALL, OPEN } from "../../helpers";
import "./style.css";

const MyTasks = ({ projects, handleChangeStatus, tasks }) => {
  const projectList = [{ _id: ALL, name: "all" }, ...projects];
  const [selectedProject, setSelectedProject] = useState(ALL);
  const [selectedStatus, setSelectedStatus] = useState(OPEN);
  const [selectedTasks, setSelectedTasks] = useState([]);

  //fires when a user selects a project
  const selectProject = projectId => {
    let selectedTasks = getSelectedTasks(selectedStatus, projectId);

    setSelectedTasks(selectedTasks);
    setSelectedProject(projectId);
  };

  // fires when a user selects a status
  const selectStatus = status => {
    let selectedTasks = getSelectedTasks(status, selectedProject);

    setSelectedTasks(selectedTasks);
    setSelectedStatus(status);
  };

  // will return the proper subset of a user's task based on their selected project and status
  const getSelectedTasks = (status, projectId) => {
    let selectedTasks = [];
    if (projectId === ALL) {
      selectedTasks = tasks.filter(task => {
        if (status === ALL) {
          return true;
        }
        if (task.status === status) {
          return true;
        }
        return false;
      });
    } else {
      let projectTasks = tasks.filter(task => task.project_ref === projectId);

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

  // set selectedTasks anytime we recieve a new tasks prop
  // (this will fire whenever a user selects a project or a task changes or when a task's status changes)
  useEffect(() => {
    //if we recieved projcts and task props, set up project and task state
    if (projectList[0] && tasks) {
      //if we have a selected status, get selected tasks
      if (selectedStatus) {
        let selectedTasks = getSelectedTasks(selectedStatus, selectedProject);
        setSelectedTasks(selectedTasks);
      }
    }
    // eslint-disable-next-line
  }, [tasks]);

  return (
    <div className="my-tasks-container">
      <h1>My Tasks</h1>
      <MyProjectPicker
        handleSelectProject={selectProject}
        projects={projectList}
      />
      <MyTaskStatusPicker handleSelectStatus={selectStatus} />
      <MyTaskList
        handleChangeStatus={handleChangeStatus}
        tasks={selectedTasks}
        status={selectedStatus}
      />
    </div>
  );
};

export default MyTasks;
