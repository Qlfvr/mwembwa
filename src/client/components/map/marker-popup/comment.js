import React from "react";
import {useHistory} from "react-router-dom";
import "./comment.scss";
import GamePage from "../../game-page/game-page";

const Comment = () => {
    const history = useHistory();

    const routeChange = () => {
        const path = `/game-page`;
        history.push(path);
    };

    return (
        <>
            <GamePage />
            <div className={"container"} onClick={routeChange}>
                <div className={"comment"}>
                    <h1>{"Comments"}</h1>
                    <div className={"commentHead"} />
                    <input type={"text"} placeholder={"Write a comment"} />
                    <div className={"iconComment"}>
                        <i
                            id={"iconHead"}
                            className={"fas fa-user-alt avatar__icon"}
                        />
                        <i id={"iconHead"} className={"fas fa-plus-circle"} />
                    </div>

                    <div className={"commentBody"} />
                    <div className={"line"} />
                    <div className={"commentUser"}>
                        {" "}
                        <i
                            id={"iconB"}
                            className={"fas fa-user-alt avatar__icon"}
                        />
                        <p>{"Comment from another user"}</p>
                    </div>
                    <div className={"commentUser"}>
                        {" "}
                        <i
                            id={"iconB"}
                            className={"fas fa-user-alt avatar__icon"}
                        />
                        <p>{"Comment from another user"}</p>
                    </div>
                    <div className={"commentUser"}>
                        {" "}
                        <i
                            id={"iconB"}
                            className={"fas fa-user-alt avatar__icon"}
                        />
                        <p>{"Comment from another user"}</p>
                    </div>
                    <div className={"commentUser"}>
                        {" "}
                        <i
                            id={"iconB"}
                            className={"fas fa-user-alt avatar__icon"}
                        />
                        <p>{"Comment from another user"}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Comment;
