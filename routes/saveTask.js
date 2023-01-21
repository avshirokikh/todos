// noinspection ExceptionCaughtLocallyJS

import {Router} from "express";
import pool from "../db.js";

const router = Router();
router.post("/save-task/:user", async (request, response) => {
  let old;
  let chk;
  try {
    const user=Number.parseInt(request.params["user"]);
    let {
      id, owner, title, description, due_to: dueTo, priority, status, resp_id: respId,
    } = request.body;

    id = Number.parseInt(id);
    owner = Number.parseInt(owner);
    priority = Number.parseInt(priority);
    status = Number.parseInt(status);
    respId = Number.parseInt(respId);


    if (id !== -1) {
      chk = await pool.query("select owner, resp_id respId, mgr_id mgrId from tasks_ex where id=$1", [id]);
      old = {
        owner: chk.rows[0].owner,
        respId: chk.rows[0].respId,
        mgrId: chk.rows[0].mgrId,
      };
      if (chk.rowCount !== 1) {
        throw ("Task not found");
      }

      if (owner !== user && respId !== user && old.mgrId !== user) {
        throw (`Permission to modify selected task denied: user isn't owner nor is responsible for the task
        typeof(user)
        `);
      }

      if (owner !== user) {
        // ignore the change of responsible user
        respId = old.respId;
      }

      if (old.owner !== owner) {
        throw "Permission to modify selected task denied: changing task owner is not supported ";
      }

      if (old.owner !== user && old.mgrId !== user && old.respId !== user) {
        throw "Permission to modify selected task denied: user isn't owner nor responsible for the task";
      }
    }
    chk = await pool.query("select id from users where id=$1 or pid=$2", [user, owner]);
    if (chk.rowCount === 1) {
      throw "Permission to modify selected task denied: new responsible is not subordinate of the caller";
    }
    if (id === -1) {
      await pool.query(
        "insert into tasks" +
                "(owner, title, description, dt_due, priority, status, assigned_to, dt_modified, dt_created)" +
                "values ($1,$2,$3,$4,$5,$6,$7,NOW(),NOW())",
        [owner, title, description, dueTo, priority, status, respId],
      );
    } else if (user !== owner && user !== old.mgrId) {
      // may only modify the status
      await pool.query("update tasks set status=$2, dt_modified=NOW() where id=$1", [id, status]);
    } else {
      // may modify all task attributes
      await pool.query(
        "update tasks set owner=$2, title=$3, description=$4, dt_due=$5, priority=$6, status=$7, assigned_to=$8, " +
                "dt_modified=NOW() where id=$1",
        [id, owner, title, description, dueTo, priority, status, respId],
      );
    }

    response.json({error: false});

  } catch (error) {
    console.error(error);
    response.json({error: true, message: error});
  }
});

export default router;
