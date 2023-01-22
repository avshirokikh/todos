import {Router} from "express";
import pool from "../db.js";
import {tasks} from "../dbHelpers.js";

const router = Router();

router.get("/all_tasks", async (request, response) => {
  try {
    response.json(await tasks());
  } catch (error) {
    console.error(error.message);
  }
});

export default router;
