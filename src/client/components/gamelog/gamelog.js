import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import GamePage from "../game-page/game-page";
import axios from "axios";
import "./gamelog.scss";

const Gamelog = () => {
    const history = useHistory();

    const routeChange = () => {
        const path = `/game-page`;
        history.push(path);
    };

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const [logs, setLogs] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get("/api/log/", {
                    headers: {
                        Authorization: `Bearer ${currentUser.token}`,
                    },
                });
                // console.log(response.data);
                setLogs(response.data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

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
                                <th>{"Date"}</th>
                                <th>{"Action"}</th>
                                <th>{"Joueur"}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs &&
                                logs.map(log => (
                                    <tr key={log._id}>
                                        <td>
                                            {new Date(
                                                log.createdAt,
                                            ).toLocaleDateString("fr-BE", {
                                                hour: "numeric",
                                                minute: "numeric",
                                                second: "numeric",
                                            })}
                                        </td>
                                        <td>{log.action}</td>
                                        <td>
                                            {log.createdBy.name
                                                .charAt(0)
                                                .toUpperCase() +
                                                log.createdBy.name.slice(1)}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Gamelog;
