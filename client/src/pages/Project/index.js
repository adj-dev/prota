import React, { Component } from "react";

// COMPONENTS
import ProjectCard from "../../components/ProjectCard";
import SprintList from "../../components/SprintList";
import TaskListSelector from "../../components/TaskListSelector";
import TaskModal from "../../components/TaskModal";
import SprintListEmpty from "../../components/SprintList/SprintListEmpty";
import AddSprintModal from "../../components/AddSprintModal";
import NavBar from "../../components/NavBar";

// API
import API from "../../utils/API";

// HELPERS
import { OPEN, IN_PROGRESS, ALL } from "../../helpers";

// CSS
import "./styles.css";


// -------------------------------------------
//              PROJECT COMPONENT
// -------------------------------------------

export default class Project extends Component {
  state = {
    user: null,
    project: null,
    sprints: null,
    currentSprint: null,
    selectedTasks: null,
    isLoaded: false,
    showTaskModal: false,
    expandedTask: null,
    team: null,
    addingSprint: false,
    viewingTask: false,
    trackedStatus: OPEN
  };

  // Fetches the user object and project object when component first renders
  componentDidMount() {
    this.fetchUser();
    this.fetchProject(this.props.match.params.id);
  }



  // -------------------------------------------
  // Methods for fetching data and setting state
  // -------------------------------------------

  // Fetches user object
  fetchUser = async () => {
    let user = await API.getUser();
    this.setState({ user: user });
  };

  // Fetches the project and sets state accordingly
  fetchProject = async projectId => {
    let project = await API.getProject(projectId);
    let sprints = project.sprints.length ? [...project.sprints] : [];
    let currentSprint = sprints ? sprints.filter(sprint => sprint.status === IN_PROGRESS) : [];
    let selectedTasks = currentSprint.length ? currentSprint[0].tasks.filter(task => task.status === this.state.trackedStatus) : []
    let team = project.contributors.concat(project.owners)

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



  // -------------------------------------------
  //               Event handlers
  // -------------------------------------------


  // Runs when a sprint is selected in SprintList component
  selectSprint = async sprintId => {
    this.setState(prevState => {
      let currentSprint = prevState.sprints.filter(sprint => sprint._id === sprintId)
      let selectedTasks = currentSprint[0].tasks.filter(task =>
        this.state.trackedStatus === ALL ?
          task :
          task.status === this.state.trackedStatus
      );

      return { currentSprint, selectedTasks }
    })
  }


  // Toggles the visibility of a modal when user clicks backdrop
  toggleModalVisibility = e => {
    let targetElement = e.target;
    if (targetElement.closest(".task-modal") || targetElement.closest(".addsprint-modal")) return;
    this.setState({ viewingTask: false, addingSprint: false });
  };

  // Allows state to keep track of status, which allows for this component to send 
  // tasks filtered by status to the child component upon creation of a new task
  trackStatus = status => {
    this.setState({ trackedStatus: status })
  }

  // Triggered when a project owner selects the 'add a project' button
  openAddSprintModal = () => {
    this.setState({ addingSprint: true });
  };

  // Fires when a user clicks on a task in the TaskList component
  openTaskModal = task => {
    this.setState({ expandedTask: task, viewingTask: true })
  }

  // Adds a new sprint to the database and updates state
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
      newCurrentSprint[0].tasks.push(newTask);

      let newSprints = prevState.sprints.map(sprint =>
        sprint._id === newCurrentSprint[0]._id ?
          newCurrentSprint[0] :
          sprint
      );

      let newSelectedTasks = newCurrentSprint[0].tasks.filter(task =>
        this.state.trackedStatus === ALL ?
          task :
          task.status === this.state.trackedStatus
      );

      return {
        currentSprint: newCurrentSprint,
        sprints: newSprints,
        selectedTasks: newSelectedTasks,
        viewingTask: false
      }
    })
  };

  // -------------------------------------------
  //                 Rendering
  // -------------------------------------------

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
                  <SprintList
                    sprints={this.state.sprints}
                    selectSprint={sprintId => this.selectSprint(sprintId)}
                    openAddSprintModal={() => this.openAddSprintModal()}
                  />
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
