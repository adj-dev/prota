import React from 'react'
import "./styles.css"



const SprintList = ({ sprints, selectSprint }) => {
  // console.log(sprints)

  // click handler for when a user selects a sprint
  const handleClick = id => {
    selectSprint(id);
  }

  return (
    <div className="sprintlist-wrapper">
      <div className="sprintlist-container">

        <h1>Sprints</h1>

        <div className="status-buttons">
          <div className="status">
            <button id="open">Open</button>
          </div>
          <div className="status">
            <button id="in-progress">In Progress</button>
          </div>
          <div className="status">
            <button id="Done">Done</button>
          </div>
          <div className="status">
            <button id="closed">Closed</button>
          </div>
        </div>

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

      </div>
    </div>
  )
}

export default SprintList


