// reducers.js

import { combineReducers } from "redux";
import markersReducer from "./markersReducer";

const rootReducer = combineReducers({
  geojsonData: markersReducer,
});

export default rootReducer;
