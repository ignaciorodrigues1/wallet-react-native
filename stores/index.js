import { applyMiddleware, combineReducers, compose, createStore } from "redux";

import PlacesReducer from "./place/placeReducer";
import authReducer from "./auth/authReducer";
import marketReducer from "./market/marketReducer";
import tabReducer from "./tab/tabReducer";
import thunk from "redux-thunk";

const RootReducer = combineReducers({
  tabReducer,
  marketReducer,
  auth: authReducer,
  places: PlacesReducer,
});

export default createStore(RootReducer, compose(applyMiddleware(thunk)));
