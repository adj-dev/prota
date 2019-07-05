import React from 'react'
import './style.css'

/**
 * Takes three arguments: `handleClick`, `contributors`, and `currentUser`.
 * Maps through contributors and returns a list of all team members.
 * For the contributor that has same name as `currentUser`, it will read
 * "me" instead of `currentUser.display_name`.
 * @param {*} handleClick a reference to an event handler from a parent component
 * @param {*} contributors an array of usernames
 * @param {*} currentUser the current user object
 */
const TaskModal = ({ handleModal, team, currentUser, expandedTask, handleAssign }) => {
  console.log('From the TaskModal', expandedTask);

  return (
    <div className="task-modal-backdrop" onClick={e => handleModal(e)}>
      <div className="task-modal">
        <div className="task-form">
          <div className="task-input">
            <h3>{expandedTask.name}</h3>
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
            }
          </div>
        </div>
      </div>
    </div>
  )
}



export default TaskModal
