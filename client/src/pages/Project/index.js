import React, { Component } from 'react'
import ProjectCard from '../../components/ProjectCard';
import SprintList from '../../components/SprintList';
import TaskList from '../../components/TaskList';
import './styles.css';

export default class Project extends Component {
  render() {
    return (
      <div className="project-container">
        <div className="col">
          <ProjectCard />
          <SprintList />
        </div>
        <div className="col">
          <TaskList />
        </div>
      </div>
    )
  }
}
