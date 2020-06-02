import React from "react";
import {Map, TileLayer} from "react-leaflet";

const MyMap = () => {
    return (
        <Map center={[50.6246191, 5.5290555]} zoom={12}>
            <TileLayer
                url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                attribution={
                    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                }
            />
        </Map>
    );
};

export default MyMap;
