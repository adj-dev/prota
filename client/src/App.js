import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Project from "./pages/Project";
import API from "./utils/API";
import Profile from "./pages/Profile";
import Landing from "./pages/Landing";


import './assets/css/style.css'

// socketIO test code
// import socketIOClient from "socket.io-client";
// end socketIO test

// smoothscroll polyfill is an NPM package that brings smoothscroll functionality to
// browsers like Safari, Edge, and IE. 
import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();


class App extends Component {
  state = {
    isLoggedIn: "",
    
    //socketIO response will go in response
    // response: false,
    // endpoint: "http://localhost:3001",
    //end socketIO test

  };

  componentWillMount() {
    this.getLoginStatus();
  }

  getLoginStatus = () => {
    API.isLoggedIn()
      .then(status => {
        return this.setState({ isLoggedIn: status });
      })
      .catch(err => console.log(err));
  };

//socketIO test code: establish a socketIO connection
  // componentDidMount() {
  //   const { endpoint } = this.state;
  //   const socket = socketIOClient(endpoint);
    //if data comes in from socketIO with the FromAPI tag, it will be put into state
    // socket.on("FromAPI", data => this.setState({ response: data }));
    // socket.emit("UserTest", 'Sample Client Msg');
  //   socket.emit("UserTest",API.getUser());

  // }
//end socketIO test
  render() {
    return (
      <>
        {this.state.isLoggedIn !== "" ? (
          <div className="app">
            <BrowserRouter>
              <PrivateRoute
                isAuthenticated={this.state.isLoggedIn}
                exact
                path="/"
                component={Profile}
              />
              <PrivateRoute
                isAuthenticated={this.state.isLoggedIn}
                path="/project/:id"
                component={Project}
              />
              <Route exact path="/welcome" component={Landing} />
            </BrowserRouter>
          </div>
        ) : null}
      </>
    );
  }
}

export default App;
