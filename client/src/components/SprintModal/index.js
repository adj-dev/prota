import React, { useState } from 'react'

const SprintModal = ({ sprint, handleModal, handleSprint, handleDeleteSprint }) => {

  const [sprintName, setSprintName] = useState(sprint ? sprint.name : '');

  const changeSprintName = e => {
    setSprintName(e.target.value);
  }

  const validate = sprint => {
    if (sprint.name.length) {
      handleSprint(sprint)
    }
  }

  return (
    <div className="modal-backdrop" onClick={e => handleModal(e)}>
      <div className="modal">
        <div className="modal-header">
          Edit Sprint
        </div>
        <form onSubmit={e => {
          e.preventDefault()
          validate({
            id: sprint._id,
            name: sprintName
          })
        }}>
          <div className="modal-input">
            <label htmlFor="sprintName">Name</label>
            <input autoFocus type="text" name="sprintName" value={sprintName} onChange={e => changeSprintName(e)} />
          </div>
          <div className="submit-btn">
            <button className="add-button" type="submit">{sprint ? 'Save' : 'Add'}</button>
            {
              sprint ?
                <button
                  className="dlt-button"
                  onClick={e => {
                    e.preventDefault();
                    handleDeleteSprint(sprint._id)
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

export default SprintModal
