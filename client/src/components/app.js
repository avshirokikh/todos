import React from "react";

import {BrowserRouter, Route, Routes} from "react-router-dom";

import Tasks from "./tasks";
import Login from "./login";
import useToken from "./useToken";
import Store from "./store";

import "../css/App.css";

const store = new Store();

export default function App () {

  const {token, setToken} = useToken();
  const login = (typeof (token) === "string") ? JSON.parse(token) : token;
  store.login = login;
  if (!login.loggedIn) {
    return <Login token={login} setToken={setToken}/>;
  }

  store.loadTasks(1);
  store.loadSubordinates();

  return (
    <div className="wrapper pt-0 " >
      <div className="container p-0 my-3 row" >
        <h1 className="col-sm-6 p-0 m-0" >TODO list</h1>
        <div className="col-sm-6 text-end pe-0">
          {login.cn}
          <button className="btn btn-link"

            onClick={() => {
              setToken();
            }}>
                        выйти
          </button>
        </div>
        <hr className="p-0 m-0"/>
      </div>
      {/*      {data.map((item)=><Task data={item} key={item.id}/>)};*/}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Tasks store={store}/>}/>
        </Routes>
      </BrowserRouter>


    </div>
  );
}


