import React from "react";

import "../css/Task.css";

function formatDateTime (date) {
  const options = {
    year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric",
  };

  return new Date(date).toLocaleDateString("ru-RU", options)
    .replace(", ", " ");
}

const Task = (props) => {

  const {id, title, priority, dt_due: dtDue, resp_name: respName, status, overdue} = props.data;

  return (
    <div>
      <div role={"presentation"}
        className="task-list-item container p-3 my-3 border row  "
        onClick={() => props.store.loadTaskEditorData(id)}>
        <div role={"presentation"}
          className={["task-list-item-title col-sm-12",
            overdue ? "overdue" : (status > 1 ? "complete" : "running")].join(" ")}> {title} </div>
        <div role={"presentation"}
          className="task-list-item-priority col-sm-4 ">Приоритет: {["низкий", "средний", "высокий"][priority]} </div>
        <div className="task-list-item-due col-sm-4 "> Срок: {formatDateTime(dtDue)} </div>
        <div
          className="task-list-item-status col-sm-4 ">
          Статус: {["к выполнению", "выполняется", "выполнена", "отменена"][status]}
        </div>
        <div className="task-list-item-resp col-sm-10 ">Ответственный: {respName} </div>
      </div>
    </div>);
};

export default Task;

