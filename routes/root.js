import {Router} from "express";

const router = Router();
// get all users
router.get("/", async (request, response) => {
  try {
    response.send("<a href='/users'>users</a><br/><a href='/task/1'>task 1</a><br/><a href='/all_tasks'>all tasks</a><br/>");
  } catch (error) {
    console.error(error.message);
  }
});

export default router;
