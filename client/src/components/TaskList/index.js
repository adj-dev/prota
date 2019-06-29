import React from 'react'
import "./styles.css"

// Dummy data 
const tasks = [
  {
    title: 'new task',
    assignee: 'Andrew',
    status: 'In Progress'
  },
  {
    title: 'new task',
    assignee: 'Andrew',
    status: 'Open'
  },
  {
    title: 'new task',
    assignee: 'Andrew',
    status: 'Done'
  },
  {
    title: 'new task',
    assignee: 'Andrew',
    status: 'In Progress'
  },
  {
    title: 'new task',
    assignee: 'Andrew',
    status: 'In Progress'
  }
]





const TaskList = () => {
  return (
    <div className="tasklist-wrapper">
      <div className="tasklist-container">
        <h1>Tasks</h1>

        {/* Status buttons */}
        <div className="status-buttons">
          <div className="status">
            <button id="open-tasks" onClick={(e) => e.preventDefault()}>Open</button>
          </div>
          <div className="status">
            <button id="in-progress-tasks">In Progress</button>
          </div>
          <div className="status">
            <button id="done-tasks">Done</button>
          </div>
          <div className="status">
            <button id="all-tasks">All</button>
          </div>
        </div>

        {/* Task List */}
        {tasks.map(task => {
          return (
            <div className="task-container">
              <span>{task.title}</span>
              <span>Assigned to: {task.assignee}</span>
              <span>{task.status}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TaskList
