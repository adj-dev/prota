import React from 'react'
import "./styles.css"



const TaskList = ({ tasks, handleTaskModal }) => {

  // click handler for assigning a task
  const openTaskModal = task => {
    // passes up the task ID up to the direct parent component
    handleTaskModal(task)
  }

  return (
    <>
      {
        tasks.length ?
          tasks.map(task => {
            return (
              <div
                className="task-container"
                key={task._id}
                onClick={() => openTaskModal(task)}
              >
                <div className="task-upper">
                  <span>{task.name}</span>
                  <span>{task.status}</span>
                </div>
                <div className="task-lower">
                  <p>{task.description}</p>
                  {
                    task.assignee ?
                      <img
                        className="sm-avatar"
                        src={task.assignee.avatar_url}
                        alt=""
                      />
                      :
                      <span className="add-contributor">  +  </span>
                  }
                </div>

              </div>
            )
          })
          :
          <div>There are currently no tasks in this sprint</div>
      }
    </>
  )
}



export default TaskList