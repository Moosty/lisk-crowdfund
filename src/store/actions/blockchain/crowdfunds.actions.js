import { config } from "app/config";

export const LOAD_CROWDFUNDS = '[crowdfunds] load crowdfunds';
export const DONE_CROWDFUNDS = '[crowdfunds] done crowdfunds';
export const ADD_CROWDFUNDS = '[crowdfunds] add crowdfunds';

export const loadCrowdfunds = () => ({
  type: LOAD_CROWDFUNDS,
});

export const doneCrowdfunds = () => ({
  type: DONE_CROWDFUNDS,
});

export const getCrowdfunds = () => (async (dispatch) => {
  try {
    dispatch(loadCrowdfunds());
    const options = {
      headers: {
        "content-type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
      method: "GET"
    }
    const result = await fetch(`${config.extendedApiUrl}accounts?asset=investments&limit=1000`, options);
    if (result) {
      const jsonResult = await result.json();
      dispatch(doneCrowdfunds())
      if (jsonResult && jsonResult.data) {
        dispatch(addCrowdfunds(jsonResult.data));
      }
    }
  } catch (err) {
    console.error(err)
  }
});

export const addCrowdfunds = crowdfunds => ({
  type: ADD_CROWDFUNDS,
  crowdfunds,
});
