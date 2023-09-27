import React, { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createTaskRequest, getTaskListRequest } from "../services/tasks";
import { TaskList } from "../types/types";
import { handleError } from "../utils/handle-error";
import ToastComponent, { ToastError, ToastSuccess } from "../components/ToastComponent";

const Tasks: FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [taskList, setTaskList] = useState<TaskList>([]);

  useEffect(() => {
    const fetchTaskList = async () => {
      try {
        const data = await getTaskListRequest();
        setTaskList(data);
      } catch (error) {
        handleError(error);
      }
    };

    fetchTaskList();
  }, []);

  const createTask = async (data: any) => {
    const params = { name: data.taskName };

    try {
      const task = await createTaskRequest(params)
      setTaskList([...taskList, task]);
      ToastSuccess("Task criada com sucesso");
    } catch (error) {
      console.log(error);
      ToastError("Erro ao criar a task");
    } finally {
      reset();
    }
  };

  const handlePlanetLink = () => {
    window.location.replace("/planets");
  }

  return (
    <>
      <div className="container">
        <div
          className="row d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          
          <div className="card mb-3" style={{ maxWidth: "720px" }}>
            <nav className="navbar bg-body-tertiary">
              <div className="container-fluid">
                <button className="btn btn-link" onClick={handlePlanetLink}>Planet list</button>
              </div>
            </nav>
            <div className="col-md-12">
              <div className="card-body">
                <h3 className="card-title text-center text-secondary mt-3">
                  Tasks
                </h3>
                <form className="row" autoComplete="off" onSubmit={handleSubmit(createTask)}>
                  <div className="mb-3 mt-4">
                    <label className="form-label">Nome da task</label>
                    <input
                      type="text"
                      className="form-control shadow-none"
                      id="taskname-login-id"
                      {...register("taskName", { required: "Nome da task é obrigatório!" })}
                    />
                    {errors.taskName && (
                      <p className="text-danger" style={{ fontSize: 14 }}>
                        {`${errors.taskName.message}`}
                      </p>
                    )}
                  </div>
                  <div>
                    <button className="btn btn-primary" type="submit">Criar nova task</button>
                  </div>
                </form>
                <div className="mt-4">
                  <ul className="list-group">
                    {taskList.map(task => {
                      return (<li className="list-group-item" key={task.id}>{task.name}</li>);
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastComponent />
    </>
  );
};

export default Tasks;
