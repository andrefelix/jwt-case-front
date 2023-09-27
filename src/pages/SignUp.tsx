import React, { FC } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import { signupRequest } from "../services/auth";
import ToastComponent, { ToastError, ToastSuccess } from "../components/ToastComponent";

const SignUp: FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const submitData = async (data: any) => {
    const params = {
      userName: data.userName,
      password: data.password,
    };

    try {
      await signupRequest(params);
      ToastSuccess("Usuário criado com sucesso");
      reset();
      
      setTimeout(() => {
        window.location.replace("/login");
      }, 1000);
    } catch (error) {
      console.log(error);
      ToastError("Erro ao criar usuário");
    }
  };

  const handleLoginClick = () => {
    window.location.replace("/login");
  }

  return (
    <>
      <div className="container">
        <div
          className="row d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <div className="card mb-3 mt-3 rounded" style={{ maxWidth: "500px" }}>
            <div className="col-md-12">
              <div className="card-body">
                <h3 className="card-title text-center text-secondary mt-3 mb-3">
                  Criar usuário
                </h3>
                <form
                  className="row"
                  autoComplete="off"
                  onSubmit={handleSubmit(submitData)}
                >
                  <div className="">
                    <label className="form-label">Username</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="username-signup-id"
                      {...register("userName", { required: "Username é obrigatório!" })}
                    />
                    {errors.userName && (
                      <p className="text-danger" style={{ fontSize: 14 }}>
                        {`${errors.userName.message}`}
                      </p>
                    )}
                  </div>
                  <div className="">
                    <label className="form-label">Senha</label>
                    <input
                      type="password"
                      className="form-control form-control-sm"
                      id="password-signup-id"
                      {...register("password", { required: "Senha é obrigatório!" })}
                    />
                    {errors.password && (
                      <p className="text-danger" style={{ fontSize: 14 }}>
                        {`${errors.password.message}`}
                      </p>
                    )}
                  </div>
                  <div className="">
                    <label className="form-label">Confirme a senha</label>
                    <input
                      type="password"
                      className="form-control form-control-sm"
                      id="confirmpassword-signup-id"
                      {...register("confirmPassword", {
                        required: "Confirmação de senha é obrigatório",

                        validate: (value) =>
                          value === watch("password") ||
                          "As senhas não são iguais.",
                        })
                      }
                    />
                    {errors.confirmPassword && (
                      <p className="text-danger" style={{ fontSize: 14 }}>
                        {`${errors.confirmPassword.message}`}
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
                    <p className="card-text">
                      Já possui uma conta?{" "}
                      <Link
                        style={{ textDecoration: "none" }}
                        to={"/login"}
                        onClick={handleLoginClick}
                      >
                        Log In
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

export default SignUp;
