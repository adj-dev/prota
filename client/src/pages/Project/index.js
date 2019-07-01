import React, { Component } from 'react'
import ProjectCard from '../../components/ProjectCard';
import SprintList from '../../components/SprintList';
import TaskList from '../../components/TaskList';
import API from "../../utils/API";
import './styles.css';

export default class Project extends Component {
  state = {
    id: "",
    title: ""
  }

  componentWillMount() {
    API.getProject(this.props.match.params.id).then(project => {
      if (project.unauthorized) {
        window.location = "/";
      }

      let { id, title } = project;
      this.setState({ id, title });
    });
  }

  render() {
    return (
      <div className="project-container">
        <div className="col">
          <ProjectCard id={this.state.id} />
          <SprintList />
        </div>
        <div className="col">
          <TaskList />
        </div>
      </div>
    )
  }
}
