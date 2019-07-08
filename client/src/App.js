import React, { Component } from "react";
import { Redirect } from 'react-router';
import { BrowserRouter, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Project from "./pages/Project";
import API from "./utils/API";
import Profile from "./pages/Profile";
import Landing from "./pages/Landing";
// import ProjectTest from "./pages/ProjectTest";

class App extends Component {
  state = {
    isLoggedIn: ""
  };

  componentWillMount() {
    // console.log("mounting");
    // console.log("Logged In?", this.state.isLoggedIn);
    this.getLoginStatus();
  }
  componentDidUpdate() {
    // console.log("Component mounted! State:");
    // console.log(this.state);
  }

  getLoginStatus = async () => {
    await API.isLoggedIn()
      .then(status => {
        return this.setState({ isLoggedIn: status });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <>
        {this.state.isLoggedIn !== "" ? (
          <div className="app" style={{ height: 100 }}>
            <BrowserRouter>
              <PrivateRoute
                isAuthenticated={this.state.isLoggedIn}
                exact
                path="/"
                component={Profile}
              />
              <PrivateRoute
                isAuthenticated={this.state.isLoggedIn}
                // id={this.state.projectId}
                path="/project/:id"
                component={Project}
              />
              <Route exact path="/welcome" component={Landing} />
              {/* <Redirect to="/" /> */}
            </BrowserRouter>
          </div>
        ) : null}
      </>
    );
  }
}

export default App;
