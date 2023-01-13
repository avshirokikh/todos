import React from 'react';
import {observer} from 'mobx-react';

import Task from './Task';
import TaskEditor from './TaskEditor';


import '../css/Tasks.css';


const Tasks = observer(({store}) => {
    if (store == null) return;

    if (store.tasks == null) return;

    function active(type) {
        return store.tasksType === type ? "active-tasks-type" : ""
    }

    return (<div>
        <TaskEditor store={store}>
        </TaskEditor>

        <div>
            <button onClick={() => store.loadTasks(1)} className={` ${active(1)} tasks-type`}>Мои задачи</button>
            <button onClick={() => store.loadTasks(2)} className={` ${active(2)} tasks-type`}>Задачи подчиненных
            </button>
            <button onClick={() => store.loadTasks(3)} className={` ${active(3)} tasks-type`}>Все задачи</button>
            <button onClick={() => store.loadTaskEditorData(-1)}>Создать задачу</button>
        </div>

        {store.tasks.map((item) => <Task data={item} key={item.id} store={store}/>)}
    </div>)
})

export default Tasks;
