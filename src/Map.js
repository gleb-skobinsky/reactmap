import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import CanvasMarkers from "./Markers";

const MapComponent = () => {
  return (
    <div>
      <link
        rel="stylesheet"
        href="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css"
      />
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        style={{ height: "100vh" }}
        preferCanvas={true}
      >
        <CanvasMarkers />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
