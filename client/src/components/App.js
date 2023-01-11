import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { observable, computed, configure, action, makeObservable, makeAutoObservable} from 'mobx';
import { observer } from 'mobx-react';


import Task from './Task';
import Tasks from './Tasks';
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
  
  tasks = [];
  tasksType = 1;

  подчиненные = [];
  

  login = null;

  constructor() {
    makeObservable(this, {
      tasks: observable,
      tasksType: observable,
      tasksTitle: computed,

      setTasks: action,
      setTasksType: action,
      подчиненные: observable,
      установитьПодчиненных: action,
    })

  }

  get tasksTitle(){
    switch(this.tasksType){
    case 1: return "Мои задачи";
    case 2: return "Задачи подчиненных";
    case 3: return "Все задачи";
    default: return "Неизвестный тип задач";
    }
  }

                                        
  loadTasks(type){
    this.setTasksType(type);
  }

  setTasksType(value){
    this.tasksType=value;

    this.setTasks([]);
    this.updateTasks();
  }

  updateTasks() {
    if (this.login==null) 
      return;

    fetch(`http://localhost:5000/user_tasks/${this.tasksType}/${this.login.id}`)
      .then((resp)=>resp.json())
      .then((json)=>{this.setTasks(json);});
  }
  
  setTasks(value){
    this.tasks=value;
  }

  установитьПодчиненных(value){
    this.подчиненные=value;
  }

  загрузитьПодчиненных() {
    if (this.login==null) 
      return;

    fetch(`http://localhost:5000/subordinates/${this.login.id}`)
      .then((resp)=>resp.json())
      .then((json)=>{this.установитьПодчиненных(json);});
  }
  

}

const store=new Store();

export default function App() {

  const { token, setToken } = useToken();

  const login=(typeof(token)==="string")?JSON.parse(token):token;
  store.login=login;
  if(!login.loggedIn) {
    return <Login token={login} setToken={setToken} />
  }


  store.loadTasks(1);
  store.загрузитьПодчиненных();

  return (
    <div className="wrapper container-fluid">
      <hr/> 
      {login.cn}
{/*      {data.map((item)=><Task data={item} key={item.id}/>)};*/}
      <BrowserRouter>
        <Routes>
          <Route path="/"element={<Tasks store={store}/>}/>
        </Routes>
      </BrowserRouter>

        
    </div>
  );
}


