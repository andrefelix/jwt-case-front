import React, { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Flip, ToastContainer, toast } from "react-toastify";
import { createTaskRequest, getTaskListRequest } from "../services/tasks";
import { TaskList } from "../types/types";
import { handleError } from "../utils/handle-error";

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

      toast.success("Task criada com sucesso", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: 0,
        toastId: "my_toast",
      });
    } catch (error) {
      console.log(error);

      toast.error("Erro ao criar a task", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: 0,
        toastId: "my_toast",
      });
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

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
        limit={1}
        transition={Flip}
      />
    </>
  );
};

export default Tasks;
