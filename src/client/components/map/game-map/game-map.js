import React, {useState, useEffect} from "react";
import {Map, TileLayer} from "react-leaflet";
import axios from "axios";
import MarkerCluster from "../marker-cluster/marker-cluster.js";

const GameMap = () => {
    const [loading, setLoading] = useState(true);
    const [trees, setTrees] = useState();
    useEffect(() => {
        axios
            .get("/api/tree/")
            .then(response => {
                // handle success
                setTrees(response.data);
                setLoading(false);
                // console.log(response);
            })
            // eslint-disable-next-line no-unused-vars
            .catch(error => {
                // handle error
                // console.log(error);
            });
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
            <Map center={[50.6246191, 5.5290555]} zoom={12}>
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
