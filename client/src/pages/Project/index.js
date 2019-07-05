import React, { Component } from 'react'
import ProjectCard from '../../components/ProjectCard';
import SprintList from '../../components/SprintList';
import TaskListSelector from '../../components/TaskListSelector';
import TaskModal from '../../components/TaskModal';
import API from "../../utils/API";
import mockAPI from "../../utils/mockAPI";
import './styles.css';


// Define our status variable
const OPEN = 'OPEN';
const IN_PROGRESS = 'IN_PROGRESS';
const CLOSED = 'CLOSED';
const DONE = 'DONE';



export default class Project extends Component {
  state = {
    currentUser: null,
    project: null,
    sprints: null,
    currentSprint: null,
    selection: null,
    isLoaded: null,
    showTaskModal: false,
    expandedTask: null,
    team: null
  }

  componentDidMount() {
    this.fetchUser()
    this.fetchProject(this.props.match.params.id)
    // this.fetchTasks() // this is for future use with actual APIs
  }



  // *******************************************
  // Methods for fetching data and setting state
  // *******************************************

  // Fetches user data
  fetchUser = async () => {
    let user = await API.getUser()
    console.log('currentUser:', user)
    this.setState({ currentUser: user })
  }

  // Fetches the project and all it's sprints
  fetchProject = async projectId => {
    let project = await API.getProject(projectId);
    let sprints = project.sprints.length ? [...project.sprints] : null;
    let currentSprint = sprints ? sprints.filter(sprint => sprint.status === IN_PROGRESS) : null;
    let team = project.contributors.concat(project.owners)

    console.log('Project:', project)
    console.log('Sprints', sprints);
    console.log('currentSprint', currentSprint);

    // send user to / if unauthorized
    if (project.unauthorized) return window.location = "/"; // This will never fire unless backend adds unauthorized property to response


    this.setState({
      project: project,
      sprints: sprints,
      currentSprint: currentSprint,
      selection: currentSprint ? currentSprint[0].tasks.filter(task => task.status === 'OPEN') : [], // eventually maybe migrate away from setting this here
      team: team,
      isLoaded: true
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

  // Fires when a user clicks on a task in the TaskList component
  // renders the add task modal
  expandTask = task => {
    // show the task modal
    this.setState({ expandedTask: task })
  }

  // Toggles the visibility of a modal when user clicks backdrop
  toggleModalVisibility = e => {
    let targetElement = e.target;
    if (targetElement.closest('.task-modal')) {
      return;
    }

    this.setState({ expandedTask: null });
  }

  // Updates a task after creation / edit / assigning
  assignUserToTask = async username => {
    let { _id: userId } = await API.getUserByUsername(username);

    let response = await API.updateTask(this.state.expandedTask._id, userId)
    console.log('From assignUserToTask: ', response);
    // this.setState(prevState => {
    //   let newState = prevState.expandedTask;
    //   newState.assignee = member;
    //   return { expandedTask: newState }
    // })
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
                    project={this.state.project}
                    team={this.state.team}
                  />
                  {
                    this.state.currentSprint ?
                      <SprintList
                        sprints={this.state.currentSprint}
                        selectSprint={this.selectSprint}
                      />
                      :
                      <div>
                        There are no sprints for this project. Not only that, but you aren't able to add a sprint either.
                        hahaha. I'll get on that.
                      </div>
                  }
                </div>
                <div className="col">
                  {
                    this.state.currentSprint ?
                      <TaskListSelector
                        tasks={this.state.currentSprint[0].tasks}
                        selection={this.state.selection}
                        handleClick={task => this.expandTask(task)}
                      />
                      :
                      <div></div>
                  }
                </div>
              </div>

              {/* *** MODAL *** */}
              {this.state.expandedTask ?
                <TaskModal
                  handleModal={e => this.toggleModalVisibility(e)}
                  handleAssign={username => this.assignUserToTask(username)}
                  team={this.state.team}
                  currentUser={this.state.currentUser}
                  expandedTask={this.state.expandedTask}
                />
                :
                null
              }
            </>
            :
            <div></div> //empty div when loading (instead of loading gif, loading is quick)
        }
      </>
    )
  }
}
