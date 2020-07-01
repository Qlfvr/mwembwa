import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import Gravatar from "react-gravatar";
import "./game-page.scss";

const GamePage = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const [userInfos, setUserInfos] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            (async () => {
                try {
                    const response = await axios.get("/api/auth/user-infos", {
                        headers: {
                            Authorization: `Bearer ${currentUser.token}`,
                        },
                    });
                    setUserInfos(response.data);
                    // eslint-disable-next-line no-unused-vars
                } catch (error) {
                    //    console.log(error);
                }
            })();
        }, 500);
    }, []);
    console.log(userInfos);

    return (
        <div className={"gamePage"}>
            <div className={"assets"}>
                <button id={"buttonL"} type={"button"}>
                    <svg
                        id={"iconL"}
                        width={"59"}
                        height={"73"}
                        viewBox={"0 0 59 73"}
                        fill={"none"}
                        xmlns={"http://www.w3.org/2000/svg"}>
                        <g filter={"url(#filter0_d)"}>
                            <path
                                d={
                                    "M2.81628 18.053L14.7292 27.5893C16.5035 29.0096 19.0126 29.0546 20.8367 27.6987L33.6679 18.161C36.3376 16.1766 36.3612 12.187 33.7152 10.171L24.0309 2.79254C20.3442 -0.0164088 15.2105 0.0761316 11.6273 3.01612L2.76936 10.2842C0.312403 12.3002 0.335145 16.0668 2.81628 18.053Z"
                                }
                                fill={"#77CAA0"}
                            />
                            <path
                                d={
                                    "M24.2222 60V32.6175L4 16.5101L18.127 4.9763C21.7033 2.05653 26.8135 1.96452 30.4926 4.75367L46 16.5101"
                                }
                                stroke={"black"}
                                strokeWidth={"5"}
                                strokeLinecap={"round"}
                            />
                        </g>
                        <defs>
                            <filter
                                id={"filter0_d"}
                                x={"0.0175171"}
                                y={"0.222504"}
                                width={"58.4826"}
                                height={"72.2775"}
                                filterUnits={"userSpaceOnUse"}
                                colorInterpolationFilters={"sRGB"}>
                                <feFlood
                                    floodOpacity={"0"}
                                    result={"BackgroundImageFix"}
                                />
                                <feColorMatrix
                                    in={"SourceAlpha"}
                                    type={"matrix"}
                                    values={
                                        "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    }
                                />
                                <feOffset dx={"5"} dy={"5"} />
                                <feGaussianBlur stdDeviation={"2.5"} />
                                <feColorMatrix
                                    type={"matrix"}
                                    values={
                                        "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                                    }
                                />
                                <feBlend
                                    mode={"normal"}
                                    in2={"BackgroundImageFix"}
                                    result={"effect1_dropShadow"}
                                />
                                <feBlend
                                    mode={"normal"}
                                    in={"SourceGraphic"}
                                    in2={"effect1_dropShadow"}
                                    result={"shape"}
                                />
                            </filter>
                        </defs>
                    </svg>

                    <h2>{userInfos && userInfos.totalTrees | 0}</h2>
                </button>

                <button id={"buttonL"} type={"button"}>
                    <svg
                        id={"iconL"}
                        width={"31"}
                        height={"74"}
                        viewBox={"0 0 31 74"}
                        fill={"none"}
                        xmlns={"http://www.w3.org/2000/svg"}>
                        <g filter={"url(#filter0_d)"}>
                            <path
                                d={
                                    "M11.63 1.61342C-10.7674 26.8329 4.18349 37.3172 15 39.4286V2.91329C15 1.11965 12.8211 0.272314 11.63 1.61342Z"
                                }
                                fill={"#77CAA0"}
                            />
                            <path
                                d={
                                    "M18 61V44.4286C6.68065 42.219 -9.16645 30.84 18 3"
                                }
                                stroke={"black"}
                                strokeWidth={"5"}
                                strokeLinecap={"round"}
                            />
                        </g>
                        <defs>
                            <filter
                                id={"filter0_d"}
                                x={"0.495056"}
                                y={"0.5"}
                                width={"30.005"}
                                height={"73"}
                                filterUnits={"userSpaceOnUse"}
                                colorInterpolationFilters={"sRGB"}>
                                <feFlood
                                    floodOpacity={"0"}
                                    result={"BackgroundImageFix"}
                                />
                                <feColorMatrix
                                    in={"SourceAlpha"}
                                    type={"matrix"}
                                    values={
                                        "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    }
                                />
                                <feOffset dx={"5"} dy={"5"} />
                                <feGaussianBlur stdDeviation={"2.5"} />
                                <feColorMatrix
                                    type={"matrix"}
                                    values={
                                        "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                                    }
                                />
                                <feBlend
                                    mode={"normal"}
                                    in2={"BackgroundImageFix"}
                                    result={"effect1_dropShadow"}
                                />
                                <feBlend
                                    mode={"normal"}
                                    in={"SourceGraphic"}
                                    in2={"effect1_dropShadow"}
                                    result={"shape"}
                                />
                            </filter>
                        </defs>
                    </svg>

                    <h2>
                        {userInfos && userInfos.leaves.toFixed(2) | 0}
                        <span className={"tooltip"}>
                            {"Formule arbe X feuilles"}
                        </span>
                    </h2>
                </button>
            </div>
            <div className={"profile"}>
                <Link to={"/settings"}>
                    <button id={"buttonSettings"} type={"button"}>
                        <i id={"iconR"} className={"fas fa-user-cog"} />
                    </button>
                </Link>
                <div
                    className={"borderGravatar"}
                    style={{
                        border: `10px solid ${
                            userInfos ? userInfos.color : "#000000"
                        }`,
                    }}>
                    <Gravatar
                        id={"gravatar"}
                        email={currentUser && currentUser.email}
                        size={150}
                        rating={"pg"}
                    />
                </div>

                <h1>
                    {userInfos &&
                        userInfos.name.charAt(0).toUpperCase() +
                            userInfos.name.slice(1)}
                </h1>
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
};

export default GamePage;
