import React from 'react'
import StatusDropdown from '../../StatusDropdown'

import { ALL, OPEN, IN_PROGRESS } from '../../../helpers';
import "./style.css"



const TaskList = ({ tasks, handleTaskModal, status, handleChangeStatus }) => {

  // // click handler for assigning a task
  // const openTaskModal = (e, task) => {
  //   // passes up the task ID up to the direct parent component
  //   handleTaskModal(e, task)
  // }

  return (
    <>
      {
        tasks.length ?
          tasks.map(task => {
            return (
              <div
                className="task-item"
                key={task._id}
                onClick={e => handleTaskModal(e, task)}
              >
                <div className="task-upper">
                  <span className="task-name">{task.name}</span>
                  {/* <span className="task-status">{task.status}</span> */}
                  <StatusDropdown
                    selectedStatus={task.status}
                    taskId={task._id}
                    handleChangeStatus={handleChangeStatus}
                  />
                </div>
                <div className="task-lower">
                  <p className="task-description">{task.description}</p>
                  {
                    task.assignee ?
                      <img
                        className="sm-avatar"
                        src={task.assignee.avatar_url}
                        alt=""
                      />
                      :
                      <img className="unassigned-avatar" src={require('../../../assets/img/unassigned-avatar.png')} alt=""></img>
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