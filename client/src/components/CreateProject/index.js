import React, { Component } from "react";
import "./style.css";
import AddedUsers from "./AddedUsers";
import SearchUsers from "./SearchUsers";
import API from "../../utils/API";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

export default class CreateProject extends Component {
  state = {
    name: "",
    created_by: this.props.user.username,
    owners: [this.props.user],
    contributors: [],
    errorMessage: null
  };

  handleInput = field => event => {
    const { value } = event.target;
    this.setState({
      [field]: value
    });
  };

  handleRemoveContributor = toRemove => {
    let contributors = this.state.contributors.filter(
      contributor => contributor.username !== toRemove.username
    );

    this.setState({ contributors });
  };

  handleAddContributor = toAdd => {
    let contributorPresent = false;
    let contributors = this.state.contributors;

    for (let contributor in contributors) {
      if (contributors[contributor].username === toAdd.username) {
        contributorPresent = true;
      }
    }
    if (!contributorPresent) {
      this.setState(prevState => {
        return {
          contributors: [...prevState.contributors, toAdd]
        };
      });
    }
  };

  handleRemoveOwner = toRemove => {
    if (toRemove.username === this.props.user.username) return;
    let owners = this.state.owners.filter(owner => owner.username !== toRemove.username);
    this.setState({ owners });
  };

  handleAddOwner = toAdd => {
    let ownerPresent = false;
    let owners = this.state.owners;

    for (let owner in owners) {
      if (owners[owner].username === toAdd.username) {
        ownerPresent = true;
      }
    }

    if (!ownerPresent) {
      this.setState(prevState => {
        return {
          owners: [...prevState.owners, toAdd]
        };
      });
    }
  };

  handleInviteContributor = username => {
    API.createUser(username).then(user => {
      this.setState(prevState => {
        return {
          contributors: [...prevState.contributors, user]
        };
      });
    });
  };

  handleInviteOwner = username => {
    API.createUser(username).then(user => {
      this.setState(prevState => {
        return {
          owners: [...prevState.owners, user]
        };
      });
    });
  };

  handleCreateProject = () => {
    let owners = this.state.owners.map(owner => owner._id);
    let contributors = this.state.contributors.map(
      contributor => contributor._id
    );

    if (this.state.name === "") {
      this.setState({ errorMessage: "Please enter a project name." });
      setTimeout(() => {
        this.setState({ errorMessage: null });
      }, 3000);
      return;
    }

    if (this.state.name.length > 40) {
      this.setState({
        errorMessage: "Project names must be under 40 characters."
      });
      setTimeout(() => {
        this.setState({ errorMessage: null });
      }, 3000);
      return;
    }

    let newProject = {
      name: this.state.name,
      created_by: this.state.created_by,
      owners,
      contributors
    };

    API.createProject(newProject).then(project => {
      window.location = `/project/${project._id}`;
    });
  };

  render() {
    return (
      <div>
        <ReactCSSTransitionGroup
          transitionName="modal"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
          <div
            key="1"
            className="modal-backdrop"
            onClick={this.props.toggleCreateProjectDialog}
          >
            <div className="modal">
              <div className="modal-header">Create a New Project</div>
              <div className="modal-input">
                <label htmlFor="projectTitle">Project Title</label>
                <input
                  autoFocus
                  name="projectTitle"
                  placeholder="Project Title"
                  onChange={this.handleInput("name")}
                />
              </div>
              <div className="error-message">{this.state.errorMessage}</div>
              <div className="modal-input">
                <label>Project Owners</label>
                <AddedUsers
                  handleRemoveUser={this.handleRemoveOwner}
                  currentUser={this.state.created_by}
                  users={this.state.owners}
                />
                <SearchUsers
                  type="owners"
                  handleInviteUser={this.handleInviteOwner}
                  users={this.state.owners}
                  handleAddUser={this.handleAddOwner}
                />
              </div>
              <div className="modal-input">
                <label>Contributors</label>
                <AddedUsers
                  handleRemoveUser={this.handleRemoveContributor}
                  users={this.state.contributors}
                />
                <SearchUsers
                  type="contributors"
                  handleInviteUser={this.handleInviteContributor}
                  users={this.state.contributors}
                  handleAddUser={this.handleAddContributor}
                />
              </div>
              <div className="submit-btn">
                <div
                  className="add-project-button"
                  onClick={this.handleCreateProject}
                >
                  Create Project
              </div>
              </div>

            </div>
          </div>
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}
