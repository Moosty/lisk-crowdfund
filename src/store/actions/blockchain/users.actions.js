import { config } from "../../../config";

export const LOAD_USERS = '[users] load users';
export const DONE_USERS = '[users] done users';
export const ADD_USERS = '[users] add users';

export const loadUsers = () => ({
  type: LOAD_USERS,
});

export const doneUsers = () => ({
  type: DONE_USERS,
});

export const getUsers = (users) => (async (dispatch) => {
  try {
    dispatch(loadUsers());
    const options = {
      headers: {
        "content-type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
      method: "GET"
    }
    for(let u in users) {
      const result = await fetch(`${config.apiUrl}accounts?publicKey=${users[u].senderPublicKey}`, options);
      if (result) {
        const jsonResult = await result.json();
        dispatch(doneUsers())
        if (jsonResult && jsonResult.data) {
          dispatch(addUsers(jsonResult.data));
        }
      }
    }
  } catch (err) {
    console.error(err)
  }
});

export const addUsers = users => ({
  type: ADD_USERS,
  users,
});
