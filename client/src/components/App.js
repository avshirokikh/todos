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
import TaskEditor from './TaskEditor';

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

      taskEditorData:observable,
      setTaskEditorData: action,

      taskEditorVisible:observable,
      setTaskEditorVisible:action,
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

  taskEditorVisible=false;

  setTaskEditorVisible(value)
  {
    this.taskEditorVisible=value;  
  }


  taskEditorData = {};

  saveTask(task)
  {
    if (this.login==null) 
      return;

    return fetch(`http://localhost:5000/save-task/${this.login.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    })
      .then((resp)=>resp.json())
      .then((json)=>{this.updateTasks();});
  }                                        


  blankTaskEditorData(){
    const now=new Date();
    let dueTo = now;
    dueTo.setDate(dueTo.getDate() + 1);

    return {
      id: -1,
      title: "Новая задача",
      description: "Описание новой задачи",
      dt_due: dueTo,
      dt_created: now,
      dt_modified: now,
      priority: 1,
      status: 0,
      owner: this.login?.id,
      assigned_to: this.login?.id,
    }
  }

  loadTaskEditorData(id)
  {
    if(id===-1){
      this.setTaskEditorData(this.blankTaskEditorData());
      this.setTaskEditorVisible(true);
      return;
    }

    fetch(`http://localhost:5000/task/${id}`)
      .then((resp)=>resp.json())
      .then((json)=>{
        this.setTaskEditorData(json);
        this.setTaskEditorVisible(true);
      });
  }

  setTaskEditorData(value){
    this.taskEditorData=value;
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
  console.log(token);
  const login=(typeof(token)==="string")?JSON.parse(token):token;
  store.login=login;
  if(!login.loggedIn) {
    return <Login token={login} setToken={setToken} />
  }


  store.loadTasks(1);
  store.загрузитьПодчиненных();

  return (
    <div className="wrapper container-fluid">
      <div className="row">
        <div className="col-sm-6">TODO list</div>
        <div className="col-sm-6" style={{textAlign:"right"}}>
          {login.cn}
          <button 
            style={{margin:"2px", border:"none", background:"none", textDecoration:"underline",padding:"0px 2px", fontSize:"10pt"}}
            onClick={()=>{setToken(null);}}>
            выйти</button>
        </div>
      </div>
      <hr/> 
{/*      {data.map((item)=><Task data={item} key={item.id}/>)};*/}
      <BrowserRouter>
        <Routes>
          <Route path="/"element={<Tasks store={store}/>}/>
        </Routes>
      </BrowserRouter>

        
    </div>
  );
}


