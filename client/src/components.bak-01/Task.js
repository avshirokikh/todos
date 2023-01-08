import React from 'react';

import '../css/Task.css';

const Task = (props) => {
//  console.log(props);

  const {title, priority, dt_due, resp_name, status, overdue}=props.data;

  const options = {
//    era: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
//    weekday: 'long',
//    timezone: 'UTC',
    hour: 'numeric',
    minute: 'numeric',
//    second: 'numeric'
  };

  return (
    <div className="task-list-item container p-3 my-3 border row  ">
      <div className={"task-list-item-title col-sm-12", overdue?"overdue":(status>1?"complete":"running")} > {title} </div>
      <div className="task-list-item-priority col-sm-4 ">Приоритет: {["низкий","средний","высокий"][priority]} </div>
      <div className="task-list-item-due col-sm-4 "> Срок: {new Date(dt_due).toLocaleDateString("ru-RU", options)} </div>
      <div className="task-list-item-status col-sm-4 ">Статус: {["к выполнению", "выполняется", "выполнена", "отменена"][status]} </div>
      <div className="task-list-item-resp col-sm-12 ">Ответственный: {resp_name} </div>
    </div>
  );
}

export default Task;

{
/*
{
        "id": 1,
        "title": "Dir Task1",
        "description": "Dir Task1",
        "dt_due": "2023-01-05T16:47:02.000Z",
        "dt_created": "2023-01-06T12:46:27.691Z",
        "dt_modified": "2023-01-06T12:46:27.691Z",
        "priority": 2,
        "status": 0,
        "owner": 1,
        "assigned_to": 1,
        "mgr_id": null,
        "resp_id": 1,
        "resp_name": "Директор И. И.",
        "cat": 1,
        "overdue": 1
    }
*/
}