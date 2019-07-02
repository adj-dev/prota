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
  // getTasksBySprintId: id => {
  //   new Promise((resolve, reject) => {
  //     let tasks = data.getTasksBySprintId(id);
  //     console.log(tasks);

  //     resolve(tasks);
  //   })
  // }
  getTasksBySprintId: id =>
    new Promise((resolve, reject) => {
      let result = data.getTasksBySprintId(id);

      resolve(result);
    })
};
