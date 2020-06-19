import React, {useState} from "react";
import Modal from "react-modal";
import {useForm} from "react-hook-form";
import axios from "axios";
import {Redirect} from "react-router-dom";
import {CirclePicker} from "react-color";
import "./sign-in-up.scss";

Modal.setAppElement("#app");
const SignInUp = () => {
    const [redirect, setRedirect] = useState(false);
    const {handleSubmit, register} = useForm();
    const onSubmit = values => {
        axios
            .post("/api/auth/login", {
                email: values.email,
                password: values.password,
            })
            // eslint-disable-next-line no-unused-vars
            .then(response => {
                
                console.log(response); //response contains token and userId

                localStorage.setItem('currentUser', JSON.stringify(response.data));

                // localStorage.getItem('currentUser')

                setRedirect(true);
            })
            // eslint-disable-next-line no-unused-vars
            .catch(error => {
                // console.log(error);
            });
    };

    if (redirect) {
        return <Redirect to={"/game-page"} />;
    }
    return (
        <div className={"signInUp"}>
            <form
                className={"formInscription"}
                onSubmit={handleSubmit(onSubmit)}>
                <h1>{"Inscription"}</h1>
                <label className={"inputLabel"}>{"Email"}</label>
                <input
                    type={"text"}
                    placeholder={"email"}
                    className={"inputInscription"}
                    name={"email"}
                    ref={register({
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            // message: "invalid email address",
                        },
                    })}
                    required
                />
                {/*errors.email && errors.email.message*/}
                <label className={"inputLabel"}>{"Username"}</label>
                <input
                    className={"inputInscription"}
                    placeholder={"username"}
                    name={"username"}
                    ref={register({
                        validate: value => value !== "admin" || "Nice try!",
                    })}
                    required
                />
                {/* {errors.username && errors.username.message} */}
                <label className={"inputLabel"}>{"Password"}</label>
                <input
                    className={"inputInscription"}
                    placeholder={"*******"}
                    type={"password"}
                    name={"password"}
                    ref={register({
                        pattern: {
                            // value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{-~]).{6,64}$/i,
                            message: "invalid password",
                        },
                    })}
                    required
                />
                {/*errors.password && errors.password.message*/}
                <div className={"formRandomColor"}>
                    <CirclePicker
                        className={"randomColor"}
                        colors={[
                            `#${Math.floor(
                                (Math.random() * 0xffffff) << 0,
                            ).toString(16)}`,
                        ]}
                    />
                    <CirclePicker
                        className={"randomColor"}
                        colors={[
                            `#${Math.floor(
                                (Math.random() * 0xffffff) << 0,
                            ).toString(16)}`,
                        ]}
                    />
                    <CirclePicker
                        className={"randomColor"}
                        colors={[
                            `#${Math.floor(
                                (Math.random() * 0xffffff) << 0,
                            ).toString(16)}`,
                        ]}
                    />
                    <CirclePicker
                        className={"randomColor"}
                        colors={[
                            `#${Math.floor(
                                (Math.random() * 0xffffff) << 0,
                            ).toString(16)}`,
                        ]}
                    />
                    <CirclePicker
                        className={"randomColor"}
                        colors={[
                            `#${Math.floor(
                                (Math.random() * 0xffffff) << 0,
                            ).toString(16)}`,
                        ]}
                    />
                </div>

                <button className={"btn"} type={"submit"}>
                    {"Go !"}
                </button>
            </form>
            <div className={"line"} />
            <form className={"formConnexion"} onSubmit={handleSubmit(onSubmit)}>
                <h1>{"Connexion"}</h1>

                <div className={"bg-icone"}>
                    <i id={"icon"} className={"fas fa-user-alt avatar__icon"} />
                </div>

                <label className={"inputLabel"}>{"Email"}</label>
                <input
                    className={"inputConnexion"}
                    placeholder={"email"}
                    name={"email"}
                    ref={register({
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            // message: "invalid email address",
                        },
                    })}
                    required
                />
                {/*errors.email && errors.email.message*/}
                {/*errors.username && errors.email.massage*/}
                <label className={"inputLabel"}>{"Password"}</label>
                <input
                    className={"inputConnexion"}
                    placeholder={"*******"}
                    type={"password"}
                    name={"password"}
                    ref={register({
                        pattern: {
                            // value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{-~]).{2,64}$/i,
                            //  message: "invalid password",
                        },
                    })}
                    required
                />

                {/*errors.password && errors.password.message*/}

                <button className={"btn"} type={"submit"}>
                    {"Go !"}
                </button>
            </form>
        </div>
    );
};

export default SignInUp;
