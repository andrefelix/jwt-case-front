import React, { FC } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import { loginRequest } from "../services/auth";
import { setLocalStorageAuth } from "../utils/local-storage";
import ToastComponent, { ToastError, ToastSuccess } from "../components/ToastComponent";

const Login: FC = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const login = async (data: any) => {
    const params = {
      userName: data.userName,
      password: data.password,
    };

    try {
      const token = await loginRequest(params);

      setLocalStorageAuth(token);

      setTimeout(() => {
        window.location.replace("/tasks");
      }, 1000);

      ToastSuccess("Usuário logado com sucesso");
    } catch (error) {
      console.log(error);
      ToastError("Erro ao logar com o usuário");
    }
  };

  const handleSignupClick = () => {
    window.location.replace("/signup");
  }

  return (
    <>
      <div className="container">
        <div
          className="row d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <div className="card mb-3" style={{ maxWidth: "320px" }}>
            <div className="col-md-12">
              <div className="card-body">
                <h3 className="card-title text-center text-secondary mt-3">
                  Login
                </h3>
                <form autoComplete="off" onSubmit={handleSubmit(login)}>
                  <div className="mb-3 mt-4">
                    <label className="form-label">Username</label>
                    <input
                      type="text"
                      className="form-control shadow-none"
                      id="username-login-id"
                      {...register("userName", { required: "Username é obrigatório!" })}
                    />
                    {errors.userName && (
                      <p className="text-danger" style={{ fontSize: 14 }}>
                        {`${errors.userName.message}`}
                      </p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control shadow-none"
                      id="password-login-id"
                      {...register("password", {
                        required: "Password é obrigatório!",
                      })}
                    />
                    {errors.password && (
                      <p className="text-danger" style={{ fontSize: 14 }}>
                        {`${errors.password.message}`}
                      </p>
                    )}
                  </div>
                  <div className="text-center mt-4 ">
                    <button
                      className="btn btn-outline-primary text-center shadow-none mb-3"
                      type="submit"
                    >
                      Submit
                    </button>
                    <p className="card-text pb-2">
                      Criar uma conta nova?{" "}
                      <Link
                        style={{ textDecoration: "none" }}
                        to={"/signup"}
                        onClick={handleSignupClick}
                      >
                        Sign Up
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastComponent />
    </>
  );
};

export default Login;
