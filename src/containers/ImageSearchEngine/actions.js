import * as Types from "./actionTypes";

export const setSearchedValue = (value) => {
  return {
    type: Types.SET_SEARCHED_VALUE,
    value,
  };
};
