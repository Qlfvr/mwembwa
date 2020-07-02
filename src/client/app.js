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
import "./styles/main.scss";

// function receiveLeaves(interval) {
//     axios
//         .post(
//             `/api/tree/payroll/${interval}`,
//             {},
//             {
//                 headers: {
//                     Authorization: `Bearer ${currentUser.token}`,
//                 },
//             },
//         )
//         .then(response => {
//             // handle success

//             console.log(response);
//         })
//         // eslint-disable-next-line no-unused-vars
//         .catch(error => {
//             // handle error

//             console.log(error);
//         });
// }
// function looseLeaves() {
//     axios
//         .post(
//             `/api/tree/leaves-loss/${currentUser.userId}`,
//             {},
//             {
//                 headers: {
//                     Authorization: `Bearer ${currentUser.token}`,
//                 },
//             },
//         )
//         .then(response => {
//             // handle success

//             console.log(response);
//         })
//         // eslint-disable-next-line no-unused-vars
//         .catch(error => {
//             // handle error
//             console.log(error);
//         });
// }

// const payInterval = 900000;

// setInterval(() => {
//     receiveLeaves(payInterval);
// }, payInterval); //900000
// setInterval(looseLeaves, 9000);

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
        </BrowserRouter>
    </>,
    document.querySelector("#app"),
);
