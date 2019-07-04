import axios from "axios";
export default {
  getUser: () =>
    axios.get("/api/user").then(response => response.data),
  isLoggedIn: () =>
    axios.get("/auth/status").then(response => response.data),
  getProject: id =>
    axios.get(`/api/project/${id}`).then(response => response.data),
  createProject: project =>
    axios.post("/api/projects", project).then(response => response.data),
  getTasksByUser: id =>
    axios.get(`/api/tasks/user/${id}`).then(response => response.data),
  updateTask: (taskId, userId) =>
    axios.put(`/api/tasks/${taskId}`, { assignee: userId }).then(response => response.data),
  getUserByUsername: username =>
    axios.get(`/api/user/${username}`).then(response => response.data)
};
