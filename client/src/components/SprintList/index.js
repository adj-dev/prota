import React from 'react'
import "./styles.css"

const SprintList = () => {
  return (
    <div className="sprintlist-wrapper">
      <div className="sprintlist-container">
        <h1>Sprints</h1>
        <div className="status-buttons">
          <div className="status">
            <button id="in-progress">In Progress</button>
          </div>
          <div className="status">
            <button id="open">Open</button>
          </div>
          <div className="status">
            <button id="Done">Done</button>
          </div>
          <div className="status">
            <button id="closed">Closed</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SprintList
