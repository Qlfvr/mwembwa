/* becodeorg/mwenbwa
 *
 * /src/client/app.js - Client entry point
 *
 * coded by leny@BeCode
 * started at 18/05/2020
 */

import * as React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Route} from "react-router-dom";
import GameMap from "./components/game-map/game-map";
import SignInUp from "./components/sign-in-up/sign-in-up";
import GamePage from "./components/game-page/game-page";
import Homepage from "./components/homepage/homepage";
import "./styles/main.scss";

ReactDOM.render(
    <>
        <GameMap />
        <BrowserRouter>
            <div className={"main-route-place"}>
                <Route exact path={"/"} component={Homepage} />
                <Route exact path={"/sign-in-up"} component={SignInUp} />
                <Route exact path={"/game-page"} component={GamePage} />
            </div>
        </BrowserRouter>
    </>,
    document.querySelector("#app"),
);
