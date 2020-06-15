import React from "react";
import {Link} from "react-router-dom";
import "./game-page.scss";
//hello
<
const GamePage = () => (
    <div className={"gamePage"}>
        <div className={"assets"}>
            <button id={"buttonHP"} type={"button"}>
                <i className={"fas fa-tree"} />

                <h2>{"40"}</h2>
            </button>

            <button id={"buttonHP"} type={"button"}>
                <i className={"fab fa-pagelines"} />

                <h2>{"35"}</h2>
            </button>
        </div>
        <div className={"profile"}>
            <button id={"buttonSettings"} type={"button"}>
                <i className={"fas fa-user-cog"} />
            </button>

            <div id={"profilePicture"} />
            <h1>{"User Name"}</h1>
        </div>

        <div className={"actions"}>
            <Link to={"/leaderboard"}>
                {" "}
                <button id={"buttonHP"}>
                    <i className={"fas fa-user-shield"} />
                </button>
            </Link>
            <Link to={"/gamelog"}>
                <button id={"buttonHP"}>
                    <i className={"fas fa-history"} />
                </button>
            </Link>
        </div>
    </div>
);

export default GamePage;
