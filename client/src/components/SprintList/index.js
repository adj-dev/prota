import React from 'react'
import AddSprintButton from './AddSprintButton'
import "./styles.css"
import SprintListEmpty from './SprintListEmpty';



const SprintList = ({ sprints, selectSprint, openAddSprintModal }) => {
  // console.log(sprints)

  // click handler for when a user selects a sprint
  const handleClick = sprintId => {
    selectSprint(sprintId);
  }

  return (
    <div className="sprintlist-wrapper">
      <div className="sprintlist-container">
        <div className="sprintlist-header">
          <h1>SPRINTS</h1>
          <AddSprintButton openAddSprintModal={() => openAddSprintModal()} />
        </div>
        <div className="status-buttons">
          <div className="status">
            <button id="open">open</button>
          </div>
          <div className="status">
            <button id="in-progress">in progress</button>
          </div>
          <div className="status">
            <button id="done">done</button>
          </div>
          <div className="status">
            <button id="closed">closed</button>
          </div>
        </div>
        <br></br>
        <div className="sprintlist">
          {
            sprints.length ?
              sprints.map((sprint, i) => {
                return (
                  <div className="sprint-item" key={i} onClick={() => handleClick(sprint._id)}>
                    <span>{sprint.name}</span>
                    <span>{sprint.start_date}</span>
                    <span>{sprint.status}</span>
                  </div>
                )
              })
              :
              <SprintListEmpty />
          }
        </div>
      </div>
    </div>
  )
}

export default SprintList


