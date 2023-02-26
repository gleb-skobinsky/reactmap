# React-based map application for handling GeoJSON data

## To run backend, do:

```
cd map-backend
go run server.go
```

The golang server will simply read one of the sample GeoJSON files and serve it to the React app. Note that the script has been tested with Golang version >1.18.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

Note that this repo is an experimental and is intended to check how performant is `react-leaflet` package in handling GeoJSONs. It turns out that performance is very poor with Point type features. In order to handle over 100K features without freezing during zooming and panning, convert them to LineString format using the fixgeojson.py script (Python 3.x).

![alt text](https://raw.githubusercontent.com/gleb-skobinsky/reactmap/master/showcase.png)
