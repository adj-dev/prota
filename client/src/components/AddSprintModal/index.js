import React, { useState } from 'react'
import './style.css'

const AddSprintModal = ({ handleModal, handleAddSprint }) => {
  const [sprintName, setSprintName] = useState('');

  const changeSprintName = e => {
    setSprintName(e.target.value);
  }

  const validate = sprintName => {
    if (sprintName.length) {
      handleAddSprint(sprintName)
    }
  }

  return (
    <div className="modal-backdrop" onClick={e => handleModal(e)}>
      <div className="addsprint-modal">
        <form onSubmit={e => {
          e.preventDefault()
          validate(sprintName)
        }}>
          <div className="addsprint-input">
            <label htmlFor="sprintName">Enter a name for the sprint:</label>
            <input type="text" name="sprintName" value={sprintName} onChange={e => changeSprintName(e)} />
          </div>
          <button id="addsprint" type="submit">Add</button>
        </form>
      </div>
    </div>
  )
}

export default AddSprintModal
