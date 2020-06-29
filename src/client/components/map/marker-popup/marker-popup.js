import React, {useState} from "react";
import {Popup} from "react-leaflet";
import "./marker-popup.scss";
import axios from "axios";

const MarkerPopup = ({tree}) => {
    const [stateOnglet, setStateOnglet] = useState(1);
    const displaySectionInfos = () => {
        setStateOnglet(1);
    };
    const displaySectionComments = () => {
        setStateOnglet(2);
    };

    const [commentToWrite, setCommentToWrite] = useState("");
    const handleChangeCommentToWrite = e => {
        setCommentToWrite(e.target.value);
    };

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const handleClickSubmitComment = () => {
        // console.log(commentToWrite);
        if (commentToWrite) {
            axios
                .post(
                    `/api/tree/comment/${tree._id}`,
                    {content: commentToWrite},
                    {
                        headers: {Authorization: `Bearer ${currentUser.token}`},
                    },
                )
                // eslint-disable-next-line no-unused-vars
                .then(response => {
                    // handle success
                    //  console.log(response);
                })
                // eslint-disable-next-line no-unused-vars
                .catch(error => {
                    // handle error
                    //console.log(error);
                });
        }
    };

    function handleClick() {
        axios
            .post(
                `/api/tree/buy-one/${tree._id}`,
                {},
                {
                    headers: {Authorization: `Bearer ${currentUser.token}`},
                },
            )
            // eslint-disable-next-line no-unused-vars
            .then(response => {
                // handle success
                //  console.log(response);
            })
            // eslint-disable-next-line no-unused-vars
            .catch(error => {
                // handle error
                //console.log(error);
            });
    }

    return (
        <>
            <Popup>
                <div className={"popupTree"}>
                    <div className={"ongletB"}>
                        <div
                            onClick={displaySectionInfos}
                            className={`onglet ${
                                stateOnglet === 1 ? "active" : ""
                            }`}>
                            {"Infos"}
                        </div>
                        <div
                            onClick={displaySectionComments}
                            className={`onglet ${
                                stateOnglet === 2 ? "active" : ""
                            }`}>
                            {"Comments"}
                        </div>
                    </div>
                    <div className={"lineTree"} />

                    {stateOnglet === 1 ? (
                        <div className={"displaySectionInfos"}>
                            <div className={"headPopupTree"}>
                                <div className={"iconTree"}>
                                    <svg
                                        width={"49"}
                                        height={"63"}
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
                                                colorInterpolationFilters={
                                                    "sRGB"
                                                }>
                                                <feFlood
                                                    floodOpacity={"0"}
                                                    result={
                                                        "BackgroundImageFix"
                                                    }
                                                />
                                                <feColorMatrix
                                                    in={"SourceAlpha"}
                                                    type={"matrix"}
                                                    values={
                                                        "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                    }
                                                />
                                                <feOffset dx={"5"} dy={"5"} />
                                                <feGaussianBlur
                                                    stdDeviation={"2.5"}
                                                />
                                                <feColorMatrix
                                                    type={"matrix"}
                                                    values={
                                                        "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                                                    }
                                                />
                                                <feBlend
                                                    mode={"normal"}
                                                    in2={"BackgroundImageFix"}
                                                    result={
                                                        "effect1_dropShadow"
                                                    }
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
                                </div>
                                <div className={"middleHeader"}>
                                    <h2>{tree.name && tree.name}</h2>
                                    <h3>
                                        {tree.owner[0] && tree.owner[0].name}
                                    </h3>
                                    <a
                                        target={"_blank"}
                                        rel={"noreferrer"}
                                        href={`https://fr.wikipedia.org/wiki/${
                                            tree.name != null ? tree.name : ""
                                        }`}>
                                        {"Wikipedia"}
                                    </a>
                                </div>
                                <div className={"iconPaper"}>
                                    <button>
                                        <svg
                                            width={"11"}
                                            height={"54"}
                                            viewBox={"0 0 31 74"}
                                            fill={"none"}
                                            xmlns={
                                                "http://www.w3.org/2000/svg"
                                            }>
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
                                                    filterUnits={
                                                        "userSpaceOnUse"
                                                    }
                                                    colorInterpolationFilters={
                                                        "sRGB"
                                                    }>
                                                    <feFlood
                                                        floodOpacity={"0"}
                                                        result={
                                                            "BackgroundImageFix"
                                                        }
                                                    />
                                                    <feColorMatrix
                                                        in={"SourceAlpha"}
                                                        type={"matrix"}
                                                        values={
                                                            "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                        }
                                                    />
                                                    <feOffset
                                                        dx={"5"}
                                                        dy={"5"}
                                                    />
                                                    <feGaussianBlur
                                                        stdDeviation={"2.5"}
                                                    />
                                                    <feColorMatrix
                                                        type={"matrix"}
                                                        values={
                                                            "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                                                        }
                                                    />
                                                    <feBlend
                                                        mode={"normal"}
                                                        in2={
                                                            "BackgroundImageFix"
                                                        }
                                                        result={
                                                            "effect1_dropShadow"
                                                        }
                                                    />
                                                    <feBlend
                                                        mode={"normal"}
                                                        in={"SourceGraphic"}
                                                        in2={
                                                            "effect1_dropShadow"
                                                        }
                                                        result={"shape"}
                                                    />
                                                </filter>
                                            </defs>
                                        </svg>
                                        <p>{"15"}</p>
                                    </button>
                                </div>
                            </div>
                            <div className={"BLbutton"}>
                                <button
                                    className={"btnBL"}
                                    type={"submit"}
                                    onClick={handleClick}>
                                    {"Buy!"}
                                </button>
                                <button
                                    className={"btnBL"}
                                    type={"submit"}
                                    onClick={handleClick}>
                                    {"Lock!"}
                                </button>
                            </div>
                            <div className={"lineTree"} />
                            <div className={"previousBuy"}>
                                <div className={"buyerTreeUser"}>
                                    <i className={"fas fa-user-alt"} />
                                    <h3>
                                        {tree.owner[0] && tree.owner[0].name}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className={"displaySectionComments"}>
                            <h1>{"Comments"}</h1>
                            <div className={"commentHead"}>
                                <textarea
                                    type={"text"}
                                    placeholder={"Write a comment"}
                                    value={commentToWrite}
                                    onChange={handleChangeCommentToWrite}
                                />
                                <i
                                    className={"fas fa-plus-circle"}
                                    onClick={handleClickSubmitComment}
                                />
                            </div>
                            <div className={"lineTree"} />
                            <div className={"commentBody"}>
                                {tree.comments.length &&
                                    tree.comments.map(comment => (
                                        <div key={comment._id}>
                                            <div className={"commentContainer"}>
                                                <div className={"commentUser"}>
                                                    <i
                                                        className={
                                                            "fas fa-user-alt avatar__icon"
                                                        }
                                                    />
                                                    <div>
                                                        {
                                                            comment.ownerComment
                                                                .name
                                                        }
                                                    </div>
                                                </div>
                                                <div
                                                    className={
                                                        "commentContent"
                                                    }>
                                                    <p>{comment.content}</p>
                                                    <div
                                                        className={
                                                            "commentDate"
                                                        }>
                                                        {new Date(
                                                            comment.createdAt,
                                                        ).toLocaleDateString(
                                                            "fr-BE",
                                                            {
                                                                hour: "numeric",
                                                                minute:
                                                                    "numeric",
                                                                second:
                                                                    "numeric",
                                                            },
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    )}
                </div>
            </Popup>
        </>
    );
};

export default MarkerPopup;
