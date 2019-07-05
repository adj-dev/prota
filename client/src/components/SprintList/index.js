import React from 'react'
import AddSprintButton from '../AddSprintButton'
import "./styles.css"



const SprintList = ({ sprints, selectSprint, openAddSprintModal }) => {
  console.log(sprints)

  // click handler for when a user selects a sprint
  const handleClick = id => {
    selectSprint(id);
  }

  return (
    <div className="sprintlist-wrapper">
      <div className="sprintlist-container">

        <h1>SPRINTS</h1>
        <br></br>
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
            sprints.map((sprint, i) => {
              return (
                <div className="sprint-item" key={i} onClick={() => handleClick(sprint.name)}>
                  <span>{sprint.name}</span>
                  <span>{sprint.start_date}</span>
                  <span>{sprint.status}</span>
                </div>

              )
            })
          }
        </div>

        <AddSprintButton openAddSprintModal={() => openAddSprintModal()} />

      </div>
    </div>
  )
}

export default SprintList


