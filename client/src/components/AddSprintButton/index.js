import React from 'react'

const CreateSprintButton = ({ openAddSprintModal }) => {
  return (
    <div className="create-sprint-button-container">
      <button className="create-sprint-button" onClick={() => openAddSprintModal()}>Add a sprint</button>
    </div>
  )
}

export default CreateSprintButton
