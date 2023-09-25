import { HttpStatusCode } from "axios";
import { getAPIClient } from "./api";
import { getLocalStorageAuth } from "../utils/local-storage";
import { Task, TaskList } from "../types/types";

type TaskCreateRequestData = {
  name: string;
};

const api = getAPIClient();

const generateAuthorization = () => {
  const token = getLocalStorageAuth();

  return { Authorization: `Bearer ${token}` };
};

export const createTaskRequest = async (
  body: TaskCreateRequestData
): Promise<Task> => {
  try {
    const { data, status } = await api.post("/tasks", body, {
      headers: generateAuthorization(),
    });

    if (status !== HttpStatusCode.Created) {
      throw new Error(data.message);
    }

    return data;
  } catch (error: any) {
    throw error;
  }
};

export const getTaskListRequest = async (): Promise<TaskList> => {
  try {
    const { data, status } = await api.get("/tasks", {
      headers: generateAuthorization(),
    });

    if (status !== HttpStatusCode.Ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    throw error;
  }
};
