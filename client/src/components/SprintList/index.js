import React from 'react'
import moment from 'moment';

import AddSprintButton from './AddSprintButton'
import SprintListEmpty from './SprintListEmpty';
// import moment from 'moment'

import "./style.css"


const SprintList = ({ sprints, selectSprint, openAddSprintModal }) => {

  // click handler for when a user selects a sprint
  const handleClick = sprintId => {
    selectSprint(sprintId);
  }

  return (
    <div className="sprintlist-wrapper">
      <div className="sprintlist-container">
        <div className="sprintlist-header">
          <h1>Sprints</h1>
          <AddSprintButton openAddSprintModal={() => openAddSprintModal()} />
        </div>

        {/* As of now, no longer need to show status buttons on sprint list */}

        {/* <div className="status-buttons">
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
        </div> */}

        <div className="sprintlist">
          {
            sprints.length ?
              sprints.map((sprint, i) => {
                return (
                  <div className="sprint-item" key={i} onClick={() => handleClick(sprint._id)}>
<<<<<<< HEAD
                    <span>{sprint.name}</span> 
                    <span>{sprint.start_date}</span> 
                    <span>{sprint.status}</span>
=======
                    <div className="sprint-header">
                      <span className="sprint-name">{sprint.name}</span>
                      <span className="sprint-status">{sprint.status}</span>
                    </div>
                    <div className="sprint-body">
                      <span className="sprint-date">start date: {moment(sprint.start_date).format('MMM D, YYYY')}</span>
                    </div>
>>>>>>> 15b57ae78da60f51e2f11a6ecf43f749e274ee04
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


