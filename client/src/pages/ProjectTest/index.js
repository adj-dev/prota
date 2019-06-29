import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import API from "../../utils/API";

class ProjectTest extends Component {
  state = {
    id: null,
    title: null
  };

  componentWillMount() {
    API.getProject(this.props.match.params.id).then(project => {
      if (project.unauthorized) {
        window.location = "/";
      }

      let { id, title } = project;
      this.setState({ id, title });
    });
  }
  render() {
    return this.state.id ? (
      <div>
        {this.state.title} : {this.state.id}
      </div>
    ) : null;
  }
}

export default withRouter(ProjectTest);
