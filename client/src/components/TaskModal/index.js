import React, { useState } from 'react'

import * as STATUS from '../../helpers';

import './style.css'
import unassignedAvatarImg from '../../../assets/img/unassigned-avatar.png';


// const status = [STATUS.OPEN, STATUS.IN_PROGRESS, STATUS.CLOSED]


const TaskModal = ({ handleModal, team, currentUser, expandedTask, handleTask, context, handleDeleteTask }) => {
  const [taskName, setTaskName] = useState(expandedTask ? expandedTask.name : '')
  const [taskDescription, setTaskDescription] = useState(expandedTask ? expandedTask.description : '')
  const [assignee, setAssignee] = useState(expandedTask ? expandedTask.assignee ? expandedTask.assignee : null : null)
  const [avatar, setAvatar] = useState(expandedTask ? expandedTask.assignee ? expandedTask.assignee.avatar_url : null : null)

  const changeTaskName = e => {
    setTaskName(e.target.value)
  }

  const changeTaskDescription = e => {
    setTaskDescription(e.target.value)
  }

  const handleAssignee = member => {
    if (assignee === member._id) {
      setAssignee(null)
      setAvatar(null)
      return
    }

    setAssignee(member._id)
    setAvatar(member.avatar_url)
  }

  const validate = task => {
    if (task.name.length) {
      handleTask(task)
    }
  }

  return (
    <div className="modal-backdrop" onClick={e => handleModal(e)}>
      <div className="modal">
        <div className="modal-header">
          {context === 'create' ? 'Add Task' : 'Edit Task'}
        </div>
        <form onSubmit={e => {
          e.preventDefault()

          validate({
            id: expandedTask ? expandedTask._id : null,
            name: taskName,
            description: taskDescription,
            assignee: assignee
          })
        }}>
          <div className="modal-input">
            <label htmlFor="taskName">Name</label>
            <input autoFocus type="text" name="taskName" value={taskName} onChange={e => changeTaskName(e)} />
          </div>
          <div className="modal-input">
            <label htmlFor="taskDescription">Description</label>
            <input type="text" name="taskDescription" value={taskDescription} onChange={e => changeTaskDescription(e)} />
          </div>
          <div className="assignee-container">
            <div className="assignee-header">
              <h3>ASSIGNED TO: </h3>
              <img className="assignee-avatar" src={assignee ? avatar : unassignedAvatarImg} alt="" />
            </div>
            <div className="team-member-list">
              {
                team.map((member, i) => {
                  return (
                    <div className="team-member-item" key={i} onClick={() => handleAssignee(member)}>
                      {
                        currentUser.username === member.username ?
                          <>
                            <img className="avatar-sm" src={member.avatar_url} alt="" />
                            <span className="team-member-name">Myself</span>
                          </>
                          :
                          <>
                            <img className="avatar-sm" src={member.avatar_url} alt="" />
                            <span className="team-member-name">{member.display_name}</span>
                          </>
                      }
                    </div>
                  )
                })
              }
            </div>
          </div>

          <div className="status-container">
            <div className="status-header">
              <h3>STATUS:</h3>
              <div id="current-status">
                {
                  expandedTask && expandedTask.status === STATUS.OPEN ?
                    'open'
                    :
                    expandedTask && expandedTask.status === STATUS.IN_PROGRESS ?
                      'in progress'
                      :
                      expandedTask && expandedTask.status === STATUS.DONE ?
                        'done'
                        :
                        null
                }
              </div>
            </div>
          </div>
          <div className="submit-btn">
            <button
              className="add-button"
              type="submit"
            >
              {context === 'create' ? 'Add' : 'Save'}
            </button>
            {
              context === 'edit' ?
                <button
                  className="dlt-button"
                  onClick={e => {
                    e.preventDefault();
                    handleDeleteTask(expandedTask._id);
                  }}
                >
                  Delete
                </button>
                :
                null
            }
          </div>
        </form>
      </div>
    </div>
  )
}



export default TaskModal
