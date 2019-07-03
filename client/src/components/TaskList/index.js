import React from 'react'
import "./styles.css"


const TaskList = ({ tasks, handleClick }) => {
  // click handler for assigning a task
  const expandTask = task => {
    // passes up the task ID up to the direct parent component
    handleClick(task)
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
                  <img
                    className="sm-avatar"
                    src={task.assignee.avatar_url}
                    alt=""
                  />
                  :
                  <span
                    className="add-contributor"
                    onClick={() => expandTask({
                      title: task.title,
                      description: task.description,
                      status: task.status
                    })}
                  >
                    +
                  </span>
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