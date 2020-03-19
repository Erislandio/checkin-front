import React, { useEffect, useState } from "react";
import { withUserData } from "../../atoms/withUserData";
import L from "leaflet";

function Home({ history }) {
  useEffect(() => {
    L.map("map", {
      center: [49.8419, 24.0315],
      zoom: 16,
      layers: [
        L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        })
      ]
    });
  }, []);

  return <div id="map"></div>;
}

export default withUserData(Home);
