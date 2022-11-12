import React, { useState } from "react";
import "./Sign.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import Error from "../layouts/Error";

const Sign = () => {
    const [signup, setSignup] = useState(false);
    const [loginError, setLoginError] = useState(false);

    const cookies = new Cookies();
    const myCookie = cookies.get("token");

    const navigate = useNavigate();

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const {
        register: register2,
        formState: { errors: errors2 },
        handleSubmit: handleSubmit2,
    } = useForm();

    const signupHandle = () => {
        setSignup(true);
    };

    const loginHandle = () => {
        setSignup(false);
    };

    const signUp = (data) => {
        axios
            .post(`http://localhost:4000/user/signup`, {
                username: data.usernameUp,
                name: data.nameUp,
            })
            .then((res) => {
                cookies.set("token", res.data.token, { path: "/" });
            })
            .catch(function (error) {
                console.log(error);
            });
        navigate("/");
    };

    const signIn = (data) => {
        axios
            .post(`http://localhost:4000/user/login`, {
                username: data.usernameIn,
                password: data.passwordIn,
            })
            .then((res) => {
                cookies.set("token", res.data.token, { path: "/" });
            })
            .catch(function (err) {
                console.log(err);
                setLoginError(true);
            });
        navigate("/");
    };

    if (myCookie) return <Error />;

    return (
        <div className="sign--container flex top-[80px] md:mx-auto md:w-[700px]">
            <div
                className={`message ${
                    signup === true
                        ? "signup translate-x-[100%]"
                        : "login translate-x-[0]"
                }`}
            >
                <div className="btn-wrapper">
                    <button onClick={signupHandle} className="button">
                        Sign Up
                    </button>
                    <button onClick={loginHandle} className="button">
                        Login
                    </button>
                </div>
            </div>
            <div className="form form--signup">
                <div className="form--heading md:text-2xl">
                    Welcome! Sign Up
                </div>
                <form autoComplete="off" onSubmit={handleSubmit(signUp)}>
                    <input
                        {...register("usernameUp", {
                            required: true,
                            minLength: 1,
                            maxLength: 17,
                            pattern: {
                                value: /^[a-z0-9]/,
                            },
                        })}
                        type="text"
                        placeholder="Username"
                        className={`${
                            errors.usernameUp?.type === "required" &&
                            "border-bottom-4 border-red-500/75"
                        }`}
                    />
                    {errors.usernameUp?.type === "pattern" && (
                        <span className="w-[92%] px-1 bg-red-200 text-[.7rem] text-red-900 rounded-md ring-2 ring-red-400/50">
                            Use Lower Case letters and Numbers.
                        </span>
                    )}
                    {errors.usernameUp?.type === "required" && (
                        <span className="w-[92%] px-1 bg-red-200 text-[.7rem] text-red-900 rounded-md ring-2 ring-red-400/50">
                            Fill Username field.
                        </span>
                    )}
                    <input
                        {...register("nameUp", {
                            required: true,
                            minLength: 1,
                            maxLength: 17,
                        })}
                        type="text"
                        placeholder="Name"
                        className={`${
                            errors.nameUp?.type === "required" &&
                            "border-bottom-4 border-red-500/75"
                        }`}
                    />
                    {errors.nameUp?.type === "required" && (
                        <span className="w-[92%] px-1 bg-red-200 text-[.7rem] text-red-900 rounded-md ring-2 ring-red-400/50">
                            Fill Name field.
                        </span>
                    )}
                    <button className="button">Sign Up</button>
                </form>
            </div>
            <div className="form form--login">
                <div className="form--heading md:text-2xl">Welcome back!</div>
                <form autoComplete="off" onSubmit={handleSubmit2(signIn)}>
                    <input
                        {...register2("usernameIn", {
                            required: true,
                            minLength: 1,
                            maxLength: 17,
                            pattern: {
                                value: /^[a-z0-9]/,
                            },
                        })}
                        type="text"
                        placeholder="Username"
                        className={`${
                            errors2.usernameIn?.type === "required" &&
                            "border-bottom-4 border-red-500/75"
                        }`}
                    />
                    <input
                        {...register2("passwordIn", {
                            required: true,
                        })}
                        type="password"
                        placeholder="Password"
                        className={`${
                            errors2.passwordIn?.type === "required" &&
                            "border-bottom-4 border-red-500/75"
                        }`}
                    />
                    {loginError && (
                        <span className="w-[92%] px-1 bg-red-200 text-[.7rem] text-red-900 rounded-md ring-2 ring-red-400/50">
                            Username or password is incorrect!
                        </span>
                    )}
                    <button className="button">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Sign;
