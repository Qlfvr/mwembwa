/* becodeorg/mwenbwa
 *
 * /src/client/app.js - Client entry point
 *
 * coded by leny@BeCode
 * started at 18/05/2020
 */

import * as React from "react";
import ReactDOM from "react-dom";
import Map from "./components/map";
import SignInUp from "./components/sign-in-up/sign-in-up";
import "./styles/main.scss";
import Leaderboard from "./components/leaderboard/leaderboard";
import Gamelog from "./components/gamelog/gamelog";
import AccountSettings from "./components/account-settings/account-settings";
//import axios from "axios";

ReactDOM.render(
    <>
        <Map />
        <SignInUp />
        <Leaderboard />
        <Gamelog />
        <AccountSettings />
    </>,
    document.querySelector("#app"),
);
