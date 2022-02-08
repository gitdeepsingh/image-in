import { createStore } from "redux";
import { combinedReducer } from "./rootReducer";

const store = (state) => {
  return createStore(combinedReducer, state);
};

export default store;
