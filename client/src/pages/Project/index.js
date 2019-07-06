import React, { Component } from "react";
import ProjectCard from "../../components/ProjectCard";
import SprintList from "../../components/SprintList";
import TaskListSelector from "../../components/TaskListSelector";
import TaskModal from "../../components/TaskModal";
import SprintListEmpty from "../../components/SprintListEmpty";
import AddSprintModal from "../../components/AddSprintModal";
import NavBar from "../../components/NavBar";
import API from "../../utils/API";
import mockAPI from "../../utils/mockAPI";
import "./styles.css";

// Define our status variable
const OPEN = 'OPEN';
const IN_PROGRESS = 'IN_PROGRESS';
// const CLOSED = 'CLOSED';
// const DONE = 'DONE';



export default class Project extends Component {
  state = {
    user: null,
    project: null,
    sprints: null,
    currentSprint: null,
    selectedTasks: null,
    isLoaded: null,
    showTaskModal: false,
    expandedTask: null,
    team: null,
    addingSprint: false,
    viewingTask: false,
    trackedStatus: OPEN
  };

  componentDidMount() {
    this.fetchUser();
    this.fetchProject(this.props.match.params.id);
    // this.fetchTasks() // this is for future use with actual APIs
  }


  // *******************************************
  // Methods for fetching data and setting state
  // *******************************************

  // Fetches user data
  fetchUser = async () => {
    let user = await API.getUser();
    console.log("user:", user);
    this.setState({ user: user });
  };

  // Fetches the project and all it's sprints
  fetchProject = async projectId => {
    let project = await API.getProject(projectId);
    let sprints = project.sprints.length ? [...project.sprints] : [];
    let currentSprint = sprints ? sprints.filter(sprint => sprint.status === IN_PROGRESS) : [];
    let selectedTasks = currentSprint.length ? currentSprint[0].tasks.filter(task => task.status === this.state.trackedStatus) : []
    let team = project.contributors.concat(project.owners)

    console.log(currentSprint)

    // send user to / if unauthorized
    if (project.unauthorized) return (window.location = "/"); // This will never fire unless backend adds unauthorized property to response

    this.setState({
      project: project,
      sprints: sprints,
      currentSprint: currentSprint,
      selectedTasks: selectedTasks,
      team: team,
      isLoaded: true
    });
  };

  // Fetches all tasks by project id
  // This function will be used once the actual API is plugged in and functional
  fetchTasks = async () => {
    let tasks = await mockAPI.getTasks();
    this.setState({ tasks });
  };

  // **************
  // Event handlers
  // **************

  // Runs when a sprint is selected in SprintList component
  selectSprint = async sprintId => {
    // Set the state of currentSprint and selectedTasks 
    this.setState(prevState => {
      let currentSprint = prevState.sprints.filter(sprint => sprint._id === sprintId)
      let selectedTasks = currentSprint[0].tasks.filter(task => task.status === this.state.trackedStatus)
      return { currentSprint, selectedTasks }
    })
  }


  // Toggles the visibility of a modal when user clicks backdrop
  toggleModalVisibility = e => {
    let targetElement = e.target;
    if (targetElement.closest(".task-modal") || targetElement.closest(".addsprint-modal")) return;
    this.setState({ viewingTask: false, addingSprint: false });
  };

  // Updates a task after creation / edit / assigning
  modifyTask = async task => {
    let newTask = await API.createTask({
      name: task.name,
      description: task.description,
      project_ref: this.state.project._id,
      sprint_ref: this.state.currentSprint[0]._id
    });

    this.setState(prevState => {
      let newCurrentSprint = [...prevState.currentSprint];


      console.log('newCurrentSprint:', newCurrentSprint);

      let newSprints = prevState.sprints.map(sprint =>
        sprint._id === this.state.currentSprint[0]._id ?
          sprint.tasks.push(newTask) : sprint
      )

      let newSelectedTasks = newCurrentSprint[0].tasks.filter(task => task.status === this.state.trackedStatus);
      console.log(newSelectedTasks);

      return {
        currentSprint: newCurrentSprint,
        sprints: newSprints,
        selectedTasks: newSelectedTasks,
        viewingTask: false
      }
    })
  };

  // Allows state to keep track of status, which allows for this component to send
  // tasks filtered by status to the child component upon creation of a new task
  trackStatus = status => {
    this.setState({ trackedStatus: status })
  }

  openAddSprintModal = () => {
    this.setState({ addingSprint: true });
  };

  // Fires when a user clicks on a task in the TaskList component
  // renders the add task modal
  openTaskModal = task => {
    this.setState({ expandedTask: task, viewingTask: true })
  }

  handleAddSprint = async sprintName => {
    let data = {
      name: sprintName,
      project_ref: this.state.project._id
    };

    let newSprint = await API.addSprint(data);

    this.setState(prevState => {
      let updatedProject = { ...prevState.project };
      updatedProject.sprints.push(newSprint);

      let updatedSprints = [...prevState.sprints];
      updatedSprints.push(newSprint);

      return {
        project: updatedProject,
        sprints: updatedSprints,
        addingSprint: false
      };
    });
  };

  // *********
  // Rendering
  // *********

  render() {
    return (
      <>
        {this.state.isLoaded && this.state.user ?
          (
            <>
              <NavBar
                avatarUrl={this.state.user.avatar_url}
                displayName={this.state.user.display_name}
              />
              <div className="project-container">
                <div className="col">
                  <ProjectCard
                    project={this.state.project}
                    team={this.state.team}
                  />
                  {this.state.sprints.length ?
                    <SprintList
                      sprints={this.state.sprints}
                      selectSprint={sprintId => this.selectSprint(sprintId)}
                      openAddSprintModal={() => this.openAddSprintModal()}
                    />
                    :
                    <SprintListEmpty openAddSprintModal={() => this.openAddSprintModal()} />
                  }
                </div>
                <div className="col">
                  {
                    this.state.currentSprint.length ?
                      <TaskListSelector
                        tasks={this.state.currentSprint[0].tasks}
                        selectedTasks={this.state.selectedTasks}
                        trackStatus={status => this.trackStatus(status)}
                        handleClick={task => this.openTaskModal(task)}
                      />
                      :
                      <div></div>
                  }
                </div>
              </div>
            </>
          )
          :
          null // return null when loading (instead of loading gif, loading is quick)
        }

        {/* *** MODALS *** */}

        {this.state.addingSprint ? (
          <AddSprintModal
            handleModal={e => this.toggleModalVisibility(e)}
            handleAddSprint={sprintName => this.handleAddSprint(sprintName)}
          />
        ) : null}

        {this.state.viewingTask ? (
          <TaskModal
            handleModal={e => this.toggleModalVisibility(e)}
            handleTask={task => this.modifyTask(task)}
            team={this.state.team}
            currentUser={this.state.user}
            expandedTask={this.state.expandedTask}
          />
        ) : null}
      </>
    );
  }
}
