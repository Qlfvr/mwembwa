import * as React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Route} from "react-router-dom";
import GameMap from "./components/map/game-map/game-map";
import SignInUp from "./components/sign-in-up/sign-in-up";
import GamePage from "./components/game-page/game-page";
import Homepage from "./components/homepage/homepage";
import Leaderboard from "./components/leaderboard/leaderboard";
import Gamelog from "./components/gamelog/gamelog";
import Settings from "./components/settings/settings";
import MarkerPopup from "./components/map/marker-popup/marker-popup";
import "./styles/main.scss";

ReactDOM.render(
    <>
        <GameMap />
        <BrowserRouter>
            <Route exact path={"/"} component={Homepage} />
            <Route exact path={"/sign-in-up"} component={SignInUp} />
            <Route exact path={"/game-page"} component={GamePage} />
            <Route exact path={"/leaderboard"} component={Leaderboard} />
            <Route exact path={"/gamelog"} component={Gamelog} />
            <Route exact path={"/settings"} component={Settings} />
            <Route exact path={"/marker-popup"} component={MarkerPopup} />
        </BrowserRouter>
    </>,
    document.querySelector("#app"),
);
