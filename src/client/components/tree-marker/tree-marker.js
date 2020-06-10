import React, {useEffect, useState} from "react";
import L,{ Marker, Popup} from "react-leaflet";

import MarkerClusterGroup from "react-leaflet-markercluster";
import axios from "axios";


const TreeMarker = () => {
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


    return treeMarkers;
};

export default TreeMarker;
