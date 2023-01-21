import {Router} from "express";
import pool from "../db.js";

const router = Router();
router.get("/all_tasks", async (request, response) => {
  try {
    const data = await pool.query("select * from tasks");
    response.json(data.rows);
  } catch (error) {
    console.error(error.message);
  }
});

export default router;
