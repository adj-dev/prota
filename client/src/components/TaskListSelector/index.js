import React, { useState, useEffect } from 'react'
import TaskList from './TaskList';
import * as STATUS from '../../helpers';
import "./style.css"



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

  // Passes up the click handler on a task up to the parent (Project) component.
  // const handleTaskModal = task => {
  //   handleClick(task);
  // }

  return (
    <div className="wrapper">
      <div className="tasklist-header">
        <h1>Tasks</h1>
        <div id="add-task" onClick={() => handleTaskModal()}>
          +
          </div>
      </div>

      {/* Status buttons */}
      <div className="status-buttons">
        <div className="status">
          <div className={`button-bg ${status === STATUS.ALL ? 'active' : ''}`} id="all-tasks">
            <button onClick={() => userSelectsTasks(STATUS.ALL)}>all</button>
          </div>
        </div>
        <div className="status">
          <div className={`button-bg ${status === STATUS.OPEN ? 'active' : ''}`} id="open-tasks">
            <button onClick={() => userSelectsTasks(STATUS.OPEN)}>open</button>
          </div>
        </div>
        <div className="status">
          <div className={`button-bg ${status === STATUS.IN_PROGRESS ? 'active' : ''}`} id="in-progress-tasks">
            <button onClick={() => userSelectsTasks(STATUS.IN_PROGRESS)}>in progress</button>
          </div>
        </div>
        <div className="status">
          <div className={`button-bg ${status === STATUS.DONE ? 'active' : ''}`} id="done-tasks">
            <button onClick={() => userSelectsTasks(STATUS.DONE)}>done</button>
          </div>
        </div>
      </div>

      <TaskList
        tasks={selectTasks}
        handleTaskModal={handleTaskModal}
        status={status}
        handleChangeStatus={handleChangeStatus}
      />
    </div>
  )
}

export default TaskListSelector