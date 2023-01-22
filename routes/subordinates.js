import bde, {Router} from "express";
import {dbe} from "../dbHelpers.js";

const router = Router();

router.get("/subordinates/:id", async (request, response) => {
  try {
    const id = Number.parseInt(request.params.id);
    const data = await dbe.raw(
      "select id, cn, case when id=:id then 1 else 2 end o from users_ex where pid=:id or id=:id order by o,cn",
      {id});
    response.json(data.rows);
  } catch (error) {
    console.error(error.message);
  }
});

export default router;
