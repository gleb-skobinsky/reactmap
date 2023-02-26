import { FETCH_MARKERS_SUCCESS } from "./actions";

const initialState = {
  geojsonData: null,
};

const markersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MARKERS_SUCCESS:
      return { ...state, geojsonData: action.payload };
    default:
      return state;
  }
};

export default markersReducer;
