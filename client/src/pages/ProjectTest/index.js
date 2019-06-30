import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import mockAPI from "../../utils/mockAPI";

class ProjectTest extends Component {
  state = {
    _id: null,
    title: null
  };

  componentWillMount() {
    mockAPI.getProject(this.props.match.params.id).then(project => {
      console.log("project:");
      console.log(project);

      if (project.unauthorized) {
        window.location = "/";
      }

      let { _id, name } = project;
      this.setState({ _id, name });
    });
  }
  render() {
    return this.state._id ? (
      <div>
        {this.state.name} : {this.state._id}
      </div>
    ) : null;
  }
}

export default withRouter(ProjectTest);
