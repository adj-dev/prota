import React, { useState } from 'react'
import './style.css'



const TaskModal = ({ handleModal, team, currentUser, expandedTask, handleTask }) => {
  const [taskName, setTaskName] = useState(expandedTask ? expandedTask.name : '')
  const [taskDescription, setTaskDescription] = useState(expandedTask ? expandedTask.description : '')

  const changeTaskName = e => {
    setTaskName(e.target.value)
  }

  const changeTaskDescription = e => {
    setTaskDescription(e.target.value)
  }

  return (
    <div className="modal-backdrop" onClick={e => handleModal(e)}>
      <div className="task-modal">
        <div className="task-form">
          <div className="task-input">
            <label htmlFor="taskName">Name:</label>
            <input type="text" name="taskName" value={taskName} onChange={e => changeTaskName(e)} />
          </div>
          <div className="task-input">
            <label htmlFor="taskDescription">Description:</label>
            <input type="text" name="taskDescription" value={taskDescription} onChange={e => changeTaskDescription(e)} />
          </div>
          <div className="task-button-container" onClick={() => handleTask({ name: taskName, description: taskDescription })}>
            <button className="task-button">
              Add
            </button>
          </div>
          {/* <h3>{expandedTask.name}</h3>
            <p>{expandedTask.description}</p>
            {
              !expandedTask.assignee ?
                <>
                  <p>ASSIGN TO:</p>
                  {
                    team.map((member, i) => {
                      return (
                        <div className="team-member-item" key={i} onClick={() => handleAssign(member)}>
                          {
                            currentUser.username === member.username ?
                              <>
                                <img src={member.avatar_url} alt="" />
                                <span>Me ({member.display_name})</span>
                              </>
                              :
                              <>
                                <img src={member.avatar_url} alt="" />
                                <span>{member.display_name}</span>
                              </>
                          }
                        </div>
                      )
                    })
                  }
                </>
                :
                <>
                  <p>ASSIGNED TO: <span>{expandedTask.assignee.toUpperCase()}</span></p>
                </>
            } */}
        </div>
      </div>
    </div>
  )
}



export default TaskModal
