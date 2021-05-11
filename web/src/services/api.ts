import axios from "axios";

export const api = axios.create({
  baseURL: `http://localhost:${process.env.REACT_APP_PORT}`,
});
