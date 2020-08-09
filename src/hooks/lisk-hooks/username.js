import React, { useEffect, useState } from 'react';
import { config } from '../../config';

export const useUsername = () => {
  const [username, setUsername] = useState("");
  const [usernameAccount, setAccount] = useState(null);
  const [exist, setExist] = useState(false);

  useEffect(() => {
    setExist(false);
    checkUsername();
  }, [username]);

  const checkUsername = async () => {
    const usernames = await fetch(`${config.extendedApiUrl}username/${username}`);
    if (usernames.ok) {
      const json = await usernames.json();
      if (json.length > 0) {
        // eslint-disable-next-line array-callback-return
        json.map(account => {
          if (account.username === username) {
            setExist(true);
            setAccount(account);
          }
        });
      }
    } else {
      console.log('HTTP-Error:', usernames.status);
    }
  };

  return [{ exist, username, usernameAccount }, setUsername];
};
