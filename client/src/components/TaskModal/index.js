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
const TaskModal = ({ handleClick, contributors, currentUser, expandedTask }) => {
  console.log(currentUser);

  return (
    <div className="task-modal-backdrop" onClick={e => handleClick(e)}>
      <div className="task-modal">
        <div className="task-form">
          <div className="task-input">
            <h3>{expandedTask.title}</h3>
            <p>{expandedTask.description}</p>
            <label htmlFor="assign">Assign to:</label>
            {
              contributors.map((contributor, i) => {
                return (
                  <div className="c-list-item" key={i}>
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
          </div>
        </div>
      </div>
    </div>
  )
}



export default TaskModal
