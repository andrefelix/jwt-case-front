import React, { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createTaskRequest, getTaskListRequest } from "../services/tasks";
import { TaskList } from "../types/types";
import { handleRejectError } from "../utils/handle-reject-error";
import ToastComponent, { ToastError, ToastSuccess } from "../components/ToastComponent";
import Container from "../components/Container";
import { Card } from "../components/Card";

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
        handleRejectError(error);
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
      <Container>
        <Card.Container maxWidth="lg">
          <Card.Nav linkName="Planet List" handleLink={handlePlanetLink} />
          <Card.Body>
            <Card.Title title="Task List" />
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
          </Card.Body>
        </Card.Container>
      </Container>

      <ToastComponent />
    </>
  );
};

export default Tasks;
