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
    contributors: []
  };

  handleInput = field => event => {
    const { value } = event.target;
    this.setState({
      [field]: value
    });
  };

  handleRemoveContributor = toRemove => {
    console.log("Removing: ", toRemove);

    let contributors = this.state.contributors.filter(
      contributor => contributor.username !== toRemove.username
    );

    console.log(contributors);
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
    console.log("Removing: ", toRemove);
    if (toRemove.username === this.props.user.username) {
      return;
    }

    let owners = this.state.owners.filter(
      owner => owner.username !== toRemove.username
    );
    console.log(owners);

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
    let newProject = {
      name: this.state.name,
      created_by: this.state.created_by,
      owners,
      contributors
    };

    console.log(newProject);

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
            className="create-project-container"
            onClick={this.props.toggleCreateProjectDialog}
          >
            <div className="create-project-content-container">
              <div className="project-input-container">
                <div className="title">Create a new project</div>
                <input
                  autoFocus
                  className="add-project-title-input"
                  placeholder="Project Title"
                  onChange={this.handleInput("name")}
                />
              </div>
              <div className="project-input-container">
                <div className="input-title"> Project Owners</div>
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
              <div className="project-input-container">
                <div className="input-title">Contributors</div>
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
              <div
                className="add-project-button"
                onClick={this.handleCreateProject}
              >
                Create Project
              </div>
            </div>
          </div>
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}
