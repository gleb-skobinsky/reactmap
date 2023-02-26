export const FETCH_MARKERS_SUCCESS = "FETCH_MARKERS_SUCCESS";

export const fetchMarkersSuccess = (geojsonData) => ({
  type: FETCH_MARKERS_SUCCESS,
  payload: geojsonData,
});

export const fetchMarkers = () => (dispatch) => {
  return fetch("http://localhost:8080/data")
    .then((response) => response.json())
    .then((data) => dispatch(fetchMarkersSuccess(data)))
    .catch((error) => console.log(error));
};
