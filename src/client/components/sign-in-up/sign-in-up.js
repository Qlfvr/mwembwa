import React, {useState} from "react";
import Modal from "react-modal";
import {useForm} from "react-hook-form";
import axios from "axios";
import {Redirect} from "react-router-dom";
import "./sign-in-up.scss";

Modal.setAppElement("#app");
const SignInUp = () => {
    console.log("qqchose");
    const [redirect, setRedirect] = useState(false);
    const {handleSubmit, register, errors} = useForm();
    const onSubmit = (values) => {
        axios
            .post("/api/auth/login", {
                email: values.email,
                password: values.password,
            })
            // eslint-disable-next-line no-unused-vars
            .then((response) => {
                // console.log(response);
                setRedirect(true);
                return <Redirect to={"/"} />;
            })
            // eslint-disable-next-line no-unused-vars
            .catch((error) => {
                console.log(error);
            });
    };
    const [hex, setHex] = useState("#ffffff");
    const randomizedHex = () => {
        const randomColor = `#${Math.floor(Math.random() * 16777215).toString(
            16,
        )}`;
        setHex(randomColor);
    };
    if (redirect) {
        return <Redirect to={"/game-page"} />;
    }
    return (
        <div className={"signInUp"}>
            <form
                className={"formInscription"}
                onSubmit={handleSubmit(onSubmit)}>
                <h1> {"Inscription"} </h1>{" "}
                <label className={"inputLabel"}> {"Email"} </label>{" "}
                <input
                    className={"inputInscription"}
                    name={"email"}
                    ref={register({
                        required: "Required",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: "invalid email address",
                        },
                    })}
                />{" "}
                {errors.email && errors.email.message}{" "}
                <label className={"inputLabel"}> {"Username"} </label>{" "}
                <input
                    className={"inputInscription"}
                    name={"username"}
                    ref={register({
                        validate: (value) => value !== "admin" || "Nice try!",
                    })}
                />{" "}
                {/* {errors.username && errors.username.message} */}{" "}
                <label className={"inputLabel"}> {"Password"} </label>{" "}
                <input
                    className={"inputInscription"}
                    name={"password"}
                    ref={register({
                        required: "Required",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: "invalid password",
                        },
                    })}
                />
                {errors.password && errors.password.message}
                <button
                    className={"btn"}
                    type={"button"}
                    onClick={randomizedHex}
                    style={{
                        backgroundColor: `${hex}`,
                    }}>
                    {" "}
                    {"Pick a Color !"}{" "}
                </button>
                <button className={"btn"} type={"submit"}>
                    {" "}
                    {"Go !"}{" "}
                </button>{" "}
            </form>
            <form className={"formConnexion"} onSubmit={handleSubmit(onSubmit)}>
                <h1> {"Connexion"} </h1>
                <div>
                    <i id={"icon"} className={"fas fa-user-alt avatar__icon"} />{" "}
                </div>
                <label className={"inputLabel"}> {"Email"} </label>{" "}
                <input
                    className={"inputConnexion"}
                    name={"email"}
                    ref={register({
                        required: "Required",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: "invalid email address",
                        },
                    })}
                />{" "}
                {errors.email && errors.email.message}{" "}
                {errors.username && errors.email.massage}{" "}
                <label className={"inputLabel"}> {"Password"} </label>{" "}
                <input
                    className={"inputConnexion"}
                    name={"password"}
                    ref={register({
                        required: "Required",
                        pattern: {
                            message: "invalid password",
                        },
                    })}
                />
                {errors.password && errors.password.message}
                <button className={"btn"} type={"submit"}>
                    {" "}
                    {"Go !"}{" "}
                </button>{" "}
            </form>{" "}
        </div>
    );
};

export default SignInUp;
