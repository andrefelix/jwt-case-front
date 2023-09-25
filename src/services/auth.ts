import { HttpStatusCode } from "axios";
import { getAPIClient } from "./api";

type LoginRequestData = {
  userName: string;
  password: string;
};

type SignupUserRequestData = {
  userName: string;
  password: string;
};

const api = getAPIClient();

export const loginRequest = async (body: LoginRequestData): Promise<string> => {
  try {
    const { data, status } = await api.post("/auth/login", body);

    if (status !== HttpStatusCode.Ok) {
      throw new Error(data.message);
    }

    return data.token;
  } catch (error: any) {
    throw error;
  }
};

export const signupRequest = async (body: SignupUserRequestData) => {
  try {
    const { data, status } = await api.post("/auth/signup", body);

    if (status !== HttpStatusCode.Created) {
      throw new Error(data.message);
    }
  } catch (error) {
    throw error;
  }
};
