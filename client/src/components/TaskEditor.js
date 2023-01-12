import React from 'react';
import { observer } from 'mobx-react';

import cl  from './TaskEditor.module.css';

const TaskEditor = observer(({store}) => {
  if (!store)
    return;
  const data=store.taskEditorData;

  const {title, priority, dt_due, resp_name, status, overdue}=data;
    
  const подчиненые=store.подчиненные;
  let due_date=formatDateTimeInput(dt_due);


  const rootClasses = [cl.myModal];
  if(store.taskEditorVisible)
    rootClasses.push(cl.active);

  function formatDateTimeInput(date)
  {
    if(!date)
      return "";
    const d=new Date(date);
    d.setMinutes(d.getMinutes()-d.getTimezoneOffset());
    return d.toISOString().slice(0,16);
  }

  const saveTask = (e) => {
      e.preventDefault();
      const formData=new FormData(e.target.form);
      const items={}
      for(let [name, value] of formData) {
        items[name]=value
      }
      store.saveTask(items);
      store.setTaskEditorVisible(false);
      
    }

  return (
    <div className={rootClasses.join(' ')} onClick={()=>store.setTaskEditorVisible(false)}>
      <div className={cl.myModalContent} onClick={(e)=>e.stopPropagation()}>
        <form>
          <input type="hidden" name="id" defaultValue={data.id}/>
          <input type="hidden" name="owner" defaultValue={data.owner}/>
          <table>
            <tbody>
            <tr><td colSpan="2"><h2>Редактор задачи</h2><hr/></td></tr>
            <tr><td>Заголовок</td><td><input type="text" name="title" defaultValue={title}/></td></tr>
            <tr><td>Описание</td><td>
              <textarea name="description" defaultValue={data.description}  />
            </td></tr>
            <tr><td>Дата окончания </td><td><input type="datetime-local" name="due_to" defaultValue={formatDateTimeInput(dt_due)}/></td></tr>
            <tr><td>Приоритет</td><td>
                <select id="priority" name="priority" defaultValue={data.priority}>
                  <option value="0">низкий</option>
                  <option value="1">средний</option>
                  <option value="2">высокий</option>
                </select>
            </td></tr>
            <tr><td>Статус</td><td>
                <select name="status" defaultValue={data.status}>
                  <option value="0">к выполнению</option>
                  <option value="1">выполняется</option>
                  <option value="2">выполнена</option>
                  <option value="3">отменена</option>
                </select>
            </td></tr>
            <tr><td>Ответственныей</td><td>
                <select name="resp_id" defaultValue={data.resp_id}>
                  {
                    store.подчиненные.map((item)=><option value={item.id} key={item.id} >{item.cn}</option>)
                  }
                </select>
            </td></tr>
            <tr><td colSpan="2" align="right">
              <button onClick={(e)=>{saveTask(e)}}>сохранить</button>
              <button onClick={(e)=>{e.preventDefault(); store.setTaskEditorVisible(false);}}>Отмена</button>
            </td></tr>
            
            </tbody>
          </table>
        </form>
      </div>
    </div>    
  );
});

export default TaskEditor;