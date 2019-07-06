import React, { useState, useEffect } from 'react'
import TaskList from '../TaskList';
import "./style.css"



// Declare our selector values here as variables, this way we get a helpful error if we mispell a variable vs. 
// getting no error thrown if we mispell a string.
const ALL = 'ALL';
const OPEN = 'OPEN';
const IN_PROGRESS = 'IN_PROGRESS';
const DONE = 'DONE';



const TaskListSelector = ({ tasks, selectedTasks, trackStatus, handleClick, }) => {
  console.log('tasks:', tasks);
  const [allTasks, setAllTasks] = useState(tasks);
  const [selectTasks, setSelectTasks] = useState([]);
  const [status, setStatus] = useState(OPEN);

  useEffect(() => {
    setAllTasks(tasks)
    setSelectTasks(selectedTasks) // This line defaults the tasks list to show ALL tasks -- eventually want to default to OPEN
  }, [tasks, selectedTasks])

  const userSelectsTasks = status => {
    let selection = allTasks.filter(task => task.status === status);
    status === ALL ? setSelectTasks(tasks) : setSelectTasks(selection);
    setStatus(status)
    trackStatus(status)
  }

  // Passes up the click handler on a task up to the parent (Project) component.
  const handleTaskModal = task => {
    handleClick(task);
  }

  return (
    <div className="tasklist-wrapper">
      <div className="tasklist-container">
        <div className="tasklist-header">
          <h1>TASKS</h1>
          <div id="add-task" onClick={() => handleTaskModal()}>
            +
          </div>
        </div>

        {/* Status buttons */}
        <div className="status-buttons">
          <div className="status">
            <div className={`button-bg ${status === ALL ? 'active' : ''}`} id="all-tasks">
              <button onClick={() => userSelectsTasks(ALL)}>all</button>
            </div>
          </div>
          <div className="status">
            <div className={`button-bg ${status === OPEN ? 'active' : ''}`} id="open-tasks">
              <button onClick={() => userSelectsTasks(OPEN)}>open</button>
            </div>
          </div>
          <div className="status">
            <div className={`button-bg ${status === IN_PROGRESS ? 'active' : ''}`} id="in-progress-tasks">
              <button onClick={() => userSelectsTasks(IN_PROGRESS)}>in progress</button>
            </div>
          </div>
          <div className="status">
            <div className={`button-bg ${status === DONE ? 'active' : ''}`} id="done-tasks">
              <button onClick={() => userSelectsTasks(DONE)}>done</button>
            </div>
          </div>
        </div>

        <TaskList tasks={selectTasks} handleTaskModal={task => handleTaskModal(task)} status={status} />

      </div>
    </div>
  )
}

export default TaskListSelector