import React from 'react'
import './style.css'



const CreateSprintButton = ({ openAddSprintModal }) => {
  return (
    <div id="add-sprint" onClick={() => openAddSprintModal()}>
      +
    </div>
  )
}

export default CreateSprintButton
