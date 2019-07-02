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
        if (tasks[task].assignee.username === username) {
          console.log("task:", task);

          result.unshift(tasks[task]);
        }
      }
      //return the result of our search
      resolve(result);
    })
};
