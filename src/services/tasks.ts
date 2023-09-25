import { HttpStatusCode } from "axios";
import { getAPIClient } from "./api";
import { Task, TaskList } from "../types/types";
import { generateAuthorization } from "./helper";

type TaskCreateRequestData = {
  name: string;
};

const api = getAPIClient();

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
