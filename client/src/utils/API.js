import axios from "axios";
export default {
  getUser: () => axios.get("/util/user").then(response => response.data),
  isLoggedIn: () => axios.get("/auth/status").then(response => response.data),
  getProject: id => axios.get(`/api/project/${id}`).then(response => response.data)
};
