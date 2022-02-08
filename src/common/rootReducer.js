import { combineReducers } from "redux";
import searchEngineReducers from "../containers/ImageSearchEngine/reducer";

export const combinedReducer = combineReducers({
    searchEngineReducers,
});
