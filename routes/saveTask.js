// noinspection ExceptionCaughtLocallyJS

import {Router} from "express";
import pool from "../db.js";
import {tasks, dbe, tasksEx, users} from "../dbHelpers.js";

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
      chk=await tasksEx().select({owner:"owner", respId:"resp_id", mgrId:"mgr_id"})
        .where({id:id});
      if (chk.length !== 1) {
        throw ("Task not found");
      }
      old = {
        owner: chk[0].owner,
        respId: chk[0].respId,
        mgrId: chk[0].mgrId,
      };

      if (owner !== user && respId !== user && old.mgrId !== user) {
        throw (`Permission to modify selected task denied: user isn't owner nor is responsible for the task
        ${owner} ${user} ${respId} ${old.mgrId}
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
    chk = await users().select("id")
      .where({id:user, pid:owner});

    if (chk.rowCount === 1) {
      throw "Permission to modify selected task denied: new responsible is not subordinate of the caller";
    }
    if (id === -1) {
      await tasks().insert({
        owner:owner,
        title:title,
        description:description,
        // eslint-disable-next-line camelcase
        dt_due:dueTo,
        priority:priority,
        status:status,
        // eslint-disable-next-line camelcase
        assigned_to:respId,
        // eslint-disable-next-line camelcase
        dt_modified:dbe.raw("now()"),
        // eslint-disable-next-line camelcase
        dt_created:dbe.raw("now()")});
    } else if (user !== owner && user !== old.mgrId) {
      // may only modify the status
      await tasks().update({
        status:status,
        // eslint-disable-next-line camelcase
        dt_modified:dbe.raw("now()")})
        .where({id:id});

    } else {
      // may modify all task attributes
      await tasks().update({
        owner:owner,
        title:title,
        description:description,
        // eslint-disable-next-line camelcase
        dt_due:dueTo,
        priority:priority,
        status:status,
        // eslint-disable-next-line camelcase
        assigned_to:respId,
        // eslint-disable-next-line camelcase
        dt_modified:dbe.raw("now()")})
        .where({id:id});

    }

    response.json({error: false});

  } catch (error) {
    console.error(error);
    response.json({error: true, message: error});
  }
});

export default router;
