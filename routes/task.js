import {Router} from "express";
import {tasksEx} from "../dbHelpers.js";

const router = Router();

router.get("/task/:id", async (request, res) => {
  try {
    const id = Number.parseInt(request.params.id);
    const data = await tasksEx().where("id", id);
    res.json(data[0]);
  } catch (error) {
    res.json({error: true, errorMessage: error.message});
    console.error(error.message);
  }
});

export default router;
