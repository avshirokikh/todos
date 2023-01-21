const router = require('express').Router();
const pool = require('../db');
const db = require('../dbHelpers');

router.get('/user_tasks/:view/:user', async (req, res) => {
  try {
    const { view, user } = req.params;
    let data = [];
    switch (view) {
      case '1':
        await db.tasksEx()
          .where({ resp_id: user })
          .where(function () {
            this
              .whereRaw('dt_due>CURRENT_DATE')
              .orWhere('status', '<', 2);
          })
          .orderBy('resp_name', 'asc')
          .orderBy('dt_due', 'asc')
          .then((result) => { data = result; });
        //                    .catch(error=>{data=[]});

        res.json(data);
        break;
      case '2':
        await db.tasksEx()
          .where({ mgr_id: user })
          .where(function () {
            this
              .whereRaw('dt_due>CURRENT_DATE')
              .orWhere('status', '<', 2);
          })
          .orderBy('resp_name', 'asc')
          .orderBy('dt_due', 'asc')
          .then((result) => { data = result; })
          .catch((error) => { z = []; });

        res.json(data);
        break;
      case '3':
        await db.tasksEx()
          .where({ resp_id: user })
          .orderBy('dt_modified', 'asc')
          .then((result) => { data = result; })
          .catch((error) => { z = []; });

        res.json(data);
        break;
    }
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
