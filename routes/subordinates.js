import {Router} from "express";
import pool from "../db.js";

const router = Router();

router.get("/subordinates/:id", async (request, res) => {
  try {
    const { id } = request.params;

    const data = await pool.query("select id, cn, case when id=$1 then 1 else 2 end o from users_ex where pid=$1 or id=$1 order by o,cn", [id]);
    res.json(data.rows);
  } catch (error) {
    console.error(error.message);
  }
});

export default router;
