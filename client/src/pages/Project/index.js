import React, { Component } from "react";

// COMPONENTS
import ProjectCard from "../../components/ProjectCard";
import SprintList from "../../components/SprintList";
import TaskListSelector from "../../components/TaskListSelector";
import TaskModal from "../../components/TaskModal";
import AddSprintModal from "../../components/AddSprintModal";
import NavBar from "../../components/NavBar";

// API
import API from "../../utils/API";

// HELPERS
import { OPEN, IN_PROGRESS, ALL } from "../../helpers";

// CSS
import "./style.css";
import SprintModal from "../../components/SprintModal";


// -------------------------------------------
//              PROJECT COMPONENT
// -------------------------------------------

export default class Project extends Component {
  state = {
    user: null,
    team: null,
    project: null,
    sprints: null,
    currentSprint: null,
    viewedSprint: null,
    viewingSprint: false,
    addingSprint: false,
    selectedTasks: null,
    expandedTask: null,
    viewingTask: false,
    showTaskModal: false,
    isLoaded: false,
    context: null,
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
    if (targetElement.closest(".task-modal") || targetElement.closest(".addsprint-modal") || targetElement.closest(".sprint-modal")) return;
    this.setState({ viewingTask: false, addingSprint: false, viewingSprint: false }); // eventually merge addingSprint with viewingSprint (similar functionality to TaskModal)
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

  openSprintModal = sprint => {
    this.setState({
      viewedSprint: sprint ? sprint : null,
      viewingSprint: true,
      context: sprint ? 'edit' : 'create'
    })
  }

  // Fires when a user clicks on a task in the TaskList component
  // Dynamically sets the context to 'edit' or 'create' depending where the event came from
  openTaskModal = task => {
    this.setState({ expandedTask: task, viewingTask: true, context: task ? 'edit' : 'create' })
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

  // Decides between creating or editing a task
  handleTask = task => {
    if (this.state.context === 'create') {
      this.createTask(task)
    }
    if (this.state.context === 'edit') {
      this.editTask(task)
    }
  };


  handleSprint = sprint => {
    if (this.state.context === 'create') {
      this.handleAddSprint(sprint) // change name of function to `createSprint`
    }
    if (this.state.context === 'edit') {
      this.editSprint(sprint)
    }
  }


  editSprint = async sprint => {
    console.log(sprint);
    let updatedSprint = await API.updateSprint(sprint.id, { name: sprint.name });

    console.log(updatedSprint);
    this.setState(prevState => {
      let newSprints = [...prevState.sprints];
      newSprints.forEach(sprint => {
        if (sprint._id === updatedSprint._id) {
          sprint.name = updatedSprint.name
        }
      })

      return {
        sprints: newSprints,
        viewingSprint: false
      }
    })
  }


  // Delete a sprint
  deleteSprint = async sprintId => {
    let deletedSprint = await API.deleteSprint(sprintId);

    this.setState(prevState => {
      let newSprints = [...prevState.sprints];

      return {
        sprints: newSprints.filter(sprint => sprint._id !== deletedSprint._id),
        viewingSprint: false
      }
    })
  }


  // Creates a new task in the database and sets state accordingly
  createTask = async task => {
    console.log(task)
    let newTask = await API.createTask({
      name: task.name,
      description: task.description,
      assignee: task.assignee,
      project_ref: this.state.project._id,
      sprint_ref: this.state.currentSprint[0]._id
    });

    console.log('newTask:', newTask);

    this.setState(prevState => {
      let newCurrentSprint = [...prevState.currentSprint];
      newCurrentSprint[0].tasks.push(newTask);
      console.log('newCurrentSprint:', newCurrentSprint);


      let newSprints = prevState.sprints.map(sprint =>
        sprint._id === newCurrentSprint[0]._id ?
          newCurrentSprint[0] :
          sprint
      );

      console.log('newSprints:', newSprints);


      let newSelectedTasks = newCurrentSprint[0].tasks.filter(task =>
        this.state.trackedStatus === ALL ?
          task :
          task.status === this.state.trackedStatus
      );

      console.log('newSelectedTasks:', newSelectedTasks);


      return {
        currentSprint: newCurrentSprint,
        sprints: newSprints,
        selectedTasks: newSelectedTasks,
        viewingTask: false
      }
    })
  }

  // Sends an updated task object to the database and updates state accordingly
  editTask = async task => {
    console.log('edit task:', task)
    let updatedTask = await API.updateTask(task.id, {
      name: task.name,
      description: task.description,
      assignee: task.assignee
    })

    console.log(updatedTask);



    this.setState(prevState => {
      let newCurrentSprint = [...prevState.currentSprint];
      newCurrentSprint[0].tasks.forEach(task => {
        if (task._id === updatedTask._id) {
          task.name = updatedTask.name
          task.description = updatedTask.description
          task.assignee = updatedTask.assignee
        }
      });

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
  }

  // Deletes a task by id
  deleteTask = async taskId => {
    let deletedTask = await API.deleteTask(taskId);

    this.setState(prevState => {
      let newCurrentSprint = [...prevState.currentSprint];
      let newTasks = newCurrentSprint[0].tasks.filter(task => task._id !== deletedTask._id);
      newCurrentSprint[0].tasks = newTasks;

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
  }

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
                <div className="row">
                  <div className="col-100">
                    <ProjectCard
                      project={this.state.project}
                      team={this.state.team}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-50">
                    <SprintList
                      sprints={this.state.sprints}
                      selectSprint={sprintId => this.selectSprint(sprintId)}
                      openAddSprintModal={() => this.openAddSprintModal()}
                      openSprintModal={sprint => this.openSprintModal(sprint)}
                    />
                  </div>
                  <div className="col-50">
                    {
                      this.state.currentSprint.length ?
                        <TaskListSelector
                          tasks={this.state.currentSprint[0].tasks}
                          selectedTasks={this.state.selectedTasks}
                          trackStatus={status => this.trackStatus(status)}
                          handleClick={(task) => this.openTaskModal(task)}
                        />
                        :
                        null
                    }
                  </div>
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
            handleTask={task => this.handleTask(task)}
            handleDeleteTask={taskId => this.deleteTask(taskId)}
            team={this.state.team}
            currentUser={this.state.user}
            expandedTask={this.state.expandedTask}
            context={this.state.context}
          />
        ) : null}

        {this.state.viewingSprint ? (
          <SprintModal
            sprint={this.state.viewedSprint}
            handleSprint={sprint => this.handleSprint(sprint)}
            handleModal={e => this.toggleModalVisibility(e)}
            handleDeleteSprint={sprintId => this.deleteSprint(sprintId)}
          />
        ) : null}
      </>
    );
  }
}
