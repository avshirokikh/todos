import {Router} from "express";
import database from "../dbHelpers.js";

const router = Router();
router.get("/user_tasks/:view/:user", async (request, response) => {
  try {
    const { view, user } = request.params;
    let data = [];
    switch (view) {
    case "1": {
      await database.tasksEx()
        .where({ resp_id: user })
        .where(function () {
          this
            .whereRaw("dt_due>CURRENT_DATE")
            .orWhere("status", "<", 2);
        })
        .orderBy("resp_name", "asc")
        .orderBy("dt_due", "asc")
        .then((result) => {
          data = result; 
        });

      response.json(data);
      break;
    }
    case "2": {
      await database.tasksEx()
        .where({ mgr_id: user })
        .where(function () {
          this
            .whereRaw("dt_due>CURRENT_DATE")
            .orWhere("status", "<", 2);
        })
        .orderBy("resp_name", "asc")
        .orderBy("dt_due", "asc")
        .then((result) => {
          data = result; 
        })
        .catch((error) => {});

      response.json(data);
      break;
    }
    case "3": {
      await database.tasksEx()
        .where({ resp_id: user })
        .orderBy("dt_modified", "asc")
        .then((result) => {
          data = result; 
        })
        .catch((error) => {});

      response.json(data);
      break;
    }
    }
  } catch (error) {
    console.error(error.message);
  }
});

export default router;
