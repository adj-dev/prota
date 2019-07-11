import React from 'react'
import moment from 'moment';

import AddSprintButton from './AddSprintButton'
import SprintListEmpty from './SprintListEmpty';
import StatusDropdown from '../StatusDropdown';
// import * as STATUS from '../../helpers';
// import moment from 'moment'

import "./style.css"


const SprintList = ({ sprints, selectSprint, openAddSprintModal, openSprintModal, currentSprintId, handleChangeStatus }) => {

  // click handler for when a user selects a sprint
  const handleClick = sprintId => {
    selectSprint(sprintId);
  }

  return (
    <div className="wrapper">
      <div className="sprintlist-header">
        <h1>Sprints</h1>
        <AddSprintButton openAddSprintModal={() => openAddSprintModal()} />
      </div>
      <div className="sprintlist-content">
        {
          sprints.length ?
            sprints.map((sprint, i) => {
              return (
                <div className={`sprint-item ${currentSprintId === sprint._id ? 'active' : ''}`}
                  key={i}
                  onClick={() => handleClick(sprint._id)}
                >
                  <div className="expand-btn">
                    <img
                      className="options-icon"
                      src={require('../../assets/img/options.png')}
                      alt=""
                      onClick={() => openSprintModal(sprint)}
                    />
                  </div>
                  <div className="sprint-header">
                    <span className="sprint-name">{sprint.name}</span>
                  </div>
                  <div className="sprint-content">
                    <span className="sprint-date">start date: {moment(sprint.start_date).format('MMM D, YYYY')}</span>
                    <StatusDropdown
                      selectedStatus={sprint.status}
                      taskId={sprint._id}
                      handleChangeStatus={handleChangeStatus}
                    />
                  </div>
                </div>
              )
            })
            :
            <SprintListEmpty />
        }
      </div>
    </div>
  )
}

export default SprintList


