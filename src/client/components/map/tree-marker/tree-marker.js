import React from "react";
import {Marker} from "react-leaflet";
import L from "leaflet"; // Necessary to use custom icons because not included in react-leaflet
import MarkerPopup from "../marker-popup/marker-popup";

const TreeMarker = ({trees}) => {
    let treeMarkers = [];
    // eslint-disable-next-line no-undefined
    if (trees !== undefined) {
        treeMarkers = trees.map(tree => {
            const svg = `
            <svg width="59" height="73" viewBox="0 0 59 73" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d)">
            <path d="M24.2222 60V32.6175L4 16.5101L18.127 4.9763C21.7033 2.05653 26.8135 1.96452 30.4926 4.75367L46 16.5101" stroke="black" stroke-width="5" stroke-linecap="round"/>
            </g>
            <defs>
            <filter id="filter0_d" x="0.0175171" y="0.222504" width="58.4826" height="72.2775" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
            <feOffset dx="5" dy="5"/>
            <feGaussianBlur stdDeviation="2.5"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
            </filter>
            </defs>
            </svg>`;
            const iconUrl = encodeURI(`data:image/svg+xml,${svg}`).replace(
                "#",
                "%23",
            );

            const icon = L.icon({
                iconUrl,
                //shadowUrl: 'tree.png',
                iconSize: [40, 40], // size of the icon
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
