import mockData from "./mockData";
let data = new mockData();
export default {
  getUser: () =>
    new Promise((resolve, reject) => {
      resolve(data.getUser());
    }),
  isLoggedIn: () =>
    new Promise((resolve, reject) => {
      resolve(true);
    }),
  getProject: id =>
    new Promise((resolve, reject) => {
      let projects = data.getProjects();

      //default result to unauthorized until we find what we're looking for
      let result = { unauthorized: true };
      //search db for projects
      for (let project in projects) {
        //if we have a project save it in result
        if (projects[project]._id === id) {
          result = projects[project];
        }
      }
      //return the result of our search
      resolve(result);
    }),
  getTasks: username =>
    new Promise((resolve, reject) => {
      let tasks = data.getTasks();

      //default result to unauthorized until we find what we're looking for
      let result = [];
      //search db for projects
      for (let task in tasks) {
        //if we have a project save it in result
        if (tasks[task].assignee && tasks[task].assignee.username === username) { // John - I added the first condition so that our mockData wouldn't throw an error
          console.log("task:", task);

          result.unshift(tasks[task]);
        }
      }
      //return the result of our search
      resolve(result);
    }),
  getTasksBySprintId: id =>
    new Promise((resolve, reject) => {
      let result = data.getTasksBySprintId(id);
      resolve(result);
    }),
  getUsersFuzzy: query =>
    new Promise((resolve, reject) => {
      let result = data.getUsersFuzzy(query);
      resolve(result);
    }),

  createProject: project =>
    new Promise((resolve, reject) => {
      let result = data.addProject(project);
      resolve(result);
    })
};
