import axios from "axios";

export const getAPIClient = () => {
  const baseURL = process.env.REACT_APP_BASE_URL;
  const api = axios.create({ baseURL });

  return api;
};
