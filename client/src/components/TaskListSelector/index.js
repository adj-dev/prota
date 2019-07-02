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

        {/* Status buttons */}
        <div className="status-buttons">
          <div className="status">
            <button id="all-tasks">All</button>
          </div>
          <div className="status">
            <button id="open-tasks" onClick={(e) => e.preventDefault()}>Open</button>
          </div>
          <div className="status">
            <button id="in-progress-tasks">In Progress</button>
          </div>
          <div className="status">
            <button id="done-tasks">Done</button>
          </div>
        </div>

        <TaskList tasks={selectedTasks} />

      </div>
    </div>
  )
}

export default TaskListSelector