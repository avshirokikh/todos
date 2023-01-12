import React from 'react';

import '../css/Task.css';

function formatDateTime(date)
{
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
  return new Date(date).toLocaleDateString("ru-RU", options).replace(", ", " ");
}

const Task = (props) => {
//  console.log(props.data);

  const {id, title, priority, dt_due, resp_name, status, overdue}=props.data;


  return (
  <div>


    <div className="task-list-item container p-3 my-3 border row  " onClick={()=>props.store.loadTaskEditorData(id)}>
      <div className={["task-list-item-title col-sm-12", overdue?"overdue":(status>1?"complete":"running")].join(' ')} > {title} </div>
      <div className="task-list-item-priority col-sm-4 ">Приоритет: {["низкий","средний","высокий"][priority]} </div>
      <div className="task-list-item-due col-sm-4 "> Срок: {formatDateTime(dt_due)} </div>
      <div className="task-list-item-status col-sm-4 ">Статус: {["к выполнению", "выполняется", "выполнена", "отменена"][status]} </div>
      <div className="task-list-item-resp col-sm-10 ">Ответственный: {resp_name} </div>
      <div className="col-sm-2 " style={{textAlign:'right'}}>
      </div>
    </div>
  </div>
  );
}

export default Task;

