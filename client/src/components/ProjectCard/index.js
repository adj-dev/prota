import React from 'react'
import './styles.css'

const ProjectCard = ({ project, team }) => {
  return (
    <div className="projectcard-wrapper">
      <div className="projectcard-container">
        <div className="projectcard-title">
          <div id="project-title">
            <h1>{project.name}</h1>
          </div>
        </div>
        {/* <div className="details-container">
          <div className="detail"><span>{project.status.toUpperCase()}</span></div>
        </div>
        <div className="team-container">
          {
            team.map((member, i) => {
              return <span key={i}>{member.display_name}</span>
            })
          }
        </div> */}
      </div>
    </div>
  )
}

export default ProjectCard
