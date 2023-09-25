import axios from "axios";

export function getAPIClient() {
  const baseURL = process.env.REACT_APP_BASE_URL;
  const api = axios.create({ baseURL });

  return api;
}
