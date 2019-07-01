import React from 'react'
import "./styles.css"

// Dummy data 
const tasks = [
  {
    title: 'new task',
    assignees: {
      id: 'kj23k4jksdkf',
      name: 'Andrew',
      avatar: 'https://avatars0.githubusercontent.com/u/46357543?v=4'
    },
    status: 'In Progress'
  },
  {
    title: 'new task',
    assignee: {},
    status: 'Open'
  },
  {
    title: 'new task',
    assignee: {},
    status: 'Done'
  },
  {
    title: 'new task',
    assignee: {
      id: '4jkcb988u89',
      name: 'Andrew',
      avatar: 'https://avatars0.githubusercontent.com/u/46357543?v=4'
    },
    status: 'In Progress'
  },
  {
    title: 'new task',
    assignee: {
      id: 'nnejmnehrujr84',
      name: 'Andrew',
      avatar: 'https://avatars0.githubusercontent.com/u/46357543?v=4'
    },
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
            <div className="task-container" key={task.assignee.id}>
              <span>{task.title}</span>
              {
                task.assignee.id ?
                  <span>Assigned to: <img className="sm-avatar" src={task.assignee.avatar} alt="" /></span> :
                  <span>Unassigned</span>
              }
              <span>{task.status}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TaskList
