import React, {useEffect, useState} from "react";
import {Map, TileLayer} from "react-leaflet";
import axios from "axios";
import MarkerCluster from "../marker-cluster/marker-cluster.js";

const GameMap = () => {
    const [loading, setLoading] = useState(true);
    const [trees, setTrees] = useState();
    useEffect(() => {
        axios
            .get("/api/tree/")
            .then(function (response) {
                // handle success
                setTrees(response.data);
                setLoading(false);
            })
            .catch(function (error) {
                // handle error
                // console.log(error);
            });
    }, []);

    let displayLoading = "";
    if (loading) {
        displayLoading = (
            <div className={"loading"}>
                <img src="/images/loading.gif" />
                <h3>Loading ..</h3>
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
                <MarkerCluster trees={trees && trees} />
            </Map>
        </>
    );
};

export default GameMap;
