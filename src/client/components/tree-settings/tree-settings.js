import React, {useState} from "react";
import Modal from "react-modal";
import PerfectScrollbar from "react-perfect-scrollbar";

import "./tree-settings.scss";

Modal.setAppElement("#app");
const TreeSettings = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalTreeIsOpen, setModalTreeIsOpen] = useState(false);
    return (
        <div className={"tree"}>
            <button
                type={"button"}
                className={"buttonTree"}
                onClick={() => setModalIsOpen(true)}>
                <i className={"fas fa-tree"} />
            </button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                style={{
                    overlay: {
                        background: "none",
                    },
                }}
                id={"buyTree"}>
                <div className={"TreeSettings"}>
                    <div className={"TreeFree"}>
                        <i className={"fas fa-tree"} />
                        <h3>{"145"}</h3>
                        <button
                            type={"button"}
                            onClick={() => setModalTreeIsOpen(true)}>
                            {"BUY"}
                        </button>
                        <Modal
                            isOpen={modalTreeIsOpen}
                            onRequestClose={() => setModalTreeIsOpen(false)}
                            style={{
                                overlay: {
                                    background: "none",
                                },
                            }}
                            id={"buyTreeFree"}>
                            <div>
                                <div className={"buyTreeHeader"}>
                                    <i className={"fas fa-tree"} />
                                    <h3>{"Name of the tree"}</h3>
                                    <h4>{"Name of the buyer"}</h4>
                                    <a href={"src"}>
                                        {"Link of the informations tree"}
                                    </a>
                                </div>
                                <div className={"buyTreeUser"}>
                                    <PerfectScrollbar>
                                        <i className={"fas fa-user-alt"}>
                                            <h3>{"User name"}</h3>
                                        </i>
                                        <i className={"fas fa-user-alt"}>
                                            <h3>{"User name"}</h3>
                                        </i>
                                        <i className={"fas fa-user-alt"}>
                                            <h3>{"User name"}</h3>
                                        </i>
                                    </PerfectScrollbar>
                                </div>
                            </div>
                        </Modal>
                    </div>
                    <div className={"TreeClosed"}>
                        <i className={"fas fa-tree"} />
                        <h3>{"60"}</h3>
                        <button
                            type={"button"}
                            onClick={() => setModalTreeIsOpen(true)}>
                            {"BUY"}
                        </button>
                    </div>
                    <div className={"TreeLocked"}>
                        <i className={"fas fa-tree"} />
                        <h3>{"10"}</h3>
                        <button
                            type={"button"}
                            onClick={() => setModalTreeIsOpen(true)}>
                            {"BUY"}
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default TreeSettings;
