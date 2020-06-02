import React from "react";
import {useForm} from "react-hook-form";
import "./sign-in-up.scss";

const SignInUp = () => {
    const {handleSubmit, register, errors} = useForm();
    const onSubmit = (values) => console.log(values);

    return (
        <div id="form-container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>{"Inscription"}</h1>
                <input
                    name="email"
                    ref={register({
                        required: "Required",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: "invalid email address",
                        },
                    })}
                />
                {errors.email && errors.email.message}

                <input
                    name="username"
                    ref={register({
                        validate: (value) => value !== "admin" || "Nice try!",
                    })}
                />
                {errors.username && errors.username.message}
                <input
                    name="password"
                    ref={register({
                        required: "Required",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: "invalid password",
                        },
                    })}
                />

                {errors.password && errors.password.message}

                <button type="submit">{"Submit"}</button>
            </form>

            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>{"Connexion"}</h1>
                <input
                    name="email / username"
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

                <input
                    name="password"
                    ref={register({
                        required: "Required",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: "invalid password",
                        },
                    })}
                />

                {errors.password && errors.password.message}

                <button type="submit">{"Submit"}</button>
            </form>
        </div>
    );
};

export default SignInUp;
