import React from 'react'
import './styles.css'

const ProjectCard = () => {
  return (
    <div className="projectcard-wrapper">
      <div className="projectcard-container">
        <div className="projectcard-title">
          <div>
            <h1>Project 1</h1>
          </div>
        </div>

        <div className="details-container">
          <div className="detail"><span>Start Date: July 1st, 2019</span></div>
          <div className="detail"><span>Projected End Date: August 1st, 2019</span></div>
          <div className="detail"><span>Progress: 25%</span></div>
        </div>

        <div className="team-container">
          Team:
      </div>

      </div>
    </div>
  )
}

export default ProjectCard
