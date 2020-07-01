import React from "react";
import MarkerClusterGroup from "react-leaflet-markercluster";
import TreeMarker from "../tree-marker/tree-marker";

const MarkerCluster = ({trees, wrapperSetTrees}) => (
    <MarkerClusterGroup disableClusteringAtZoom={18}>
        <TreeMarker trees={trees && trees} wrapperSetTrees={wrapperSetTrees} />
    </MarkerClusterGroup>
);

export default MarkerCluster;
