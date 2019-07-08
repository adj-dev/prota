import React, { useState, useEffect } from "react";
import MyTaskStatusPicker from "./MyTaskStatusPicker";
import MyProjectPicker from "./MyProjectPicker";
import MyTaskList from "./MyTasksList";
import { ALL, OPEN } from "../../helpers";
import "./style.css";

const MyTasks = ({ projects, username, handleChangeStatus, tasks }) => {
  const [selectedProject, setSelectedProject] = useState(ALL);
  const [selectedStatus, setSelectedStatus] = useState(OPEN);
  const [selectedTasks, setSelectedTasks] = useState([]);

  const selectProject = projectId => {
    console.log("selected: ", projectId);
    let selectedTasks = getSelectedTasks(selectedStatus, projectId);

    setSelectedTasks(selectedTasks);
    setSelectedProject(projectId);
  };

  const selectStatus = status => {
    console.log("selected: ", status);
    let selectedTasks = getSelectedTasks(status, selectedProject);
    setSelectedTasks(selectedTasks);
    setSelectedStatus(status);
  };

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

  useEffect(() => {
    console.log("My Tasks mounting with selected tasks:");
    console.table(selectedTasks);
    //if we recieved projcts and task props, set up project and task state
    if (projects[0] && tasks) {
      if (projects[0]._id !== ALL) {
        //add an "all" projects button to the project selector
        projects.unshift({ _id: ALL, name: "all" });
      }
      //if we have a selected status, get selected tasks
      if (selectedStatus) {
        let selectedTasks = getSelectedTasks(selectedStatus, selectedProject);
        setSelectedTasks(selectedTasks);
      }
    }
  }, [tasks]);

  return (
    <div className="my-tasks-container">
      <h1>My Tasks</h1>
      <MyProjectPicker
        handleSelectProject={selectProject}
        projects={projects}
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
