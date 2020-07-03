import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import GamePage from "../game-page/game-page";
import axios from "axios";
import "./leaderboard.scss";

const LeaderBoard = () => {
    const history = useHistory();

    const routeChange = () => {
        const path = `/game-page`;
        history.push(path);
    };

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const [leaderboards, setLeaderboards] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get("/api/auth/leaderboard", {
                    headers: {
                        Authorization: `Bearer ${currentUser.token}`,
                    },
                });
                setLeaderboards(response.data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    return (
        <>
            <GamePage />
            <div className={"container"} onClick={routeChange}>
                <div className={"leaderboard"}>
                    <h1>
                        {"Classement"}
                        <i
                            className={"fas fa-times closePage"}
                            onClick={routeChange}
                        />
                    </h1>
                    <table>
                        <thead>
                            <tr>
                                <th>{"#"}</th>
                                <th>{"Nom"}</th>
                                <th>{"Arbres"}</th>
                                <th>{"Feuilles"}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaderboards &&
                                leaderboards.map((leaderboard, index) => (
                                    <tr key={leaderboard._id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            {leaderboard.name &&
                                                leaderboard.name
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    leaderboard.name.slice(1)}
                                        </td>
                                        <td>
                                            {leaderboard.totalTrees &&
                                                leaderboard.totalTrees}
                                        </td>
                                        <td>
                                            {leaderboard.leaves &&
                                                leaderboard.leaves.toFixed(2) |
                                                    0}
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

export default LeaderBoard;
