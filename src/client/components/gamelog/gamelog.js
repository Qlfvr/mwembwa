import React from "react";
import {useHistory} from "react-router-dom";
import GamePage from "../game-page/game-page";
import "./gamelog.scss";

const Gamelog = () => {
    const history = useHistory();

    const routeChange = () => {
        const path = `/game-page`;
        history.push(path);
    };

    return (
        <>
            <GamePage />
            <div className={"container"} onClick={routeChange}>
                <div className={"gamelog"}>
                    <h1>
                        {"Gamelog"}
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
                                <th>{"Action"}</th>
                                <th>{""}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{"1"}</td>
                                <td>{"User Name"}</td>
                                <td>{"Locked"}</td>
                                <td>{"tree"}</td>
                            </tr>
                            <tr>
                                <td>{"1"}</td>
                                <td>{"User Name"}</td>
                                <td>{"Buy"}</td>
                                <td>{"12k"}</td>
                            </tr>
                            <tr>
                                <td>{"1"}</td>
                                <td>{"User Name"}</td>
                                <td>{"Locked"}</td>
                                <td>{"tree"}</td>
                            </tr>
                            <tr>
                                <td>{"1"}</td>
                                <td>{"User Name"}</td>
                                <td>{"Buy"}</td>
                                <td>{"12k"}</td>
                            </tr>
                            <tr>
                                <td>{"1"}</td>
                                <td>{"User Name"}</td>
                                <td>{"Locked"}</td>
                                <td>{"tree"}</td>
                            </tr>
                            <tr>
                                <td>{"1"}</td>
                                <td>{"User Name"}</td>
                                <td>{"Buy"}</td>
                                <td>{"12k"}</td>
                            </tr>
                            <tr>
                                <td>{"1"}</td>
                                <td>{"User Name"}</td>
                                <td>{"Locked"}</td>
                                <td>{"tree"}</td>
                            </tr>
                            <tr>
                                <td>{"1"}</td>
                                <td>{"User Name"}</td>
                                <td>{"Buy"}</td>
                                <td>{"12k"}</td>
                            </tr>
                            <tr>
                                <td>{"1"}</td>
                                <td>{"User Name"}</td>
                                <td>{"Locked"}</td>
                                <td>{"tree"}</td>
                            </tr>
                            <tr>
                                <td>{"1"}</td>
                                <td>{"User Name"}</td>
                                <td>{"Buy"}</td>
                                <td>{"12k"}</td>
                            </tr>
                            <tr>
                                <td>{"1"}</td>
                                <td>{"User Name"}</td>
                                <td>{"Locked"}</td>
                                <td>{"tree"}</td>
                            </tr>
                            <tr>
                                <td>{"1"}</td>
                                <td>{"User Name"}</td>
                                <td>{"Buy"}</td>
                                <td>{"12k"}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Gamelog;
