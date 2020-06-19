import React from "react";
import {Popup} from "react-leaflet";
import axios from "axios";

const MarkerPopup = (props) => {
    function handleClick() {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));

        axios
            .post(
                `/api/tree/buy-one/${props.tree._id}`,
                {},
                {
                    headers: {Authorization: `Bearer ${currentUser.token}`},
                },
            )
            .then(function (response) {
                // handle success
                console.log(response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }

    return (
        <Popup>
            <button className={"btn"} type={"submit"} onClick={handleClick}>
                {"buy tree !"}
            </button>
            <div>Id : {props.tree._id}</div>
            <div>latitude : {props.tree.location.coordinates[0]}</div>
            <div>longitude : {props.tree.location.coordinates[1]}</div>
        </Popup>
    );
};

export default MarkerPopup;
