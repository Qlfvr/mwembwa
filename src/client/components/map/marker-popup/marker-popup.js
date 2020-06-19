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
            Id : {props.tree._id}
            latitude : {props.tree.location.lat}
            longitude : {props.tree.location.lon}
            <button className={"btn"} type={"submit"} onClick={handleClick}>
                {"buy tree !"}
            </button>
        </Popup>
    );
};

export default MarkerPopup;
