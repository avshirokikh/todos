import env from "react-dotenv";

import {action, computed, configure, makeObservable, observable} from 'mobx';

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

export default Store;