import React, { useRef, useEffect, useMemo } from "react";
import L from "leaflet";
import "leafletjs-canvas-overlay";
import "leaflet/dist/leaflet.css";

const Map = () => {
  const mapRef = useRef(null);
  const canvasRef = useRef(null);

  const markers = useMemo(() => [], []);

  useEffect(() => {
    // Initialize map
    const map = L.map(mapRef.current, {
      center: [0, 0],
      zoom: 1,
      zoomControl: false,
    });

    const myLayer = L.glify.layer({
      // Option #1. A single GeoJSON FeatureCollection that needs to be sorted
      geojson: {},

      // Option #2. -> FeatureCollection's that are pre-sorted by type
      type: {
        shapes: {}, // FeatureCollection of Polygon's
        lines: {}, // FeatureCollection of LineString's
        points: {}, // FeatureCollection of Point's
      },
      // L.glify options - currently a single set
      // of options is used for all geometry types
      glifyOptions: {
        // defaults vaguely match leaflet
        border: true,
        opacity: 0.2,
        size: 10,
      },

      // OPTIONAL - supply the name of a custom pane,
      // will be created if doesn't exist, defaults to overlayPane
      // (used by L.glify as `pane` option)
      // https://leafletjs.com/reference-1.6.0.html#map-pane
      paneName: "overlayPane",

      // OPTIONAL - callback to be notified when types
      // have been sorted, L.glify will be created
      onTypesReady() {},

      // OPTIONAL - callbacks when layer is added/removed from map
      onAdd: function () {},
      onRemove: function () {},
    });

    myLayer.addTo(map);

    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "",
    }).addTo(map);

    // Set canvas size to match map container
    const resizeCanvas = () => {
      const { width, height } = mapRef.current.getBoundingClientRect();
      canvasRef.current.width = width;
      canvasRef.current.height = height;
    };
    resizeCanvas();
    map.on("resize", resizeCanvas);

    // Clean up on unmount
    return () => {
      map.remove();
      markers.length = 0;
    };
  }, [markers]);

  // Generate random markers
  for (let i = 0; i < 10000; i++) {
    markers.push({
      lat: Math.random() * 180 - 90,
      lng: Math.random() * 360 - 180,
    });
  }

  return (
    <div ref={mapRef} style={{ height: "100vh" }}>
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default Map;
