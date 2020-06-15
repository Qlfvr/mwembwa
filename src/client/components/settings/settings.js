import React from "react";
import "./settings.scss";

const Settings = () => (
    <div className={"settings"}>
        <h1>{"Settings"}</h1>
        <i className={"fas fa-user-circle"} />
        <div className={"info"}>
            <p>
                <i className={"fas fa-tree"} /> {"12 Trees"}
            </p>
            <p>
                <i className={"fas fa-leaf"} /> {"300 Leafs"}
            </p>
        </div>
        <form>
            <h2>{"Username"}</h2>
            <input placeholder={"Bg pro react 4000"} />
            <h2>{"Password"}</h2>
            <input />
            <button type={"submit"}>{"Save changes"}</button>
        </form>
    </div>
);
export default Settings;
