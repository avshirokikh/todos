import React from 'react';
import env from "react-dotenv";

import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {action, computed, configure, makeObservable, observable} from 'mobx';

import Tasks from './Tasks';
import Login from './Login';
import useToken from './useToken';

import '../css/App.css';

configure({enforceActions: 'observed'});

class Store {

    tasks = [];
    tasksType = 1;

    subordinates = [];

    login = null;

    constructor() {
        makeObservable(this, {
            tasks: observable,
            tasksType: observable,
            tasksTitle: computed,

            setTasks: action,
            setTasksType: action,
            subordinates: observable,
            setSubordinates: action,

            taskEditorData: observable,
            setTaskEditorData: action,

            taskEditorVisible: observable,
            setTaskEditorVisible: action,
        })

    }

    get tasksTitle() {
        switch (this.tasksType) {
            case 1:
                return "Мои задачи";
            case 2:
                return "Задачи подчиненных";
            case 3:
                return "Все задачи";
            default:
                return "Неизвестный тип задач";
        }
    }

    taskEditorVisible = false;

    setTaskEditorVisible(value) {
        this.taskEditorVisible = value;
    }


    taskEditorData = {};

    saveTask(task) {
        if (this.login == null)
            return;

        return fetch(`${env.API_HOST}/save-task/${this.login.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
            .then((resp) => resp.json())
            .then((json) => {
                this.updateTasks();
            });
    }


    blankTaskEditorData() {
        const now = new Date();
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

    loadTaskEditorData(id) {
        if (id === -1) {
            this.setTaskEditorData(this.blankTaskEditorData());
            this.setTaskEditorVisible(true);
            return;
        }

        fetch(`${env.API_HOST}/task/${id}`)
            .then((resp) => resp.json())
            .then((json) => {
                this.setTaskEditorData(json);
                this.setTaskEditorVisible(true);
            });
    }

    setTaskEditorData(value) {
        this.taskEditorData = value;
    }

    loadTasks(type) {
        this.setTasksType(type);
    }

    setTasksType(value) {
        this.tasksType = value;

        this.setTasks([]);
        this.updateTasks();
    }

    updateTasks() {
        if (this.login == null)
            return;

        fetch(`${env.API_HOST}/user_tasks/${this.tasksType}/${this.login.id}`)
            .then((resp) => resp.json())
            .then((json) => {
                this.setTasks(json);
            });
    }

    setTasks(value) {
        this.tasks = value;
    }


    setSubordinates(value) {
        this.subordinates = value;
    }

    loadSubordinates() {
        if (this.login == null)
            return;

        fetch(`${env.API_HOST}/subordinates/${this.login.id}`)
            .then((resp) => resp.json())
            .then((json) => {
                this.setSubordinates(json);
            });
    }


}

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
        <div className="wrapper" style={{paddingTop:"0px"}}>
            <div className="container p-0 my-3 row" style={{padding:"0px"}}>
                <h1 className="col-sm-6" style={{padding:"0px"},{margin:"0px"}}>TODO list</h1>
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
            <hr style={{"margin":"0px"},{padding:"0px"}}/>
            {/*      {data.map((item)=><Task data={item} key={item.id}/>)};*/}
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Tasks store={store}/>}/>
                </Routes>
            </BrowserRouter>


        </div>
    );
}


