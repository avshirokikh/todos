const express = require('express');

const app = express();
const cors = require('cors');
const pool = require('./db');
const db = require('./dbHelpers');

// middleware
app.use(cors());
app.use(express.json());
app.use(
  require('./routes/root'),
  require('./routes/users'),
  require('./routes/login'),
  require('./routes/all_tasks'),
  require('./routes/task'),
  require('./routes/subordinates'),
  require('./routes/user_tasks'),
  require('./routes/initdb'),
  require('./routes/save_task'),
);

const port = process.env.PORT;
console.log(`Your port is ${port}`);

app.listen(port, () => {
  console.log(`server has started on port ${port}`);
});
