import React from 'react'
import "./styles.css"


const TaskList = ({ tasks, handleClick }) => {
  // click handler for assigning a task
  const assignTask = taskId => {
    // passes up the task ID up to the direct parent component
    handleClick(taskId)
  }

  return (
    <>
      {tasks.map(task => {
        return (
          <div className="task-container" key={task.title}>
            <div className="task-upper">
              <span>{task.title}</span>
              <span>{task.status}</span>
            </div>
            <div className="task-lower">
              <p>{task.description}</p>
              {
                task.assignee.avatar_url ?
                  <img className="sm-avatar" src={task.assignee.avatar_url} alt="" />
                  :
                  <span className="add-contributor" onClick={() => assignTask(task.title)}>+</span>
              }
            </div>

          </div>
        )
      })
      }
    </>
  )
}


export default TaskList