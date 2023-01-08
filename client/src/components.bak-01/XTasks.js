import React from 'react';
import { observer } from 'mobx-react';

import Task from './Task';

const XTasks = observer(({store}) => {
  if (store==null) return;
  if (store.tasks==null) return;
  return (
    <div>
      <h2>{title}</h2>
      {
        store.tasks.map((item)=><Task data={item} key={item.id}/>)
      }
    </div>
  );
})

export default XTasks;
