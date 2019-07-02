import React, { useState, useEffect } from 'react'
import TaskList from '../TaskList';
import "./style.css"

// Declare our selector values here as variables, this way we get a helpful error if we mispell a variable vs. 
// getting no error thrown if we mispell the string.
const ALL = 'ALL';
const OPEN = 'OPEN';
const IN_PROGRESS = 'IN_PROGRESS';
const DONE = 'DONE';


const TaskListSelector = ({ tasks }) => {
  const [allTasks, setAllTasks] = useState(tasks);
  const [selectedTasks, setSelectedTasks] = useState(allTasks)
  // const [status, setStatus] = useState(OPEN);

  useEffect(() => {
    setAllTasks(tasks)
    setSelectedTasks(tasks)
  }, [tasks])

  const userSelectsTasks = status => {
    let selection = allTasks.filter(task => task.status === status)
    status === ALL ? setSelectedTasks(tasks) : setSelectedTasks(selection)
  }

  return (
    <div className="tasklist-wrapper">
      <div className="tasklist-container">
        <h1>Tasks</h1>

        {/* Status buttons */}
        <div className="status-buttons">
          <div className="status">
            <button id="all-tasks" onClick={() => userSelectsTasks(ALL)}>All</button>
          </div>
          <div className="status">
            <button id="open-tasks" onClick={() => userSelectsTasks(OPEN)}>Open</button>
          </div>
          <div className="status">
            <button id="in-progress-tasks" onClick={() => userSelectsTasks(IN_PROGRESS)}>In Progress</button>
          </div>
          <div className="status">
            <button id="done-tasks" onClick={() => userSelectsTasks(DONE)}>Done</button>
          </div>
        </div>

        <TaskList tasks={selectedTasks} />

      </div>
    </div>
  )
}

export default TaskListSelector