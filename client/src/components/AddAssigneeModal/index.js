import React, { Component } from 'react'
import './style.css'

export default class AddAssigneeModal extends Component {
  render() {
    return (
      <div className="modal-backdrop">
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
}
