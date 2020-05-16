import { combineReducers } from "redux";
import galleryReducer from "./galleryReducer";

const allReducer = combineReducers({
	gallery: galleryReducer
});

export default allReducer;