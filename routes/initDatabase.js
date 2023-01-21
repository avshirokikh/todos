import {Router} from "express";
import pool from "../db.js";

const router = Router();

router.get("/initdb", async (request, response) => {
  await pool.query("delete from tasks");
  await pool.query(`
INSERT INTO public.tasks 
(id, title, description, dt_due, dt_created, dt_modified, priority, status, owner, assigned_to) VALUES 
(DEFAULT, 'Dir Task1', 'Dir Task1', NOW(),                      DEFAULT, DEFAULT, 2, 0, 1, 1),
(DEFAULT, 'Dir Task2', 'Dir Task2', NOW()+interval '2 minutes', DEFAULT, DEFAULT, 2, 0, 1, 1),
(DEFAULT, 'Dir Task3', 'Dir Task2', NOW()+interval '5 days',    DEFAULT, DEFAULT, 2, 0, 1, 1),
(DEFAULT, 'Dir Task4', 'Dir Task2', NOW()+interval '1 month',   DEFAULT, DEFAULT, 2, 0, 1, 1),
(DEFAULT, 'Dir Zam 1 Task1', 'Dir Zam 1 Task1', NOW(),                      DEFAULT, DEFAULT, 2, 0, 1, 2),
(DEFAULT, 'Dir Zam 1 Task2', 'Dir Zam 1 Task2', NOW()+interval '2 minutes', DEFAULT, DEFAULT, 2, 0, 1, 2),
(DEFAULT, 'Dir Zam 1 Task3', 'Dir Zam 1 Task2', NOW()+interval '5 days',    DEFAULT, DEFAULT, 2, 0, 1, 2),
(DEFAULT, 'Dir Zam 1 Task4', 'Dir Zam 1 Task2', NOW()+interval '1 month',   DEFAULT, DEFAULT, 2, 0, 1, 2),
(DEFAULT, 'Dir Zam 2 Task1', 'Dir Zam 2 Task1', NOW(),                      DEFAULT, DEFAULT, 2, 0, 1, 3),
(DEFAULT, 'Dir Zam 2 Task2', 'Dir Zam 2 Task2', NOW()+interval '2 minutes', DEFAULT, DEFAULT, 2, 0, 1, 3),
(DEFAULT, 'Dir Zam 2 Task3', 'Dir Zam 2 Task2', NOW()+interval '5 days',    DEFAULT, DEFAULT, 2, 0, 1, 3),
(DEFAULT, 'Dir Zam 2 Task4', 'Dir Zam 2 Task2', NOW()+interval '1 month',   DEFAULT, DEFAULT, 2, 0, 1, 3),

(DEFAULT, 'Zam 1 Task1', 'Zam 1 Task1', NOW(),                      DEFAULT, DEFAULT, 2, 0, 2, 2),
(DEFAULT, 'Zam 1 Task2', 'Zam 1 Task2', NOW()+interval '2 minutes', DEFAULT, DEFAULT, 2, 0, 2, 2),
(DEFAULT, 'Zam 1 Task3', 'Zam 1 Task3', NOW()+interval '5 days',    DEFAULT, DEFAULT, 2, 0, 2, 2),
(DEFAULT, 'Zam 1 Task4', 'Zam 1 Task4', NOW()+interval '1 month',   DEFAULT, DEFAULT, 2, 0, 2, 2),

(DEFAULT, 'User 1_1 Zam Task1', 'User 1_1 Zam Task1', NOW(),                       DEFAULT, DEFAULT, 2, 0, 2, 4),
(DEFAULT, 'User 1_1 Zam Task2', 'User 1_1 Zam Task2', NOW()+interval '2 minutes',  DEFAULT, DEFAULT, 2, 0, 2, 4),
(DEFAULT, 'User 1_1 Zam Task3', 'User 1_1 Zam Task3', NOW()+interval '5 days',     DEFAULT, DEFAULT, 2, 0, 2, 4),
(DEFAULT, 'User 1_1 Zam Task4', 'User 1_1 Zam Task4', NOW()+interval '1 month',    DEFAULT, DEFAULT, 2, 0, 2, 4),
(DEFAULT, 'User 1_2 Zam Task1', 'User 1_2 Zam Task1', NOW(),                       DEFAULT, DEFAULT, 2, 0, 2, 5),
(DEFAULT, 'User 1_2 Zam Task2', 'User 1_2 Zam Task2', NOW()+interval '2 minutes',  DEFAULT, DEFAULT, 2, 0, 2, 5),
(DEFAULT, 'User 1_2 Zam Task3', 'User 1_2 Zam Task3', NOW()+interval '5 days',     DEFAULT, DEFAULT, 2, 0, 2, 5),
(DEFAULT, 'User 1_2 Zam Task4', 'User 1_2 Zam Task4', NOW()+interval '1 month',    DEFAULT, DEFAULT, 2, 0, 2, 5),

(DEFAULT, 'Zam 2 Task1', 'Zam 2 Task1', NOW(),                      DEFAULT, DEFAULT, 2, 0, 3, 3),
(DEFAULT, 'Zam 2 Task2', 'Zam 2 Task2', NOW()+interval '2 minutes', DEFAULT, DEFAULT, 2, 0, 3, 3),
(DEFAULT, 'Zam 2 Task3', 'Zam 2 Task3', NOW()+interval '5 days',    DEFAULT, DEFAULT, 2, 0, 3, 3),
(DEFAULT, 'Zam 2 Task4', 'Zam 2 Task4', NOW()+interval '1 month',   DEFAULT, DEFAULT, 2, 0, 3, 3),

(DEFAULT, 'User 2_1 Zam Task1', 'User 2_1 Zam Task1', NOW(),                      DEFAULT, DEFAULT, 2, 0, 3, 6),
(DEFAULT, 'User 2_1 Zam Task2', 'User 2_1 Zam Task2', NOW()+interval '2 minutes', DEFAULT, DEFAULT, 2, 0, 3, 6),
(DEFAULT, 'User 2_1 Zam Task3', 'User 2_1 Zam Task3', NOW()+interval '5 days',    DEFAULT, DEFAULT, 2, 0, 3, 6),
(DEFAULT, 'User 2_1 Zam Task4', 'User 2_1 Zam Task4', NOW()+interval '1 month',   DEFAULT, DEFAULT, 2, 0, 3, 6),
(DEFAULT, 'User 2_2 Zam Task1', 'User 2_2 Zam Task1', NOW(),                      DEFAULT, DEFAULT, 2, 0, 3, 7),
(DEFAULT, 'User 2_2 Zam Task2', 'User 2_2 Zam Task2', NOW()+interval '2 minutes', DEFAULT, DEFAULT, 2, 0, 3, 7),
(DEFAULT, 'User 2_2 Zam Task3', 'User 2_2 Zam Task3', NOW()+interval '5 days',    DEFAULT, DEFAULT, 2, 0, 3, 7),
(DEFAULT, 'User 2_2 Zam Task4', 'User 2_2 Zam Task4', NOW()+interval '1 month',   DEFAULT, DEFAULT, 2, 0, 3, 7),

(DEFAULT, 'User 1_1 Task1', 'User 1_1 Task1', NOW(),                      DEFAULT, DEFAULT, 2, 0, 4, 4),
(DEFAULT, 'User 1_1 Task2', 'User 1_1 Task2', NOW()+interval '2 minutes', DEFAULT, DEFAULT, 2, 0, 4, 4),
(DEFAULT, 'User 1_1 Task3', 'User 1_1 Task2', NOW()+interval '5 days',    DEFAULT, DEFAULT, 2, 0, 4, 4),
(DEFAULT, 'User 1_1 Task4', 'User 1_1 Task2', NOW()+interval '1 month',   DEFAULT, DEFAULT, 2, 0, 4, 4),
                              
(DEFAULT, 'User 1_2 Task1', 'User 1_2 Task1', NOW(),                      DEFAULT, DEFAULT, 2, 0, 5, 5),
(DEFAULT, 'User 1_2 Task2', 'User 1_2 Task2', NOW()+interval '2 minutes', DEFAULT, DEFAULT, 2, 0, 5, 5),
(DEFAULT, 'User 1_2 Task3', 'User 1_2 Task2', NOW()+interval '5 days',    DEFAULT, DEFAULT, 2, 0, 5, 5),
(DEFAULT, 'User 1_2 Task4', 'User 1_2 Task2', NOW()+interval '1 month',   DEFAULT, DEFAULT, 2, 0, 5, 5),
                                                                          
(DEFAULT, 'User 2_1 Task1', 'User 2_1 Task1', NOW(),                      DEFAULT, DEFAULT, 2, 0, 6, 6),
(DEFAULT, 'User 2_1 Task2', 'User 2_1 Task2', NOW()+interval '2 minutes', DEFAULT, DEFAULT, 2, 0, 6, 6),
(DEFAULT, 'User 2_1 Task3', 'User 2_1 Task2', NOW()+interval '5 days',    DEFAULT, DEFAULT, 2, 0, 6, 6),
(DEFAULT, 'User 2_1 Task4', 'User 2_1 Task2', NOW()+interval '1 month',   DEFAULT, DEFAULT, 2, 0, 6, 6),
                                                                          
(DEFAULT, 'User 2_2 Task1', 'User 2_2 Task1', NOW(),                      DEFAULT, DEFAULT, 2, 0, 7, 7),
(DEFAULT, 'User 2_2 Task2', 'User 2_2 Task2', NOW()+interval '2 minutes', DEFAULT, DEFAULT, 2, 0, 7, 7),
(DEFAULT, 'User 2_2 Task3', 'User 2_2 Task2', NOW()+interval '5 days',    DEFAULT, DEFAULT, 2, 0, 7, 7),
(DEFAULT, 'User 2_2 Task4', 'User 2_2 Task2', NOW()+interval '1 month',   DEFAULT, DEFAULT, 2, 0, 7, 7);
`);
  response.json({ ok: true });
});

export default router;
