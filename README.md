# Final Project: Prota
App for Project Managment
**Created**: `2019 June 09`

## ABOUT PROTA APP
A project management tool influenced by the Agile methodology for GitHub developers. Invite collaborators, develop projects, view sprints, and take on tasks in our Agile development based project management system. 

Deployed at: https://majestic-mesa-verde-10359.herokuapp.com/  
Repository: https://github.com/adj-dev/final-project  

# Development:
## Project Team:

* Front End Development Team:
    * [Andrew Johnson](https://github.com/adj-dev) - Lead React Developer
    * [John Blake](https://github.com/johniblake) - Lead Engineer
    * [Nhu Richie](https://github.com/nhurichie) - Project Manger/Styles Designer

* Back End Development Team:
    * [Adam Schubert](https://github.com/leavinit) - Route/Security Developer
    * [Kieran Anthony](https://github.com/zekkxx) - Database Architect

## Project Stack:

This project utilizes a __MERN__ stack. 

__M__ ongo : MongoDB , a non-relational database to store our User, Project, Sprint, and Task data. 

__E__ xpress : Express.js, a server framework to manage the flow between our front and back end systems.

__R__ eact : React.js, A UI development framework to handle how our app is displayed

__N__ ode :  Node.js, A Javascript runtime environment that allows for server-side scripting in Javascript


Dependencies in the project include:

__mongoose, express, axios, and passport__.  
For a full list of dependencies reference the _package.json_ file included in the project.

## Project Requirements:
In order to use this application, you will need to visit the deploy link referenced above and have a GitHub user account. If you don't have one, you'll need to create one. There is currently no independent login functionality associated with the application.  

If hosting this application or trying to run it locally, you will need __MongoDB__ installed on your machine and will need to be run `mongod` on a terminal/command line. Next you will need to run `npm run start` in the terminal from the top level of the project where `server.js` lives.  
```
mongod
```

```
npm run start
```

## App Preview

**Splash/Sign-in Page**: Here you will see the splash page and will need to log-in with your GitHub credentials.
 <img src='https://github.com/adj-dev/final-project/blob/master/client/public/assets/img/Prota.png?raw=true' width=400 />

 **Project/Tasks Page**: Here you will see your assigned projects and their statuses.

 <img src='https://github.com/adj-dev/final-project/blob/master/client/public/assets/img/projects-tasks.png?raw=true' width=400 />

 **Tasks/Sprints**: Here you will see all your tasks and sprints assigned to these tasks.

 <img src='https://github.com/adj-dev/final-project/blob/master/client/public/assets/img/sprints-tasks.png?raw=true' width=400 />

