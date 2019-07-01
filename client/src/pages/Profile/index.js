import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ProjectList from "../../components/ProjectList";
import ProfileCard from "../../components/ProfileCard";
import mockAPI from "../../utils/mockAPI";
import "./style.css";

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
          <div className="profile-container">
            <div className="profile-left-container">Tasks:</div>
            <div className="profile-right-container">
              <ProfileCard
                avatar_url={this.state.user.avatar_url}
                display_name={this.state.user.display_name}
              />
              {this.state.user.projects ? (
                <ProjectList projects={this.state.user.projects} />
              ) : (
                ""
              )}
            </div>
          </div>
        ) : (
          ""
        )}
      </>
    );
  }
}

export default withRouter(Profile);
