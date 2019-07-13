import React from 'react'
import './styles.css'

const ProjectCard = ({ project }) => {
  return (
    <div className="wrapper">
      <div className="projectcard-header">
        <h1>{project.name}</h1>
      </div>
    </div>
  )
}

export default ProjectCard
