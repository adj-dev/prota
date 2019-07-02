import React, { Component } from 'react'
import ProjectCard from '../../components/ProjectCard';
import SprintList from '../../components/SprintList';
import TaskListSelector from '../../components/TaskListSelector';
// import API from "../../utils/API";
import mockAPI from "../../utils/mockAPI";
import './styles.css';



export default class Project extends Component {
  state = {
    project: null,
    forProjectCard: null,
    forSprintList: null,
    forTaskList: null,
    isLoaded: null
  }

  componentDidMount() {
    console.log('Project component mounted');
    mockAPI.getProject(this.props.match.params.id).then(project => {
      if (project.unauthorized) return window.location = "/";
      this.setState({
        project: project,
        forProjectCard: {
          contributors: project.contributors,
          created_by: project.created_by,
          name: project.name,
          owners: project.owners,
          status: project.status
        },
        forSprintList: project.sprints,
        // forTaskList: project.sprints[0].tasks,
        forTaskList: [],
        isLoaded: true
      });
    });
  }

  selectSprint = async id => {
    // grab tasks selecting by a Sprint's id
    let tasks = await mockAPI.getTasksBySprintId(id);
    this.setState({ forTaskList: tasks });
  }


  componentDidUpdate() {
    console.log('Project Component updated. State is....');
    console.log(this.state.forTaskList);
  }

  render() {
    return (
      <>
        {
          this.state.isLoaded ?
            <div className="project-container">
              <div className="col">
                <ProjectCard project={this.state.forProjectCard} />
                <SprintList sprints={this.state.forSprintList} selectSprint={this.selectSprint} />
              </div>
              <div className="col">
                <TaskListSelector tasks={this.state.forTaskList} />
              </div>
            </div>
            :
            <div>Oops, something went wrong...</div>
        }
      </>
    )
  }
}
