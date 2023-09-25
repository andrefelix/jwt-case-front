import { HttpStatusCode } from "axios";
import { getAPIClient } from "./api";
import { getLocalStorageAuth } from "../utils/local-storage";

type TaskCreateRequestData = {
  name: string;
};

const api = getAPIClient();

export const createTaskRequest = async (body: TaskCreateRequestData) => {
  const token = getLocalStorageAuth();

  try {
    const { data, status } = await api.post("/tasks", body, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (status !== HttpStatusCode.Created) {
      throw new Error(data.message);
    }

    return data;
  } catch (error: any) {
    throw error;
  }
};
