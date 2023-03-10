import {useState} from "react";

const getToken = () => {
  let result = {loggedIn: false, error: "", id: -1, logon: "", ln: "", fn: "", mn: "", cn: ""};
  try {
    const tokenString = sessionStorage.getItem("token");
    if (tokenString) {
      result = JSON.parse(tokenString);
    }
  } catch (error) {
    console.error(error);
  }

  return result;
};

export default function useToken () {

  const value = getToken();

  const [token, setToken] = useState(value);

  const saveToken = userToken => {
    sessionStorage.removeItem("token");
    if (userToken) {
      const tokenString = JSON.stringify(userToken);
      sessionStorage.setItem("token", tokenString);
      setToken(userToken);

      return;
    }
    setToken(getToken());
  };

  return {
    setToken: saveToken,
    token
  };
}
