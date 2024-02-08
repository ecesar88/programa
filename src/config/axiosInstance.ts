import axios from "axios";

const server = axios.create({
  baseURL: "http://localhost:3001/",
  // baseURL: `${}`,
});

export default server;
