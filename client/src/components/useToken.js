import { useState } from 'react';

export default function useToken() {

  const getToken = () => {
    let result={loggedIn: false, error: "", id: -1, logon: "", ln: "", fn: "", mn: "", cn: ""}
    try{
      const tokenString = sessionStorage.getItem('token');
      if (tokenString)
        result=JSON.parse(tokenString);
    } catch(err) {
      console.error(err);
    }
    //console.log(result)
    console.log(result.error);
    return result
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    const tokenString=JSON.stringify(userToken);
    sessionStorage.setItem('token', tokenString);
    setToken(tokenString);
  };

  return {
    setToken: saveToken,
    token
  }
}
