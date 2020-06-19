import React, {useEffect, useState} from "react";
import {Marker, Popup} from "react-leaflet";
import axios from "axios";
import L from "leaflet"; // Necessary to use custom icons because not included in react-leaflet
import MarkerPopup from "../marker-popup/marker-popup";

const TreeMarker = () => {
    const [trees, setTrees] = useState({});
    useEffect(() => {
        axios
            .get("/api/tree/")
            .then(function (response) {
                // handle success
                setTrees(response.data);

                // console.log(response.data);
            })
            .catch(function (error) {
                // handle error
                // console.log(error);
            });
    }, []);

    let treeMarkers = [];
    if (Array.isArray(trees)) {
        treeMarkers = trees.slice(0, 100).map((tree) => {
            const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='1000' height='1000'><path d='M2,111 h300 l-242.7,176.3 92.7,-285.3 92.7,285.3 z' fill='${tree.color}'/></svg>`;
            let iconUrl = encodeURI("data:image/svg+xml," + svg).replace(
                "#",
                "%23",
            );

            const icon = L.icon({
                iconUrl: iconUrl,
                // shadowUrl: 'leaf-shadow.png',
                iconSize: [80, 80], // size of the icon
                // shadowSize:   [50, 64], // size of the shadow
                iconAnchor: [40, 40], // point of the icon which will correspond to marker's location
                // shadowAnchor: [4, 62],  // the same for the shadow
                popupAnchor: [-35, -40], // point from which the popup should open relative to the iconAnchor
            });

            return (
                <Marker
                    icon={icon}
                    position={[
                        tree.location.coordinates[0],
                        tree.location.coordinates[1],
                    ]}
                    key={tree._id}>
                    <MarkerPopup tree={tree} />
                </Marker>
            );
        });
    }

    return treeMarkers;
};
export default TreeMarker;
