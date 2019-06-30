import axios from "axios";
export default {
  getUser: () => axios.get("/util/user").then(response => response.data),
  isLoggedIn: () =>
    axios.get("/api/auth-status").then(response => response.data),
  getProject: id =>
    new Promise((resolve, reject) => {
      if (id === "4") {
        resolve({ unauthorized: true });
      } else {
        resolve({ title: "Final Project", id });
      }
    })
};
