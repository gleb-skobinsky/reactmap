import React from "react";
import MapComponent from "./Map";
import store from "./store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <MapComponent />
      </div>
    </Provider>
  );
}

export default App;

/*
import React, { Component } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  CircleMarker as LeafletCircleMarker,
  Canvas as LeafletCanvas,
} from "leaflet";

LeafletCanvas.include({
  _updateCustomMarker: function (layer) {
    if (!this._drawing || layer._empty()) {
      return;
    }

    var p = layer._point,
      ctx = this._ctx,
      r = Math.max(Math.round(layer._radius), 1);

    ctx.moveTo(p.x - r, p.y);
    ctx.lineTo(p.x - r + 30, p.y - 10);
    ctx.lineTo(p.x - r + 30, p.y + 10);
    ctx.closePath();
    ctx.restore();

    this._fillStroke(ctx, layer);
  },
});

var CustomTriangle = LeafletCircleMarker.extend({
  _updatePath: function () {
    this._renderer._updateCustomMarker(this);
  },
});

class App extends Component {
  state = {
    markers: null,
  };
  componentDidMount() {
    fetch("http://localhost:8080/data", {
      method: "get",
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ markers: data });
        console.log(this.state.markers);
      })
      .catch((error) => console.error(error));
    console.log(this.state.markers);
  }
  onEachFeature(feature, layer) {
    var popupContent =
      "<p>I started out as a GeoJSON " +
      feature.geometry.type +
      ", but now I'm a Leaflet vector!</p>";

    if (feature.properties && feature.properties.popupContent) {
      popupContent += feature.properties.popupContent;
    }

    layer.bindPopup(popupContent);
  }

  style(featurea) {
    return featurea.properties && featurea.properties.style;
  }

  pointToLayer(feature, latlng) {
    return new CustomTriangle(latlng, {
      radius: 30,
      fillOpacity: "0.8",
      stroke: false,
      height: 20,
      rotation: 60,
    });
  }
  render() {
    return (
      <>
        <MapContainer
          style={{ height: "100vh", width: "100vw" }}
          center={[0.5, 0.5]}
          zoom={5}
          preferCanvas={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <GeoJSON
            data={this.state.markers}
            onEachFeature={this.onEachFeature.bind(this)}
            style={this.style.bind(this)}
            pointToLayer={this.pointToLayer.bind(this)}
          />
        </MapContainer>
      </>
    );
  }
}

export default App;
*/
