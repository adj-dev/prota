import React, { Component } from 'react'
import ProjectCard from '../../components/ProjectCard';
import SprintList from '../../components/SprintList';
import TaskListSelector from '../../components/TaskListSelector';
import TaskModal from '../../components/TaskModal';
import API from "../../utils/API";
import mockAPI from "../../utils/mockAPI";
import './styles.css';



export default class Project extends Component {
  state = {
    currentUser: null,
    forProjectCard: null, // eventually get rid of this one - spread it out
    contributors: null,
    forSprintList: null,
    tasks: null,
    selection: null,
    isLoaded: null,
    showTaskModal: false,
    expandedTask: null
  }

  componentDidMount() {
    this.fetchUser()
    this.fetchProject('5d1cdc7afaaa89d95b46b2b1') // FUTURE: PASS IN `this.props.match.params.id`
    this.fetchSprints()
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
    let user = await API.getUser()
    // this.setState({ currentUser: user })
    console.log(user)
  }

  // Fetches the project and all it's sprints
  fetchProject = async projectId => {
    let project = await API.getProject(projectId);
    // let project = await mockAPI.getProject(projectId);
    // Grab all sprints from a project
    let { sprints } = project;
    console.log(project)
    console.log(sprints);

    // WILL NEED TO CHECK IF SPRINTS IS not AN EMPTY ARRAY
    if (!sprints.length) {
      // EVENTUALLY SET A STATE PROPERTY THAT CONDITIONALLY RENDERS THE SPRINTS COMPONENT
      return;
    }
    // send user to / if unauthorized
    if (project.unauthorized) return window.location = "/"; // This will never fire unless backend adds unauthorized property to response


    // this.setState({
    //   forProjectCard: {
    //     contributors: project.contributors,
    //     created_by: project.created_by,
    //     name: project.name,
    //     owners: project.owners,
    //     status: project.status
    //   },
    //   contributors: project.contributors,
    //   forSprintList: project.sprints,
    //   tasks: project.sprints[0].tasks,
    //   selection: project.sprints[0].tasks.filter(task => task.status === 'OPEN')
    // })
  }

  // Fetches all sprints for a project
  fetchSprints = async sprints => {
    console.log(sprints)
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

    console.log('Assigned a task');
    this.setState({ expandedTask: null });
  }

  // Updates a task after creation / edit / assigning
  assignUserToTask = user => {
    let { contributor } = user;
    console.log(this.state.expandedTask);
    this.setState(prevState => {
      let newState = prevState.expandedTask;
      newState.assignee = contributor;
      return { expandedTask: newState }
    })
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
                    handleClick={task => this.expandTask(task)}
                  />
                </div>
              </div>

              {/* *** MODAL *** */}
              {this.state.expandedTask ?
                <TaskModal
                  handleModal={e => this.toggleModalVisibility(e)}
                  handleAssign={user => this.assignUserToTask(user)}
                  contributors={this.state.contributors}
                  currentUser={this.state.currentUser}
                  expandedTask={this.state.expandedTask}
                />
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
