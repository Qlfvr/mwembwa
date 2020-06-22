import React from "react";
import MarkerClusterGroup from "react-leaflet-markercluster";
import TreeMarker from "../tree-marker/tree-marker";

const MarkerCluster = ({trees}) => (
    <MarkerClusterGroup disableClusteringAtZoom={18}>
        <TreeMarker trees={trees && trees} />
    </MarkerClusterGroup>
);

export default MarkerCluster;
