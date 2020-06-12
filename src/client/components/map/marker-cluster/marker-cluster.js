import React, {useEffect, useState} from "react";
import {Map, TileLayer, Popup} from "react-leaflet";

import MarkerClusterGroup from "react-leaflet-markercluster";

import TreeMarker from "../tree-marker/tree-marker";

const MarkerCluster = () => {
    return (
        <MarkerClusterGroup disableClusteringAtZoom={18}>
            <TreeMarker  />
        </MarkerClusterGroup>
    );
};

export default MarkerCluster;
