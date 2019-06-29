import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Auth from "./components/Auth";
import API from "./utils/API";
import Profile from "./pages/Profile";
import ProjectTest from "./pages/ProjectTest";

class App extends Component {
  state = {
    isLoggedIn: true,
    user: {},
    projectId: ""
  };

  componentWillMount() {
    console.log("mounting");
    console.log("Logged In?", this.state.isLoggedIn);
    this.fetchUser();
  }
  componentDidUpdate() {
    console.log("Component mounted! State:");
    console.log(this.state);
  }

  selectProjectHandler = id => {
    this.setState({ projectId: id });
  };

  fetchUser = () => {
    API.getUser()
      .then(user => {
        //console.log(user);

        if (user.error) {
          console.log("failed to fetch user");
          return this.setState({ isLoggedIn: false, user: {} });
        }
        return this.setState({ isLoggedIn: true, user: user });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <PrivateRoute
            isAuthenticated={this.state.isLoggedIn}
            exact
            path="/"
            component={() => (
              <Profile
                user={this.state.user}
                selectProject={this.selectProjectHandler}
                projectId={this.state.projectId}
              />
            )}
          />
          <PrivateRoute
            isAuthenticated={this.state.isLoggedIn}
            id={this.state.projectId}
            path="/project/:id"
            component={ProjectTest}
          />
          <Route exact path="/login" component={Auth} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
