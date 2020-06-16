import React from "react";
import {Link} from "react-router-dom";
import "./game-page.scss";

const GamePage = () => (
    <div className={"gamePage"}>
        <div className={"assets"}>
            <button id={"buttonL"} type={"button"}>
                <i id={"iconL"} className={"fas fa-tree"} />

                <h2>{"40"}</h2>
            </button>

            <button id={"buttonL"} type={"button"}>
                <i id={"iconL"} className={"fab fa-pagelines"} />

                <h2>{"35"}</h2>
            </button>
        </div>
        <div className={"profile"}>
            <button id={"buttonSettings"} type={"button"}>
                <i id={"iconR"} className={"fas fa-user-cog"} />
            </button>

            <div id={"profilePicture"} />
            <h1>{"User Name"}</h1>
        </div>

        <div className={"actions"}>
            <Link to={"/leaderboard"}>
                {" "}
                <button id={"buttonF"}>
                    <i id={"iconF"} className={"fas fa-user-shield"} />
                </button>
            </Link>
            <Link to={"/gamelog"}>
                <button id={"buttonF"}>
                    <i id={"iconF"} className={"fas fa-history"} />
                </button>
            </Link>
        </div>
    </div>
);

export default GamePage;
