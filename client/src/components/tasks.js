import React from "react";
import {observer} from "mobx-react";

import Task from "./task";
import TaskEditor from "./taskEditor";
import "../css/Tasks.css";

const Tasks = observer(({store}) => {
  if (store === undefined) {
    return;
  }

  if (store.tasks === undefined) {
    return;
  }

  function active (type) {
    return store.tasksType === type ? "active-tasks-type" : "";
  }

  return (
    <div>
      <TaskEditor store={store}>
      </TaskEditor>
      <div className="container p-0 my-0 row">
        <div className="col-9 my-0 ps-0" >
          <button onClick={() => store.loadTasks(1)} className={` ${active(1)} tasks-type pt-0`}>
              Мои задачи</button>
          <button onClick={() => store.loadTasks(2)} className={` ${active(2)} tasks-type pt-0`}>
              Задачи подчиненных</button>
          <button onClick={() => store.loadTasks(3)} className={` ${active(3)} tasks-type pt-0`}>
              Все задачи</button>
        </div>
        <div className="col-3 p-0 my-0 text-end">
          <button className="pt-0 my-0 btn btn-primary" onClick={() => store.loadTaskEditorData(-1)}>
              Создать задачу</button>
        </div>
      </div>
      {store.tasks.map((item) => <Task data={item} key={item.id} store={store}/>)}
    </div>);
});

export default Tasks;
