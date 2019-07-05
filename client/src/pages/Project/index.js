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
// const OPEN = 'OPEN';
const IN_PROGRESS = 'IN_PROGRESS';
// const CLOSED = 'CLOSED';
// const DONE = 'DONE';



export default class Project extends Component {
  state = {
    user: null,
    project: null,
    sprints: null,
    currentSprint: null,
    selection: null,
    isLoaded: null,
    showTaskModal: false,
    expandedTask: null,
    team: null,
    addingSprint: false
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
    let team = project.contributors.concat(project.owners)

    console.log("Project:", project);
    console.log("Sprints", sprints);
    console.log("currentSprint", currentSprint);

    // send user to / if unauthorized
    if (project.unauthorized) return (window.location = "/"); // This will never fire unless backend adds unauthorized property to response

    this.setState({
      project: project,
      sprints: sprints,
      currentSprint: currentSprint,
      selection: currentSprint.length
        ? currentSprint[0].tasks.filter(task => task.status === "OPEN")
        : [], // eventually maybe migrate away from setting this here
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
    // console.log('sprint id', sprintId)
    this.setState(prevState => {
      let currentSprint = prevState.sprints.filter(sprint => sprint._id === sprintId)
      return { currentSprint }
    })

    // this.setState({
    //   forTaskList: tasks,
    //   selection: tasks.filter(task => task.status === 'OPEN')
    // });
  }

  // Fires when a user clicks on a task in the TaskList component
  // renders the add task modal
  openTaskModal = task => {
    // show the task modal
    console.log(task);
    // this.setState({ expandedTask: task })
  }

  // Toggles the visibility of a modal when user clicks backdrop
  toggleModalVisibility = e => {
    let targetElement = e.target;
    if (
      targetElement.closest(".task-modal") ||
      targetElement.closest(".addsprint-modal")
    ) {
      return;
    }

    this.setState({ expandedTask: null, addingSprint: false });
  };

  // Updates a task after creation / edit / assigning
  assignUserToTask = async username => {
    let { _id: userId } = await API.getUserByUsername(username);

    let response = await API.updateTask(this.state.expandedTask._id, userId);
    console.log("From assignUserToTask: ", response);
    // this.setState(prevState => {
    //   let newState = prevState.expandedTask;
    //   newState.assignee = member;
    //   return { expandedTask: newState }
    // })
  };

  openAddSprintModal = () => {
    this.setState({ addingSprint: true });
  };

  handleAddSprint = async sprintName => {
    let data = {
      name: sprintName,
      project_ref: this.state.project._id
    };

    let newSprint = await API.addSprint(data);

    // await this.setState(prevState => {
    //   console.log('setting isLoaded to null')
    //   return { isLoaded: null }
    // })

    console.log('should come before "updating state ..."');

    this.setState(prevState => {
      console.log("updating state...");
      let updatedProject = { ...prevState.project };
      updatedProject.sprints.push(newSprint);
      let updatedSprints = [...prevState.sprints];
      updatedSprints.push(newSprint);
      console.log("updated project: ", updatedProject);
      console.log("updated sprints: ", updatedSprints);
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
                        selection={this.state.selection}
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

        {this.state.expandedTask ? (
          <TaskModal
            handleModal={e => this.toggleModalVisibility(e)}
            handleAssign={username => this.assignUserToTask(username)}
            team={this.state.team}
            currentUser={this.state.user}
            expandedTask={this.state.expandedTask}
          />
        ) : null}
      </>
    );
  }
}
