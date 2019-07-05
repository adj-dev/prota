import React from 'react'
import AddSprintButton from '../AddSprintButton';

const SprintListEmpty = ({ openAddSprintModal }) => {
  return (
    <div className="sprintlist-wrapper">
      <div className="sprintlist-container">
        There are no sprints for this project. Not only that, but you aren't able to add a sprint either.
        hahaha. I'll get on that.

        <AddSprintButton openAddSprintModal={() => openAddSprintModal()} />
      </div>
    </div>
  )
}

export default SprintListEmpty
