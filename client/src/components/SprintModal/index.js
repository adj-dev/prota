import React, { useState } from 'react'
import './style.css'

const SprintModal = ({ sprint, handleModal, handleSprint }) => {
  console.log('sprint modal:', sprint)
  const [sprintName, setSprintName] = useState(sprint ? sprint.name : '');

  const changeSprintName = e => {
    setSprintName(e.target.value);
  }

  return (
    <div className="modal-backdrop" onClick={e => handleModal(e)}>
      <div className="sprint-modal">
        <form onSubmit={e => {
          e.preventDefault()
          handleSprint({
            id: sprint._id,
            name: sprintName
          })
        }}>
          <div className="addsprint-input">
            <label htmlFor="sprintName">Name:</label>
            <input type="text" name="sprintName" value={sprintName} onChange={e => changeSprintName(e)} />
          </div>
          <button id="addsprint" type="submit">{sprint ? 'Save' : 'Add'}</button>
        </form>
      </div>
    </div>
  )
}

export default SprintModal
