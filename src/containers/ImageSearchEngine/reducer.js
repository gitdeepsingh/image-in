const reducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_SEARCHED_VALUE":
      return {
        searchedValue: action.value,
      };
    default:
      return state;
  }
};

export default reducer;
