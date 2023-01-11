import React, { useState } from 'react';
import PropTypes from 'prop-types';

import useToken from './useToken';

import '../css/Login.css';

async function loginUser(credentials) {
 return fetch('http://localhost:5000/login', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.json())
}

export default function Login({token, setToken }) {

  let login=(typeof(token)==="string")?JSON.parse(token):token;

  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    let result={loggedIn: false, error: "connect", id: -1, logon: "", ln: "", fn: "", mn: "", cn: ""}

    try{
      let token = await loginUser({
        username,
        password
      })

      result=token;//JSON.parse(token);
    } catch (err) {
      console.error("Error");
    }

    setToken(result);
  }

  let error = "";
  if(!login.loggedIn) {
    if(login.error==="connect")
      error="Ошибка соединения";
    if(login.error==="user")
      error="Пользователь не найден";
    if(login.error==="password")
      error="Неверный пароль";
    
  }


  return(
    <div class="container">
      <div id="login-row" className="row justify-content-center align-items-center">
        <div id="login-column" className="col-md-6">
          <div id="login-box" className="col-md-12">
            <form id="login-form"  className="form" onSubmit={handleSubmit}>
              <h3 class="text-center text-info">Login</h3>
              <div className="form-group">
                <label for="username" className="text-info">Username:</label><br/>
                <input type="text" name="username" id="username" className="form-control" onChange={e => setUserName(e.target.value)}/>
              </div>
              <div className="form-group">
                <label for="password" className="text-info">Password:</label><br/>
                <input type="password" name="password" id="password" className="form-control" onChange={e => setPassword(e.target.value)}/>
              </div>
              <div className="form-group">
                <input type="submit" name="submit" className="btn btn-info btn-md" value="submit"/>
              </div>
            </form>
            <div className="login-error">{error}</div>
          </div>
        </div>
      </div>
    </div>

  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};