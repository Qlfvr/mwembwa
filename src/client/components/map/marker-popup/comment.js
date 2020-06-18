import React from "react";
import {useHistory} from "react-router-dom";
import MarkerPopup from "./marker-popup";
import "./comment.scss";

const Comment = () => {
    const history = useHistory();

    const routeChange = () => {
        const path = `/market-popup`;
        history.push(path);
    };

    return (
        <>
            <MarkerPopup />
            <div className={"formComment"} onClick={routeChange}>
                <div className={"comment"}>
                    <h1>{"Comments"}</h1>
                    <table>
                        <thead>
                            <input
                                type={"text"}
                                placeholder={"Write a comment"}
                            />
                            <div className={"iconComment"}>
                                <i
                                    id={"iconHead"}
                                    className={"fas fa-user-alt avatar__icon"}
                                />
                                <i
                                    id={"iconHead"}
                                    className={"fas fa-plus-circle"}
                                />
                            </div>
                        </thead>
                        <tbody>
                            <div className={"line"} />
                            <tr>
                                <td>
                                    <i
                                        id={"iconTD"}
                                        className={
                                            "fas fa-user-alt avatar__icon"
                                        }
                                    />
                                </td>
                                <td>
                                    <p>{"Comment from another user"}</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <i
                                        id={"iconTD"}
                                        className={
                                            "fas fa-user-alt avatar__icon"
                                        }
                                    />
                                </td>
                                <td>
                                    <p>{"Comment from another user"}</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <i
                                        id={"iconTD"}
                                        className={
                                            "fas fa-user-alt avatar__icon"
                                        }
                                    />
                                </td>
                                <td>
                                    <p>{"Comment from another user"}</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Comment;
