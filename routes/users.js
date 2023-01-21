import {Router} from "express";
import pool from "../db.js";

const router = Router();

// get all users
router.get("/users", async (request, response) => {
  try {
    const allUsers = await pool.query("select * from users");
    response.json(allUsers.rows);
  } catch (error) {
    console.error(error.message);
  }
});

export default router;
