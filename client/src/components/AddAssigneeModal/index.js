import React, { Component } from 'react'
import './style.css'

const AddAssigneeModal = ({ handleClick }) => {

  return (
    <div className="modal-backdrop" onClick={e => handleClick(e)}>
      <div className="assignee-modal">
        <div className="assignee-form">
          <div className="assignee-input">
            <label htmlFor="assign">Assign:</label>
            <input type="text" name="assign" />
          </div>
        </div>
      </div>
    </div>
  )
}



export default AddAssigneeModal
