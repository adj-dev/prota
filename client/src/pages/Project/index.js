import React, { Component } from 'react'
import ProjectCard from '../../components/ProjectCard';
import SprintList from '../../components/SprintList';
import TaskListSelector from '../../components/TaskListSelector';
import AddAssigneeModal from '../../components/AddAssigneeModal';
// import API from "../../utils/API";
import mockAPI from "../../utils/mockAPI";
import './styles.css';



export default class Project extends Component {
  state = {
    currentUser: null,
    forProjectCard: null,
    forSprintList: null,
    tasks: null,
    selection: null,
    isLoaded: null,
    showAssigneeModal: false
  }

  componentDidMount() {
    this.fetchUser()
    this.fetchProject(this.props.match.params.id)
    // this.fetchTasks() // this is for future use with actual APIs
  }

  // Component only renders when tasks and selection (state properties) are both not null. 
  // This works because in the render() method, the Children components only render when
  // isLoaded is set to `true`
  componentDidUpdate() {
    if (this.state.tasks && this.state.selection && !this.state.isLoaded) {
      console.log(this.state.selection);
      this.setState({ isLoaded: true })
    }
  }



  // *****************************************
  // Methods for fetching data > setting state
  // *****************************************

  // Fetches user data
  fetchUser = async () => {
    let user = await mockAPI.getUser()
    this.setState({ currentUser: user })
  }

  // Fetches the project and all it's sprints
  fetchProject = async projectId => {
    let project = await mockAPI.getProject(projectId);
    // send user to / if unauthorized
    if (project.unauthorized) return window.location = "/";
    this.setState({
      forProjectCard: {
        contributors: project.contributors,
        created_by: project.created_by,
        name: project.name,
        owners: project.owners,
        status: project.status
      },
      forSprintList: project.sprints,
      tasks: project.sprints[0].tasks,
      selection: project.sprints[0].tasks.filter(task => task.status === 'OPEN')
    })
  }

  // Fetches all tasks by project id
  // This function will be used once the actual API is plugged in and functional
  fetchTasks = async () => {
    let tasks = await mockAPI.getTasks();
    this.setState({ tasks });
  }



  // **************
  // Event handlers
  // **************

  // Runs when a sprint is selected in SprintList component
  selectSprint = async id => {
    // grab tasks selecting by a Sprint's id
    let tasks = await mockAPI.getTasksBySprintId(id);
    this.setState({
      forTaskList: tasks,
      selection: tasks.filter(task => task.status === 'OPEN')
    });
  }

  // Fires when an assignee is added, renders the add assignee modal
  assignTask = taskId => {
    // show the assign modal
    this.setState({ showAssigneeModal: true })
  }



  // *********
  // Rendering
  // *********  

  render() {
    return (
      <>
        {
          this.state.isLoaded ?
            <>
              <div className="project-container">
                <div className="col">
                  <ProjectCard
                    project={this.state.forProjectCard}
                  />
                  <SprintList
                    sprints={this.state.forSprintList}
                    selectSprint={this.selectSprint}
                  />
                </div>
                <div className="col">
                  <TaskListSelector
                    tasks={this.state.tasks}
                    selection={this.state.selection}
                    handleAssignTask={taskId => this.assignTask(taskId)}
                  />
                </div>
              </div>

              {/* *** MODAL *** */}
              {this.state.showAssigneeModal ?
                <AddAssigneeModal />
                :
                null
              }
            </>
            :
            <div>Oops, something went wrong...</div>
        }
      </>
    )
  }
}
