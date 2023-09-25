import { HttpStatusCode } from "axios";
import { getAPIClient } from "./api";
import { generateAuthorization } from "./helper";
import { getLocalStorageAuth } from "../utils/local-storage";

const api = getAPIClient();

const parseJwt = (token: any) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

export const testCurrentUserRequest = async () => {
  const token = getLocalStorageAuth();
  const { sub } = parseJwt(token);

  try {
    const { data, status } = await api.get(`/users/${sub}`, {
      headers: generateAuthorization(),
    });

    if (status !== HttpStatusCode.Ok) {
      throw new Error(data.message);
    }
  } catch (error) {
    throw error;
  }
};
