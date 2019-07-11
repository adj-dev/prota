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
      <div className="modal">
        <div className="modal-header">
          Add a Sprint
        </div>
        <form onSubmit={e => {
          e.preventDefault()
          validate(sprintName)
        }}>
          <div className="modal-input">
            <label htmlFor="sprintName">Name</label>
            <input type="text" name="sprintName" value={sprintName} onChange={e => changeSprintName(e)} />
          </div>
          <div className="submit-btn">
            <button className="add-button" id="addsprint" type="submit">Add</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddSprintModal
