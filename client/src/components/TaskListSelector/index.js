import React, { useState, useEffect } from 'react'
import TaskList from './TaskList';
import * as STATUS from '../../helpers';
import "./style.css"
import addButtonImg from '../../assets/img/add.png';



const TaskListSelector = ({ tasks, selectedTasks, trackStatus, handleTaskModal, handleChangeStatus }) => {
  const [allTasks, setAllTasks] = useState(tasks);
  const [selectTasks, setSelectTasks] = useState([]);
  const [status, setStatus] = useState(STATUS.OPEN);

  useEffect(() => {
    setAllTasks(tasks)
    setSelectTasks(selectedTasks)
  }, [tasks, selectedTasks])

  const userSelectsTasks = status => {
    let selection = allTasks.filter(task => task.status === status);
    status === STATUS.ALL ? setSelectTasks(tasks) : setSelectTasks(selection);
    setStatus(status)
    trackStatus(status)
  }

  return (
    <div className="wrapper">
      {/* Header */}
      <div className="tasklist-header">
        <h1>Tasks</h1>
        <img className="icon add" src={addButtonImg} alt="+" onClick={handleTaskModal} />
      </div>
      {/* Status buttons */}
      <div className="container selector-row">
        <div className={`button-bg ${status === STATUS.ALL ? 'active' : ''}`} id="all-tasks">
          <button onClick={() => userSelectsTasks(STATUS.ALL)}>all</button>
        </div>
        <div className={`button-bg ${status === STATUS.OPEN ? 'active' : ''}`} id="open-tasks">
          <button onClick={() => userSelectsTasks(STATUS.OPEN)}>open</button>
        </div>
        <div className={`button-bg ${status === STATUS.IN_PROGRESS ? 'active' : ''}`} id="in-progress-tasks">
          <button onClick={() => userSelectsTasks(STATUS.IN_PROGRESS)}>in progress</button>
        </div>
        <div className={`button-bg ${status === STATUS.DONE ? 'active' : ''}`} id="done-tasks">
          <button onClick={() => userSelectsTasks(STATUS.DONE)}>done</button>
        </div>
      </div>
      {/* Task list */}
      <div className="tasklist-content">
        <TaskList
          tasks={selectTasks}
          handleTaskModal={handleTaskModal}
          status={status}
          handleChangeStatus={handleChangeStatus}
        />
      </div>
    </div>
  )
}

export default TaskListSelector