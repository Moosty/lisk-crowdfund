import { config } from "app/config";

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
    let userList = [];
    for(let u in users) {
      const result = await fetch(`${config.apiUrl}accounts?publicKey=${users[u].senderPublicKey}`, options);
      if (result) {
        const jsonResult = await result.json();
        if (jsonResult && jsonResult.data) {
          userList.push(jsonResult.data[0])
        }
      }
    }
    dispatch(addUsers(userList));
  } catch (err) {
    console.error(err)
  }
});

export const addUsers = users => ({
  type: ADD_USERS,
  users,
});
