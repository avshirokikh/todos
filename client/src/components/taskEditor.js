import React from "react";
import {observer} from "mobx-react";

import cl from "./taskEditor.module.css";

function formatDateTimeInput (date) {
  if (!date) {
    return "";
  }
  const d = new Date(date);
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());

  return d.toISOString().slice(0, 16);
}

const TaskEditor = observer(({store}) => {
  if (!store) {
    return;
  }
  const { id, owner, title, description, dt_due: dtDue,
    resp_id: respId, priority, status}=store.taskEditorData;

  function setRespId (value){
    store.setTaskEditorDataRespId(value);
  }
  function setStatus (value){
    store.setTaskEditorDataStatus(value);
  }
  function setPriority (value){
    store.setTaskEditorDataPriority(value);
  }

  const rootClasses = [cl.myModal];
  if (store.taskEditorVisible) {
    rootClasses.push(cl.active);
  }


  const saveTask = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target.form);
    const items = {};
    for (let [name, value] of formData) {
      items[name] = value;
    }
    store.saveTask(items).then();
    store.setTaskEditorVisible(false);

  };

  return (
    <div className={rootClasses.join(" ")} role={"presentation"} onClick={() => store.setTaskEditorVisible(false)}>
      <div className={cl.myModalContent} role={"presentation"} onClick={(e) => e.stopPropagation()}>
        <form>
          <input type="hidden" name="id" defaultValue={id}/>
          <input type="hidden" name="owner" defaultValue={owner}/>
          <table>
            <tbody>
              <tr>
                <td colSpan="2"><h2>Редактор задачи</h2>
                  <hr/>
                </td>
              </tr>
              <tr>
                <td>Заголовок</td>
                <td><input type="text" name="title" defaultValue={title}/></td>
              </tr>
              <tr>
                <td>Описание</td>
                <td>
                  <textarea name="description" defaultValue={description}/>
                </td>
              </tr>
              <tr>
                <td>Дата окончания</td>
                <td><input type="datetime-local" name="due_to" defaultValue={formatDateTimeInput(dtDue)}/>
                </td>
              </tr>
              <tr>
                <td>Приоритет</td>
                <td>
                  <select id="priority" name="priority"
                    value={priority}
                    onChange={e => setPriority(e.target.value)}>
                    <option value="0" >низкий</option>
                    <option value="1" >средний</option>
                    <option value="2" >высокий</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>Статус</td>
                <td>
                  <select id="status" name="status"
                    value={status}
                    onChange={e => setStatus(e.target.value)}>
                    <option value="0" >к выполнению</option>
                    <option value="1" >выполняется</option>
                    <option value="2" >выполнена</option>
                    <option value="3" >отменена</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>Ответственный</td>
                <td>
                  <select id="resp_id" name="resp_id" value={respId}
                    onChange={e => setRespId(e.target.value)}>
                    {store.subordinates.map((item) => <option value={item.id}
                      key={item.id} >{item.cn}</option>)}
                  </select>
                </td>
              </tr>
              <tr>
                <td colSpan="2" align="right">
                  <button onClick={(e) => {
                    saveTask(e);
                  }}>сохранить
                  </button>
                  <button onClick={(e) => {
                    e.preventDefault();
                    store.setTaskEditorVisible(false);
                  }}>Отмена
                  </button>
                </td>
              </tr>

            </tbody>
          </table>
        </form>
      </div>
    </div>);
});

export default TaskEditor;