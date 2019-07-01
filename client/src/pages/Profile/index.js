import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ProjectList from "../../components/ProjectList";
import mockAPI from "../../utils/mockAPI";

class Profile extends Component {
  state = {
    user: null
  };
  componentDidMount = () => {
    if (!this.state.user) {
      mockAPI.getUser().then(user => {
        console.log(user);
        this.setState({ user });
      });
    }
  };
  render() {
    return (
      <>
        {this.state.user ? (
          <div>
            <div>{this.state.user.display_name}</div>
            {this.state.user.projects ? (
              <ProjectList projects={this.state.user.projects} />
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
      </>
    );
  }
}

export default withRouter(Profile);
