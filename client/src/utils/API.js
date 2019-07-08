import axios from "axios";
export default {
  getUser: () =>
    axios.get("/api/user").then(response => response.data),
  createUser: username =>
    axios.post(`api/users/${username}`).then(response => response.data),
  logout: () =>
    axios.get("/auth/logout").then(response => response.data),
  isLoggedIn: () =>
    axios.get("/auth/status").then(response => response.data),
  getUsersFuzzy: username =>
    axios.get(`/api/user/${username}/fuzzy`).then(response => response.data),
  getProject: id =>
    axios.get(`/api/project/${id}`).then(response => response.data),
  createProject: project =>
    axios.post("/api/projects", project).then(response => response.data),
  addSprint: sprint =>
    axios.post("/api/sprints", sprint).then(response => response.data),
  updateSprint: (sprintId, sprint) =>
    axios.put(`/api/sprints/${sprintId}`, sprint).then(response => response.data),
  getTasksByUser: id =>
    axios.get(`/api/tasks/user/${id}`).then(response => response.data),
  updateTask: (taskId, task) =>
    axios.put(`/api/tasks/${taskId}`, task).then(response => response.data),
  createTask: task =>
    axios.post('/api/tasks', task).then(response => response.data),
  deleteTask: taskId =>
    axios.delete(`/api/tasks/${taskId}`).then(response => response.data)
};
