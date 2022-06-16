import Head from "next/head";
import Image from "next/image";
import React from "react";
import style from "../styles/Login.module.css";
import { useForm, SubmitHandler } from "react-hook-form";
import useAuth from "../hooks/useAuth";

interface Inputs {
  email: string;
  password: string;
}

function Login() {
  const [login, setLogin] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { signIn, signUp } = useAuth();

  const onSubmit: SubmitHandler<Inputs> = async ({ password, email }) => {
    if (login) {
      // login logic
      await signIn(email, password);
    } else {
      // register logic
      await signUp(email, password);
    }
  };
  return (
    <div className={style.login}>
      <Head>
        <title>Netflix</title>
        <meta name="description" content="best netflix clone app " />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Image
        src="https://rb.gy/p2hphi"
        layout="fill"
        className={style.image_bg}
        objectFit="cover"
      />

      <img
        src="https://rb.gy/ulxxee"
        className={style.image_logo}
        width={150}
      />

      <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
        <h1 className={style.form_title}>Sign In</h1>
        <div className={style.form_wrapper}>
          <input
            type="email"
            placeholder="Email: example@gmail.com"
            className={style.input}
            {...register("email", {
              required: true,
            })}
          />
          {errors.email && (
            <span className={style.validate}>Email field is required</span>
          )}
          <input
            type="password"
            placeholder="Password: ........."
            className={style.input}
            {...register("password", {
              required: true,
            })}
          />

          {errors.password && (
            <span className={style.validate}>password field is required</span>
          )}
        </div>

        <button
          type="submit"
          className={style.btn}
          onClick={() => setLogin(true)}
        >
          Login
        </button>

        <div className={style.signup}>
          Don't have an account?{" "}
          <button className={style.btn_signup} onClick={() => setLogin(false)}>
            Sign Up Now
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
