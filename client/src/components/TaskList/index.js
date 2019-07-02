import React from 'react'
import "./styles.css"


const TaskList = ({ tasks }) => {
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
                task.assignee.username ?
                  <img className="sm-avatar" src={task.assignee.avatar_url} alt="" />
                  :
                  <span>Avatar Img</span>
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