import React, {useState} from 'react';
import env from "react-dotenv";
import PropTypes from 'prop-types';

import '../css/Login.css';

async function loginUser(credentials) {
    return fetch(`${env.API_HOST}/login`, {
        method: 'POST', headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}

export default function Login({token, setToken}) {

    let login = (typeof (token) === "string") ? JSON.parse(token) : token;

    const [username, setUserName] = useState("director");
    const [password, setPassword] = useState("password");

    const handleSubmit = async e => {
        e.preventDefault();
        let result = {loggedIn: false, error: "connect", id: -1, logon: "", ln: "", fn: "", mn: "", cn: ""}

        try {
            let token = await loginUser({username, password})
            result = token;
        } catch (err) {
            console.error("Error");
        }

        setToken(result);
    }

    let error = "";
    if (!login.loggedIn) {
        switch (login.error) {
            case "connect":
                error = "Ошибка соединения"
                break
            case "user":
                error = "Пользователь не найден";
                break
            case "password":
                error = "Неверный пароль";
                break;
            default:
        }
    }


    return (
        <div className="container">
            <div id="login-row" className="row justify-content-center align-items-center">
                <div id="login-column" className="col-md-6">
                    <div id="login-box" className="col-md-12">
                        <form id="login-form" className="form" onSubmit={handleSubmit}>
                            <h3 className="text-center text-info">Login</h3>
                            <div className="form-group">
                                <label htmlFor="username" className="text-info">Username:</label><br/>
                                <input type="text" name="username" id="username" className="form-control"
                                       onChange={e => setUserName(e.target.value)} defaultValue={username}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="text-info">Password:</label><br/>
                                <input type="password" name="password" id="password" className="form-control"
                                       onChange={e => setPassword(e.target.value)} defaultValue={password}/>
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