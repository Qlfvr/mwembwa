import React, {useEffect, useState} from "react";
import {Map, TileLayer, Marker, Popup} from "react-leaflet";

import axios from "axios";

const MyMap = () => {
    const [trees, setTrees] = useState({});

    useEffect(() => {
        axios
            .get("/api/tree/")
            .then(function (response) {
                // handle success
                setTrees(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }, []);

    console.log(trees);

    let treeMarkers = [];
    if (Array.isArray(trees)) {
        treeMarkers = trees.map((tree) => {
            return (
                <Marker position={[tree.location.lat, tree.location.lon]}>
                    <Popup>
                       latitude : {tree.location.lat}
                       longitude : {tree.location.lon}
                    </Popup>
                </Marker>
            );
        });
    }

    console.log(treeMarkers);

    return (
        <Map center={[50.6246191, 5.5290555]} zoom={12}>
            <TileLayer
                url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                attribution={
                    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                }
            />
            {treeMarkers}
        </Map>
    );
};

export default MyMap;
