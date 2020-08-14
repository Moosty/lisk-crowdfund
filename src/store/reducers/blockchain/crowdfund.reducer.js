import * as Actions from "../../actions";

const defaultState = {
  createForm: {
    title: "My Crowdfund",
    description: "My first crowdfund",
    category: "identity",
    site: "https://moosty.com",
    image: "",
    goal: 0,
    periods: 12,
    voting: 1,
    startDate: "",
  },
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case Actions.UPDATE_CROWDFUND_FORM:
      return {
        ...state,
        createForm: {
          ...state.createForm,
          ...action.update,
        },
      };
    case Actions.CLEAR_CROWDFUND_FORM:
      return {
        ...state,
        createForm: {
          ...defaultState.createForm,
        },
      };
    default:
      return {
        ...state,
      };
  }
};
