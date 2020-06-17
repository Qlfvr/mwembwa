import React from "react";
import {Popup} from "react-leaflet";

const MarkerPopup = (props) => {
    return (
        <Popup>
            <div>Id : {props.tree._id}</div>
            <div>latitude : {props.tree.location.coordinates[0]}</div>
            <div>longitude : {props.tree.location.coordinates[1]}</div>
        </Popup>
    );
};

export default MarkerPopup;
