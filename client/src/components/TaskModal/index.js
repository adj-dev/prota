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
const TaskModal = ({ handleModal, contributors, currentUser, expandedTask, handleAssign }) => {
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
                  <p>Assign to:</p>
                  {
                    contributors.map((contributor, i) => {
                      return (
                        <div className="c-list-item" key={i} onClick={() => handleAssign({ contributor })}>
                          {
                            currentUser.display_name === contributor ?
                              <span>Me</span>
                              :
                              <span>{contributor}</span>
                          }
                        </div>
                      )
                    })
                  }
                </>
                :
                <>
                  <p>Assigned to: <span>{expandedTask.assignee}</span></p>
                </>
            }
          </div>
        </div>
      </div>
    </div>
  )
}



export default TaskModal
