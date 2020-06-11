import React from "react";
import "./game-page.scss";

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
            <button id={"buttonHP"}>
                <i className={"fas fa-user-shield"} />
            </button>
            <button id={"buttonHP"}>
                <i className={"fas fa-history"} />
            </button>
        </div>
    </div>
);

export default GamePage;
