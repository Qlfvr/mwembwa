import React from "react";
import "./account-settings.scss";

const AccountSettings = () => (
    <div className={"account-settings"}>
        <h1>{"Settings"}</h1>
        <i className={"user fas fa-user-circle"} />
        <form>
            <h2>{"Pseudo"}</h2>
            <input name={"username"} placeholder={"Bg pro React du 4000"} />
            <h2>{"Change password"}</h2>
            <input name={"password"} />
            <button type={"submit"}>{"Save changes"}</button>
        </form>
    </div>
);
export default AccountSettings;
