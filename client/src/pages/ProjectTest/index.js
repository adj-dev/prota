import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import mockAPI from "../../utils/mockAPI";
import ProjectCard from "../../components/ProjectCard";

class ProjectTest extends Component {
  state = {
    _id: null,
    title: null
  };

  componentWillMount() {
    mockAPI.getProject(this.props.match.params.id).then(project => {
      if (project.unauthorized) window.location = "/";
      let { _id, name, status, created_by } = project;
      this.setState({ _id, name, status, created_by });
    });
  }
  render() {
    return this.state._id ? (
      <div>
        <ProjectCard
          name={this.state.name}
          status={this.state.status}
          created_by={this.state.created_by}
        />
      </div>
    ) : null;
  }
}

export default withRouter(ProjectTest);
