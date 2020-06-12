import React from "react";
import {Popup} from "react-leaflet";

const MarkerPopup = (props) => {
    return (
        <Popup>
            Id : {props.tree._id}
            latitude : {props.tree.location.lat}
            longitude : {props.tree.location.lon}
        </Popup>
    );
};

export default MarkerPopup;
