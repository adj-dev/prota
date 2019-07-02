import React, { useState, useEffect } from 'react'
import TaskList from '../TaskList';
import "./style.css"


const TaskListSelector = ({ tasks }) => {
  const [selectedTasks, setSelectedTasks] = useState(tasks);

  useEffect(() => {
    setSelectedTasks(tasks)
  }, [tasks])

  return (
    <div className="tasklist-wrapper">
      <div className="tasklist-container">
        <h1>Tasks</h1>
<br></br>
        {/* Status buttons */}
        <div className="status-buttons">
          <div className="status">
            <button id="all-tasks">all</button>
          </div>
          <div className="status">
            <button id="open-tasks" onClick={(e) => e.preventDefault()}>open</button>
          </div>
          <div className="status">
            <button id="in-progress-tasks">in progress</button>
          </div>
          <div className="status">
            <button id="done-tasks">done</button>
          </div>
        </div>
<br></br>
        <TaskList tasks={selectedTasks} />

      </div>
    </div>
  )
}

export default TaskListSelector