import axios from "axios";

import { port, url } from "../../env";

export const api = axios.create({
  baseURL: `http://${url}:${port}`,
});
