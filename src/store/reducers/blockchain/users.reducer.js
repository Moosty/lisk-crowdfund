import * as Actions from "../../actions";

const defaultState = {
  users: [],
  loading: false,
};

const removeDuplicates = (myArr, prop) => (myArr.filter((obj, pos, arr) => {
  return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
}));

export default (state = defaultState, action) => {
  switch (action.type) {
    case Actions.LOAD_USERS:
      return {
        ...state,
        loading: true,
      };
    case Actions.DONE_USERS:
      return {
        ...state,
        loading: false,
      };
    case Actions.ADD_USERS:
      return {
        ...state,
        loading: false,
        users: removeDuplicates([
          ...state.users,
          ...action.users,
        ], "publicKey"),
      };
    default:
      return {
        ...state,
      };
  }
};
