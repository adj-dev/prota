import axios from "axios";
export default {
  getUser: () => axios.get("/api/user").then(response => response.data)
};
