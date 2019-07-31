import React, { Component } from "react";
import ProjectList from "../../components/ProjectList";
import MyTasks from "../../components/MyTasks";

import API from "../../utils/API";
import "./style.css";
import CreateProject from "../../components/CreateProject";
import NavBar from "../../components/NavBar";
import ProjectCard from "../../components/ProjectCard";
// socketIO test code
import socketIOClient from "socket.io-client";
// end socketIO test

class Profile extends Component {
  state = {
    user: null,
    tasks: null,
    creatingProject: false,
    blur: false,

    //socketIO response will go in response
    response: false,
    lastUserTime: false,
    endpoint: "http://localhost:3001",
    //end socketIO test
    
    
  };

  componentDidMount = async () => {
    if (!this.state.user) {
      let user = await API.getUser().then(user => {
        console.log("User:", user);
        console.log("Projects: ", user.projects);
        user.projects = user.projects.reverse();
        return user;
      });
      let tasks = await API.getTasksByUser(user._id).then(tasks => {
        console.log("Tasks:", tasks);
        return tasks;
      });
      this.setState({ user, tasks });
    }
  // socketIO test sending Username to messaging    
  const { endpoint } = this.state;
  const socket = socketIOClient(endpoint);
  //if data comes in from socketIO on the FromServerAvatar channel, it will be put into state
  socket.on("FromServerAvatarUrl", data => {
    this.setState({ response: data })
    console.log("|Server| Avatar Url from server socketIO: " + data)
  });
  socket.on("LastUserTime", data => {
    this.setState({ lastUserTime: data })
    console.log("|Server| Last User Time server socketIO: " + data)
  });
  //sample emit calls from this user to all other connected parties
  //(except itself)
  socket.emit("UserMessage",this.state.user);
  socket.emit("TasksMessage",this.state.tasks);
  // end socketIO test code
  };

  handleChangeStatus = (taskId, status) => {
    API.updateTask(taskId, { status }).then(newTask => {
      newTask.assignee = newTask.assignee._id;
      let newTasks = this.state.tasks.map(task => {
        if (task._id === taskId) {
          return newTask;
        } else {
          return { ...task };
        }
      });
      console.log("Previous Tasks:");
      console.table(this.state.tasks);
      console.log("New Tasks:");
      console.table(newTasks);
      this.setState({ tasks: newTasks });
    });
  };

  toggleCreateProjectDialog = e => {
    let targetElement = e.target;
    if (targetElement.closest(".modal")) {
      return;
    }

    console.log("Create a Project!");
    this.setState(prevState => {
      return { creatingProject: !prevState.creatingProject, blur: !prevState.blur };
    });
  };

  render() {
    return (
      <>
        {this.state.user ? (
          <>
            <NavBar
              avatarUrl={this.state.user.avatar_url}
              displayName={this.state.user.display_name}
              style={this.state.blur ? { filter: 'blur(3px)' } : null}
            />
            {/* socketIO test */}
            <div className="socketIO-test"  style={{
                    float: 'right',
                    // padding: '.5vw',
                    backgroundColor: '#c5ced8',
                    borderRadius: '2px',
                    marginTop: '50px',
                    marginRight: '10px'
            }}>
              <h5>
                <img 
                  src={this.state.response ? this.state.response : "" } 
                  alt='lastLoggedinUser'
                  style={{
                    borderRadius: '50%', 
                    height: '30px',
                    padding: '5px'
                  }}
                />
                At: {this.state.lastUserTime}
              </h5>
              <h5 style={{
                padding: '3px'
              }}>(Last logged in user)</h5>
              
            </div>
           {/* end socketIO test */}

            <div className="page" style={this.state.blur ? { filter: 'blur(3px)' } : null}>
              <div className="row">
                <div className="col full">
                  <ProjectCard
                    project={{ name: this.state.user.display_name }}
                    team={[]}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col half">
                  {this.state.user.projects ? (
                    <ProjectList
                      toggleCreateProjectDialog={this.toggleCreateProjectDialog}
                      projects={[...this.state.user.projects]}
                    />
                  ) : (
                      ""
                    )}
                </div>
                <div className="col half">
                  <MyTasks
                    handleChangeStatus={this.handleChangeStatus}
                    projects={this.state.user.projects}
                    tasks={this.state.tasks}
                    username={this.state.user.username}
                  />
                </div>
              </div>
            </div>
            {this.state.creatingProject ? (
              <CreateProject
                toggleCreateProjectDialog={this.toggleCreateProjectDialog}
                user={this.state.user}
              />
            ) : null}
          </>
        ) : (
            ""
          )}
      </>
    );
  }
}

export default Profile;
