import * as Actions from "../../actions";

const defaultState = {
  projects: [],
  loading: false,
};

const removeDuplicates = (myArr, prop) => (myArr.filter((obj, pos, arr) => {
    return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
  }));

export default (state = defaultState, action) => {
  switch (action.type) {
    case Actions.LOAD_CROWDFUNDS:
      return {
        ...state,
        loading: true,
      };
      case Actions.DONE_CROWDFUNDS:
      return {
        ...state,
        loading: false,
      };
    case Actions.ADD_CROWDFUNDS:
      return {
        ...state,
        projects: removeDuplicates([
          ...action.crowdfunds,
          ...state.projects,
        ], "publicKey"),
      };
    default:
      return {
        ...state,
      };
  }
};
