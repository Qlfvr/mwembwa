import React, {useState} from "react";
import Modal from "react-modal";
import {useForm} from "react-hook-form";

import "./sign-in-up.scss";

Modal.setAppElement("#app");
const SignInUp = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const {handleSubmit, register, errors} = useForm();
    const onSubmit = values => console.log(values);
    const [hex, setHex] = useState("#ffffff");
    const randomizedHex = () => {
        const randomColor = `#${Math.floor(Math.random() * 16777215).toString(
            16,
        )}`;
        setHex(randomColor);
    };
    return (
        <div className={"homePage"}>
            <div className={"head"}>
                <h1>{"Mwembwa"}</h1>
                <button
                    className={"buttonSign"}
                    type={"button"}
                    onClick={() => setModalIsOpen(true)}>
                    {" Sign In / Sign Up"}
                </button>

                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={() => setModalIsOpen(false)}
                    style={{
                        overlay: {
                            background: "grey",
                        },
                    }}
                    id={"form-container"}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h1>{"Inscription"}</h1>
                        <label>{"Email"}</label>
                        <input
                            name={"email"}
                            ref={register({
                                required: "Required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message: "invalid email address",
                                },
                            })}
                        />
                        {errors.email && errors.email.message}
                        <label>{"Username"}</label>
                        <input
                            name={"username"}
                            ref={register({
                                validate: value =>
                                    value !== "admin" || "Nice try!",
                            })}
                        />
                        {errors.username && errors.username.message}
                        <label>{"Password"}</label>
                        <input
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

                        <label>{"Validation Password"}</label>
                        <input
                            name={"val-password"}
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
                            className={"buttonSign"}
                            type={"button"}
                            onClick={randomizedHex}
                            style={{backgroundColor: `${hex}`}}>
                            {"Pick a Color !"}
                        </button>

                        <button className={"buttonSign"} type={"submit"}>
                            {"Go !"}
                        </button>
                    </form>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h1>{"Connexion"}</h1>
                        <h2>{"Happy to see you again !"}</h2>
                        <div>
                            <i
                                id={"pictureConnexion"}
                                className={"fas fa-user-alt"}
                            />
                        </div>

                        <label>{"Email / Username"}</label>
                        <input
                            name={"email / username"}
                            ref={register({
                                required: "Required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message: "invalid email address",
                                },
                            })}
                        />
                        {errors.email && errors.email.message}
                        {errors.username && errors.email.massage}
                        <label>{"Password"}</label>
                        <input
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

                        <button className={"buttonSign"} type={"submit"}>
                            {"Go !"}
                        </button>
                    </form>
                </Modal>
            </div>
            <div className={"rules"}>
                <h2>{"Rules of the game"}</h2>
                <p>{"Créé ton profil et choisis une couleur."}</p>
                <p>
                    {
                        "Achète des arbres pour te faire un max de feuilles! Achètes des arbres avec tes nouvelles feuilles. Tu en auras des gratuits, des payants et d'autres vérouillés par d'autres joueurs."
                    }
                </p>
                <p>
                    {
                        "Mais attention! Toutes les 15' tu recevras une quantité de feuilles égale au total de chacun de tes arbres et toutes les heures, tu perdras la moitié de tes feuilles!"
                    }
                </p>
                <p>
                    {
                        "N'hésites pas à consulter le classement pour voir la progression des autres joueurs... ainsi que le Gamelog qui te permettras de consulter toutes les actions du jeu."
                    }
                </p>
            </div>
        </div>
    );
};

export default SignInUp;
