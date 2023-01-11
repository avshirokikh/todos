import React, { useEffect, useState } from 'react';

import '../css/Task.css';

import TaskEditor from './TaskEditor';

function formatDateTimeInput(date)
{
  const d=new Date(date);
  d.setMinutes(d.getMinutes()-d.getTimezoneOffset());
  return d.toISOString().slice(0,16);
}

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
//  console.log(props);

  const [ TaskEditorVisible, setTaskEditorVisible ] = useState(false);

  const {title, priority, dt_due, resp_name, status, overdue}=props.data;

  let due_date=formatDateTimeInput(dt_due);//new Date(dt_due).toISOString().substring(0,16).replace('T', ' ');;//

  const saveTask = (e) => {
      e.preventDefault();
//      console.log(e);
      const formData=new FormData(e.target.form);
      const items={}
      for(let [name, value] of formData) {
        items[name]=value
      }
      console.log(JSON.stringify(items));
    }
  return (
  <div>

      <TaskEditor visible={TaskEditorVisible} setVisible={setTaskEditorVisible} >
        <form>
          <input type="hidden" name="id" defaultValue={props.data.id}/>
          <table>
            <tbody>
            <tr><td colSpan="2"><h2>Редактор задачи</h2><hr/></td></tr>
            <tr><td>Заголовок</td><td><input type="text" name="title" defaultValue={title}/></td></tr>
            <tr><td>Описание</td><td>
              <textarea name="description" defaultValue={props.data.description}  />
            </td></tr>
            <tr><td>Дата окончания </td><td><input type="datetime-local" name="due_to" defaultValue={formatDateTimeInput(dt_due)}/></td></tr>
            <tr><td>Приоритет</td><td>
                <select id="priority" name="priority" defaultValue={props.data.priority}>
                  <option value="0">низкий</option>
                  <option value="1">средний</option>
                  <option value="2">высокий</option>
                </select>
            </td></tr>
            <tr><td>Статус</td><td>
                <select name="status" defaultValue={props.data.status}>
                  <option value="0">к выполнению</option>
                  <option value="1">выполняется</option>
                  <option value="2">выполнена</option>
                  <option value="3">отменена</option>
                </select>
            </td></tr>
            <tr><td colSpan="2" align="right">
              <button onClick={(e)=>{saveTask(e)}}>сохранить</button>
              <button onClick={()=>setTaskEditorVisible(false)}>Отмена</button>
            </td></tr>
            
            </tbody>
          </table>
        </form>
      </TaskEditor>

    <div className="task-list-item container p-3 my-3 border row  " onClick={()=>setTaskEditorVisible(true)}>
      <div className={"task-list-item-title col-sm-12", overdue?"overdue":(status>1?"complete":"running")} > {title} </div>
      <div className="task-list-item-priority col-sm-4 ">Приоритет: {["низкий","средний","высокий"][priority]} </div>
      <div className="task-list-item-due col-sm-4 "> Срок: {formatDateTime(dt_due)} </div>
      <div className="task-list-item-status col-sm-4 ">Статус: {["к выполнению", "выполняется", "выполнена", "отменена"][status]} </div>
      <div className="task-list-item-resp col-sm-10 ">Ответственный: {resp_name} </div>
      <div className="col-sm-2 " style={{textAlign:'right'}}>
{/*        
<button onClick={()=>setTaskEditorVisible(true)} style={{border: '1px solid black',borderRadius: '5px'}}>
          Изменить
        </button>
*/}
      </div>
    </div>
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