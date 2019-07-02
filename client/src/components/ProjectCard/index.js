import React from 'react'
import './styles.css'

const ProjectCard = ({ project }) => {
  return (
    <div className="projectcard-wrapper">
      <div className="projectcard-container">
        <div className="projectcard-title">
          <div>
            <h1>{project.name}</h1>
          </div>
        </div>
<br></br>
        <div className="details-container">
          <div className="detail"><span>Current Runtime: 23 days</span></div>
          <div className="detail"><span>Projected End Date: August 1st, 2019</span></div>
          <div className="detail"><span>Progress: 25%</span></div>
          <div className="detail"><span>{project.status}</span></div>
        </div>

        <div className="team-container">
          {
            project.contributors.map((contributor, i) => {
              return <span key={i}>{contributor}</span>
            })
          }
        </div>

      </div>
    </div>
  )
}

export default ProjectCard
