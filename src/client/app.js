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

ReactDOM.render(
    <>
        <Map />
        <SignInUp />
    </>,
    document.querySelector("#app"),
);
