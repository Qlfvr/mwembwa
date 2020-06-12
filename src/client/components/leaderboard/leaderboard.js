import React from "react";
import {useHistory} from "react-router-dom";
import GamePage from "../game-page/game-page";
import "./leaderboard.scss";

const LeaderBoard = () => {
    const history = useHistory();

    const routeChange = () => {
        let path = `/game-page`;
        history.push(path);
    };

    return (
        <>
            <GamePage />
            <div className={"container"}>
                <div className={"leaderboard"}>
                    <h1>
                        {"Leaderboard"}
                        <i
                            className={"fas fa-times closePage"}
                            onClick={routeChange}
                        />
                    </h1>
                    <table>
                        <thead>
                            <tr>
                                <th>{"#"}</th>
                                <th>{"User"}</th>
                                <th>{"three"}</th>
                                <th>{"Leafs"}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{"1"}</td>
                                <td>{"User Name"}</td>
                                <td>{"120"}</td>
                                <td>{"12k"}</td>
                            </tr>
                            <tr>
                                <td>{"1"}</td>
                                <td>{"User Name"}</td>
                                <td>{"120"}</td>
                                <td>{"12k"}</td>
                            </tr>
                            <tr>
                                <td>{"1"}</td>
                                <td>{"User Name"}</td>
                                <td>{"120"}</td>
                                <td>{"12k"}</td>
                            </tr>
                            <tr>
                                <td>{"1"}</td>
                                <td>{"User Name"}</td>
                                <td>{"120"}</td>
                                <td>{"12k"}</td>
                            </tr>
                            <tr>
                                <td>{"1"}</td>
                                <td>{"User Name"}</td>
                                <td>{"120"}</td>
                                <td>{"12k"}</td>
                            </tr>
                            <tr>
                                <td>{"1"}</td>
                                <td>{"User Name"}</td>
                                <td>{"120"}</td>
                                <td>{"12k"}</td>
                            </tr>
                            <tr>
                                <td>{"1"}</td>
                                <td>{"User Name"}</td>
                                <td>{"120"}</td>
                                <td>{"12k"}</td>
                            </tr>
                            <tr>
                                <td>{"1"}</td>
                                <td>{"User Name"}</td>
                                <td>{"120"}</td>
                                <td>{"12k"}</td>
                            </tr>
                            <tr>
                                <td>{"1"}</td>
                                <td>{"User Name"}</td>
                                <td>{"120"}</td>
                                <td>{"12k"}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default LeaderBoard;
