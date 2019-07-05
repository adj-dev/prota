import React, { useState } from 'react'
import './style.css'

const AddSprintModal = ({ handleModal, handleAddSprint }) => {
  const [sprintName, setSprintName] = useState('');

  const changeSprintName = e => {
    setSprintName(e.target.value);
  }

  return (
    <div className="modal-backdrop" onClick={e => handleModal(e)}>
      <div className="addsprint-modal">
        <div className="addsprint-form">
          <div className="addsprint-input">
            <label htmlFor="sprintName">Enter a name for the sprint:</label>
            <input type="text" name="sprintName" value={sprintName} onChange={e => changeSprintName(e)} />
          </div>
          <button id="addsprint" onClick={() => handleAddSprint(sprintName)}>Add</button>
        </div>
      </div>
    </div>
  )
}

export default AddSprintModal
