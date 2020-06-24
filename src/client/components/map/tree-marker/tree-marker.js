import React from "react";
import {Marker} from "react-leaflet";
import L from "leaflet"; // Necessary to use custom icons because not included in react-leaflet
import MarkerPopup from "../marker-popup/marker-popup";

const TreeMarker = ({trees}) => {
    let treeMarkers = [];
    // eslint-disable-next-line no-undefined
    if (trees !== undefined) {
        treeMarkers = trees.map(tree => {
            const svg = `<svg width="42" height="63" viewBox="0 0 42 63" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.84976 20.373L20.2222 32.6175L36.6317 20.4806C39.3142 18.4966 39.3379 14.4919 36.6791 12.4762L26.4926 4.75367C22.8135 1.96452 17.7033 2.05653 14.127 4.9763L4.8028 12.5889C2.33319 14.6052 2.35601 18.3867 4.84976 20.373Z" fill="#050000"/>
            <path d="M20.2222 60V32.6175M20.2222 32.6175L4.84976 20.373C2.35601 18.3867 2.33319 14.6052 4.8028 12.5889L14.127 4.9763C17.7033 2.05653 22.8135 1.96452 26.4926 4.75367L36.6791 12.4762C39.3379 14.4919 39.3142 18.4966 36.6317 20.4806L20.2222 32.6175Z" stroke="black" stroke-width="5" stroke-linecap="round"/>
            </svg>
            `;
            const iconUrl = encodeURI(`data:image/svg+xml,${svg}`).replace(
                "#",
                "%23",
            );

            const icon = L.icon({
                iconUrl,
                //shadowUrl: 'tree.png',
                iconSize: [60, 60], // size of the icon
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
