import React, {useState} from "react";
import Modal from "react-modal";
import {useForm} from "react-hook-form";
import axios from "axios";
import {Redirect} from "react-router-dom";
import {CirclePicker} from "react-color";
import "./sign-in-up.scss";

const SignInUp = () => {
    const getRandomColor = () => {
        let letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };
    let colorSelected = getRandomColor();

    const handleClickColor = (e) => {
        colorSelected = e.target.title;
    };

    const [redirect, setRedirect] = useState(false);
    const {register, errors, handleSubmit} = useForm();

    const {
        register: registerSignUp,
        errors: errorsSignUp,
        handleSubmit: handleSubmitSignUp,
    } = useForm();

    const onSubmitRegister = (values) => {
        axios
            .post("/api/auth/signup", {
                name: values.nameRegister,
                email: values.emailRegister,
                password: values.passwordRegister,
                color: colorSelected,
            })
            // eslint-disable-next-line no-unused-vars
            .then((response) => {
                const submitLogin = onSubmitLogin({
                    emailLogin: values.emailRegister,
                    passwordLogin: values.passwordRegister,
                });

                submitLogin.then(() => {
                    const currentUser = JSON.parse(
                        localStorage.getItem("currentUser"),
                    );
                    axios
                        .post(
                            "/api/tree/set-random-trees",
                            {},
                            {
                                headers: {
                                    Authorization: `Bearer ${currentUser.token}`,
                                },
                            },
                        )
                        .then(() => {
                            axios
                                .post(
                                    "/api/auth/set-bonus-leaves",
                                    {},
                                    {
                                        headers: {
                                            Authorization: `Bearer ${currentUser.token}`,
                                        },
                                    },
                                )
                                .then(() => {})
                                .catch((error) => {
                                    console.log(error);
                                });
                        })
                        // eslint-disable-next-line no-unused-vars
                        .catch((error) => {
                            // console.log(error);
                        });
                });
            })
            // eslint-disable-next-line no-unused-vars
            .catch((error) => {
                // console.log(error);
            });
    };

    const onSubmitLogin = (values) => {
        return new Promise((resolve, reject) => {
            axios
                .post("/api/auth/login", {
                    email: values.emailLogin,
                    password: values.passwordLogin,
                })
                // eslint-disable-next-line no-unused-vars
                .then((response) => {
                    localStorage.setItem(
                        "currentUser",
                        JSON.stringify(response.data),
                    );

                    setRedirect(true);
                    resolve();
                })
                // eslint-disable-next-line no-unused-vars
                .catch((error) => {
                    reject();
                    // console.log(error);
                });
        });
    };

    if (redirect) {
        return <Redirect to={"/game-page"} />;
    }
    return (
        <div className={"signInUp"}>
            <form
                key={1}
                className={"formInscription"}
                onSubmit={handleSubmit(onSubmitRegister)}>
                <h1>{"Inscription"}</h1>

                {errorsSignUp.emailRegister && (
                    <p className={"error"}>Email incorrect</p>
                )}
                <label className={"inputLabel"}>{"Email"}</label>
                <input
                    type={"text"}
                    className={"inputInscription"}
                    name={"emailRegister"}
                    ref={register({
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                        },
                    })}
                    required
                />

                {errorsSignUp.nameRegister && (
                    <p className={"error"}>Nom est requis</p>
                )}
                <label className={"inputLabel"}>{"Nom"}</label>
                <input
                    className={"inputInscription"}
                    name={"nameRegister"}
                    ref={register({required: true})}
                    required
                />

                {errorsSignUp.passwordRegister && (
                    <p className={"error"}>Mot de passe requis</p>
                )}
                <label className={"inputLabel"}>{"Mot de passe"}</label>
                <input
                    className={"inputInscription"}
                    type={"password"}
                    name={"passwordRegister"}
                    ref={register({required: true})}
                    required
                />

                <div className={"formRandomColor"}>
                    <span
                        onClick={(e) => handleClickColor(e)}
                        className={"randomColor"}>
                        <CirclePicker colors={[getRandomColor()]} />
                    </span>
                    <span
                        onClick={(e) => handleClickColor(e)}
                        className={"randomColor"}>
                        <CirclePicker colors={[getRandomColor()]} />
                    </span>
                    <span
                        onClick={(e) => handleClickColor(e)}
                        className={"randomColor"}>
                        <CirclePicker colors={[getRandomColor()]} />
                    </span>
                    <span
                        onClick={(e) => handleClickColor(e)}
                        className={"randomColor"}>
                        <CirclePicker colors={[getRandomColor()]} />
                    </span>
                    <span
                        onClick={(e) => handleClickColor(e)}
                        className={"randomColor"}>
                        <CirclePicker colors={[getRandomColor()]} />
                    </span>
                </div>
                <button className={"btn"} type={"submit"}>
                    {"Go !"}
                </button>
            </form>

            <div className={"line"} />

            <form
                key={2}
                className={"formConnexion"}
                onSubmit={handleSubmitSignUp(onSubmitLogin)}>
                <h1>{"Connexion"}</h1>

                <div className={"bg-icone"}>
                    <i id={"icon"} className={"fas fa-user-alt avatar__icon"} />
                </div>

                {errors.emailLogin && (
                    <p className={"error"}>Email incorrect</p>
                )}
                <label className={"inputLabel"}>{"Email"}</label>
                <input
                    className={"inputConnexion"}
                    name={"emailLogin"}
                    ref={registerSignUp({
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                        },
                    })}
                    required
                />

                {errors.passwordLogin && (
                    <p className={"error"}>Mot de passe requis</p>
                )}
                <label className={"inputLabel"}>{"Mot de passe"}</label>
                <input
                    className={"inputConnexion"}
                    type={"password"}
                    name={"passwordLogin"}
                    ref={registerSignUp({required: true})}
                    required
                />

                <button className={"btn"} type={"submit"}>
                    {"Go !"}
                </button>
            </form>
        </div>
    );
};

export default SignInUp;
