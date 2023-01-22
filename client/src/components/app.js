import React from 'react';

import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Tasks from './tasks';
import Login from './login';
import useToken from './useToken';
import Store from './store';

import '../css/App.css';

const store = new Store();

export default function App() {

    const {token, setToken} = useToken();
    const login = (typeof (token) === "string") ? JSON.parse(token) : token;
    store.login = login;
    if (!login.loggedIn) {
        return <Login token={login} setToken={setToken}/>
    }

    store.loadTasks(1);
    store.loadSubordinates();

    return (
        <div className="wrapper" style={{paddingTop: "0px"}}>
            <div className="container p-0 my-3 row" style={{padding: "0px"}}>
                <h1 className="col-sm-6" style={{padding: "0px"},{margin:"0px"}}>TODO list</h1>
                <div className="col-sm-6" style={{textAlign: "right"}}>
                    {login.cn}
                    <button
                        style={{
                            margin: "2px",
                            border: "none",
                            background: "none",
                            textDecoration: "underline",
                            padding: "0px 2px",
                            fontSize: "10pt"
                        }}
                        onClick={() => {
                            setToken(null);
                        }}>
                        выйти
                    </button>
                </div>
            </div>
            <hr style={{"margin": "0px"},{padding:"0px"}}/>
            {/*      {data.map((item)=><Task data={item} key={item.id}/>)};*/}
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Tasks store={store}/>}/>
                </Routes>
            </BrowserRouter>


        </div>
    );
}


