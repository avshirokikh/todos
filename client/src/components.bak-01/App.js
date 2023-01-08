import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { observable, computed, configure, action, makeObservable, makeAutoObservable} from 'mobx';
import { observer } from 'mobx-react';


import Task from './Task';
import Tasks from './Tasks';
import XTasks from './XTasks';
import Login from './Login';
import useToken from './useToken';
import useSWR from 'swr';
import Test from './Test';

import '../css/App.css';

configure({enforceActions: 'observed' });

async function loginUser(credentials, {setTasks}) {
 return fetch('http://localhost:5000/login', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 }).then(data => console.log("done",data))
   
}

class Store {
  uid
  msg = 2;
  tasks = [];
  tasksTitle = "";

  constructor() {
    makeObservable(this, {
      msg: observable,
      tasks: observable,
      tasksTitle: observable,
      inc: action,
      setTasks: action,
      title: computed
    })
  }

  get title(){
    return "msg is "+this.msg;
  }

  inc() {
    this.msg++;
  }

  loadTasks(uid, type, title){
    uid
    fetch('http://localhost:5000/user_tasks/1/1')
      .then((resp)=>resp.json())
      .then((json)=>this.setTasks(json));
  }

  setTasks(tasks){
    this.tasks=tasks;
  }

}

const store=new Store();

export default function App() {


  const url='http://localhost:5000/user_tasks/1/1';
  const fetcher = (...args) => fetch(url).then((resp)=>resp.json())

  const { data, error} = useSWR(url, fetcher, { suspense: true });
 
  const { token, setToken } = useToken();
  const login=(typeof(token)==="string")?JSON.parse(token):token;
  if(!login.loggedIn) {
    return <Login token={login} setToken={setToken} />
  }

  function change(){
    store.update();
//    alert(store.msg);
  }

  change();

  return (
    <div className="wrapper container-fluid">
      <hr/> 
{/*      {data.map((item)=><Task data={item} key={item.id}/>)};*/}
      <BrowserRouter>
        <Routes>
          <Route path="/"element={<XTasks store={store}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}


