import {Router} from "express";
import pool from "../db.js";

const router = Router();

router.get("/task/:id", async (request, res) => {
  try {
    const { id } = request.params;
    const data = await pool.query("select * from tasks_ex where id=$1", [id]);
    res.json(data.rows[0]);
  } catch (error) {
    res.json({ error: true, errorMessage: error.message });
    console.error(error.message);
  }
});

export default router;
