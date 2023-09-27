import React, { FC } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import { signupRequest } from "../services/auth";
import ToastComponent, { ToastError, ToastSuccess } from "../components/ToastComponent";
import Container from "../components/Container";
import { Card } from "../components/Card";

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

  return (
    <>
      <Container>
        <Card.Container maxWidth="md">
          <Card.Body>
            <Card.Title title="Criar usuário" />
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
                  <Link style={{ textDecoration: "none" }} to="/login">
                    Log In
                  </Link>
                </p>
              </div>
            </form>
          </Card.Body>
        </Card.Container>
      </Container>

      <ToastComponent />
    </>
  );
};

export default SignUp;
