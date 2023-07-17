import { useState } from "react";
import { login } from "../services/loginServices";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import "./login.css";
import Header from "../components/header/Header";

function Login() {
  const navigateTo = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (dataUser) => {
    try {
      const data = await login(dataUser.email, dataUser.password);
      localStorage.setItem("userTinder", JSON.stringify(data[1]));
      navigateTo(`/`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <div className="login-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            {...register("email", {
              required: true,
              pattern:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
          />
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: 6,
            })}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
}

export default Login;
