import React from 'react';
import { observer } from "mobx-react";

const Test = observer(({msg}) => {
  return (
    <div>
      {JSON.stringify(msg.data)}
    </div>
  );
});

export default Test;