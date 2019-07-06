import React from 'react'
import { ALL, OPEN, IN_PROGRESS } from '../../helpers';
import "./styles.css"



const TaskList = ({ tasks, handleTaskModal, status }) => {

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
          <div className="empty-task-list">
            {
              status === ALL ? <p>No tasks are currently assigned to this sprint</p>
                :
                status === OPEN ? <p>No open tasks</p>
                  :
                  status === IN_PROGRESS ? <p>No tasks in progress</p>
                    :
                    <p>No closed tasks</p>
            }
          </div>
      }
    </>
  )
}



export default TaskList