import React, {useState, useEffect} from "react";
import {Map, TileLayer} from "react-leaflet";
import axios from "axios";
import MarkerCluster from "../marker-cluster/marker-cluster.js";

const GameMap = () => {
    let coordinateCenterMap = {lat: 50.62978, lng: 5.575254};

    const [loading, setLoading] = useState(true);
    const [trees, setTrees] = useState([]);

    const getTreesByCoordinateCenterMap = () => {
        axios
            .get("/api/tree/", {
                params: {
                    coordinateCenterMap,
                },
            })
            .then(response => {
                setTrees(response.data);
                setLoading(false);
            })
            // eslint-disable-next-line no-unused-vars
            .catch(error => {
                // console.log(error);
            });
    };

    const onMove = e => {
        coordinateCenterMap = e.target.getCenter();
        getTreesByCoordinateCenterMap(coordinateCenterMap);
    };

    useEffect(() => {
        getTreesByCoordinateCenterMap();
    }, []);

    const wrapperSetTrees = treesUpdated => {
        setTrees(treesUpdated);
    };

    let displayLoading = "";
    if (loading) {
        displayLoading = (
            <div className={"loading"}>
                <div className={"loading__image"} />
                <h3>{"Chargement .."}</h3>
            </div>
        );
    }

    return (
        <>
            {displayLoading}
            <Map
                center={[coordinateCenterMap.lat, coordinateCenterMap.lng]}
                zoom={20}
                onMoveEnd={e => {
                    onMove(e);
                }}>
                <TileLayer
                    url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                    attribution={
                        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    }
                />
                <MarkerCluster
                    trees={trees && trees}
                    wrapperSetTrees={wrapperSetTrees}
                />
            </Map>
        </>
    );
};

export default GameMap;
