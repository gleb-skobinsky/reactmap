// import React, { PureComponent } from "react";
// import PropTypes from "prop-types";
// import { Marker } from "pigeon-maps";
// import { connect } from "react-redux";
// import { fetchMarkers } from "./actions";

// class Markers extends PureComponent {
//   componentDidMount() {
//     this.props.dispatch(fetchMarkers());
//   }
//   render() {
//     const { markers } = this.props;

//     return markers.map(({ address, name, restaurant_id }) => (
//       <Marker key={restaurant_id} anchor={address.coord}>
//         <div style={{ backgroundColor: "white", padding: 5 }}>{name}</div>
//       </Marker>
//     ));
//   }
// }

// Markers.propTypes = {
//   markers: PropTypes.arrayOf(
//     PropTypes.shape({
//       address: PropTypes.shape({
//         building: PropTypes.string.isRequired,
//         coord: PropTypes.arrayOf(PropTypes.number).isRequired,
//         street: PropTypes.string.isRequired,
//         zipcode: PropTypes.string.isRequired,
//       }),
//       borough: PropTypes.string.isRequired,
//     })
//   ),
//   dispatch: PropTypes.func.isRequired,
// };

// const mapStateToProps = (state) => ({
//   markers: state.markers.markers,
// });

// export default connect(mapStateToProps)(Markers);

import React, { useEffect, useState } from "react";
import { GeoJSON } from "react-leaflet";
import L from "leaflet";

const CanvasMarkers = () => {
  const customIcon = L.divIcon({
    html: `
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#0074D9"
        d="M12 0c-4.4 0-8 3.6-8 8 0 4.9 7.2 15.3 7.5 15.8.2.3.5.4.8.4s.6-.1.8-.4c.3-.5 7.5-11 7.5-15.8 0-4.4-3.6-8-8-8zm0 11c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z"
      />
    </svg>`,
    className: "svg-icon",
    iconSize: [24, 40],
    iconAnchor: [12, 40],
  });
  // create state variable to hold data when it is fetched
  const [geojsonData, setGeojsonData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/data", {
      method: "get",
    })
      .then((response) => response.json())
      .then((data) => setGeojsonData(data))
      .catch((error) => console.error(error));
  }, []); // Your GeoJSON data
  console.log(geojsonData);

  // render react-leaflet GeoJSON when the data is ready
  if (geojsonData) {
    return (
      <GeoJSON
        data={geojsonData}
        pointToLayer={(feature, latlng) => {
          return L.marker(latlng, {
            icon: customIcon,
          });
        }}
      />
    );
  } else {
    return null;
  }
};

export default React.memo(CanvasMarkers);

/*
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-canvas-marker";

const CanvasMarkers = () => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    const customIcon = L.divIcon({
      html: `
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#0074D9"
          d="M12 0c-4.4 0-8 3.6-8 8 0 4.9 7.2 15.3 7.5 15.8.2.3.5.4.8.4s.6-.1.8-.4c.3-.5 7.5-11 7.5-15.8 0-4.4-3.6-8-8-8zm0 11c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z"
        />
      </svg>`,
      className: "svg-icon",
      iconSize: [24, 40],
      iconAnchor: [12, 40],
    });

    // add tile layer to map
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "Map data &copy; OpenStreetMap contributors",
    }).addTo(map);

    // create custom canvas layer to render markers
    const customLayer = L.canvasIconLayer({}).addTo(map);

    // fetch GeoJSON data
    fetch("http://localhost:8080/data", {
      method: "get",
    })
      .then((response) => response.json())
      .then((data) => {
        var markers = [];
        for (var i = 0; i < data.features.length; i++) {
          var marker = L.marker(data.features[i].geometry.coordinates, {
            icon: customIcon,
          });
          markers.push(marker);
        }
        console.log(markers);
        customLayer.addLayers(markers);
        // add GeoJSON data to custom canvas layer
        // customLayer.addData(data);
      })
      .catch((error) => console.error(error));
  }, [map]);

  return null;
};

export default CanvasMarkers;
*/
