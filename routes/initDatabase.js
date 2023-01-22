import {Router} from "express";
import {dbe, tasks} from "../dbHelpers.js";

const router = Router();

function values (title, description, dtDueOffset, priority, status, owner, assignedTo){
  return {
    id: dbe.raw("DEFAULT"),
    title,
    description,
    // eslint-disable-next-line camelcase
    dt_due: dbe.raw(`NOW()${dtDueOffset}`),
    // eslint-disable-next-line camelcase
    dt_created: dbe.raw("DEFAULT"),
    // eslint-disable-next-line camelcase
    dt_modified: dbe.raw("DEFAULT"),
    priority,
    status,
    owner,
    // eslint-disable-next-line camelcase
    assigned_to:assignedTo
  };
}
function minutes (v){
  return`+interval '${v} minutes'`;
}
function days (v){
  return`+interval '${v} days'`;
}
function months (v){
  return`+interval '${v} month'`;
}
router.get("/initdb", async (request, response) => {
  await tasks().del();
  const
    // eslint-disable-next-line unicorn/prevent-abbreviations
    dir=1,
    zam1=2,
    zam2=3,
    usr11=4,
    usr12=5,
    usr21=6,
    usr22=7;
  await tasks().insert([
    values("Dir Task XXX", "Dir Task XXX", days(1), 2, 0, dir,  dir),
    values("Dir Task1", "Dir Task1", "", 2, 0, dir,  dir),
    values("Dir Task2", "Dir Task2", minutes(10), 2, 0, dir,  dir),
    values("Dir Task3", "Dir Task2", days(usr12), 2, 0, dir,  dir),
    values("Dir Task4", "Dir Task2", months(1), 2, 0, dir,  dir),
    values("Dir Zam 1 Task1", "Dir Zam 1 Task1", "", 2, 0, dir,  zam1),
    values("Dir Zam 1 Task2", "Dir Zam 1 Task2", minutes(2), 2, 0, dir,  zam1),
    values("Dir Zam 1 Task3", "Dir Zam 1 Task2", days(usr12), 2, 0, dir,  zam1),
    values("Dir Zam 1 Task4", "Dir Zam 1 Task2", months(1), 2, 0, dir,  zam1),
    values("Dir Zam 2 Task1", "Dir Zam 2 Task1", "", 2, 0, dir,  zam2),
    values("Dir Zam 2 Task2", "Dir Zam 2 Task2", minutes(2), 2, 0, dir,  zam2),
    values("Dir Zam 2 Task3", "Dir Zam 2 Task2", days(usr12), 2, 0, dir,  zam2),
    values("Dir Zam 2 Task4", "Dir Zam 2 Task2", months(1), 2, 0, dir,  zam2),

    values("Zam 1 Task1", "Zam 1 Task1", "", 2, 0, zam1,  zam1),
    values("Zam 1 Task2", "Zam 1 Task2", minutes(2), 2, 0, zam1,  zam1),
    values("Zam 1 Task3", "Zam 1 Task3", days(usr12), 2, 0, zam1,  zam1),
    values("Zam 1 Task4", "Zam 1 Task4", months(1), 2, 0, zam1,  zam1),

    values("User 1_1 Zam Task1", "User 1_1 Zam Task1", "", 2, 0, zam1,  usr11),
    values("User 1_1 Zam Task2", "User 1_1 Zam Task2", minutes(2), 2, 0, zam1,  usr11),
    values("User 1_1 Zam Task3", "User 1_1 Zam Task3", days(usr12), 2, 0, zam1,  usr11),
    values("User 1_1 Zam Task4", "User 1_1 Zam Task4", months(1), 2, 0, zam1,  usr11),
    values("User 1_2 Zam Task1", "User 1_2 Zam Task1", "", 2, 0, zam1,  usr12),
    values("User 1_2 Zam Task2", "User 1_2 Zam Task2", minutes(2), 2, 0, zam1,  usr12),
    values("User 1_2 Zam Task3", "User 1_2 Zam Task3", days(usr12), 2, 0, zam1,  usr12),
    values("User 1_2 Zam Task4", "User 1_2 Zam Task4", months(1), 2, 0, zam1,  usr12),

    values("Zam 2 Task1", "Zam 2 Task1", "", 2, 0, zam2,  zam2),
    values("Zam 2 Task2", "Zam 2 Task2", minutes(2), 2, 0, zam2,  zam2),
    values("Zam 2 Task3", "Zam 2 Task3", days(usr12), 2, 0, zam2,  zam2),
    values("Zam 2 Task4", "Zam 2 Task4", months(1), 2, 0, zam2,  zam2),

    values("User 2_1 Zam Task1", "User 2_1 Zam Task1", "", 2, 0, zam2,  usr21),
    values("User 2_1 Zam Task2", "User 2_1 Zam Task2", minutes(2), 2, 0, zam2,  usr21),
    values("User 2_1 Zam Task3", "User 2_1 Zam Task3", days(usr12), 2, 0, zam2,  usr21),
    values("User 2_1 Zam Task4", "User 2_1 Zam Task4", months(1), 2, 0, zam2,  usr21),
    values("User 2_2 Zam Task1", "User 2_2 Zam Task1", "", 2, 0, zam2,  usr22),
    values("User 2_2 Zam Task2", "User 2_2 Zam Task2", minutes(2), 2, 0, zam2,  usr22),
    values("User 2_2 Zam Task3", "User 2_2 Zam Task3", days(usr12), 2, 0, zam2,  usr22),
    values("User 2_2 Zam Task4", "User 2_2 Zam Task4", months(1), 2, 0, zam2,  usr22),

    values("User 1_1 Task1", "User 1_1 Task1", "", 2, 0, usr11,  usr11),
    values("User 1_1 Task2", "User 1_1 Task2", minutes(2), 2, 0, usr11,  usr11),
    values("User 1_1 Task3", "User 1_1 Task2", days(usr12), 2, 0, usr11,  usr11),
    values("User 1_1 Task4", "User 1_1 Task2", months(1), 2, 0, usr11,  usr11),

    values("User 1_2 Task1", "User 1_2 Task1", "", 2, 0, usr12,  usr12),
    values("User 1_2 Task2", "User 1_2 Task2", minutes(2), 2, 0, usr12,  usr12),
    values("User 1_2 Task3", "User 1_2 Task2", days(usr12), 2, 0, usr12,  usr12),
    values("User 1_2 Task4", "User 1_2 Task2", months(1), 2, 0, usr12,  usr12),

    values("User 2_1 Task1", "User 2_1 Task1", "", 2, 0, usr21,  usr21),
    values("User 2_1 Task2", "User 2_1 Task2", minutes(2), 2, 0, usr21,  usr21),
    values("User 2_1 Task3", "User 2_1 Task2", days(usr12), 2, 0, usr21,  usr21),
    values("User 2_1 Task4", "User 2_1 Task2", months(1), 2, 0, usr21,  usr21),

    values("User 2_2 Task1", "User 2_2 Task1", "", 2, 0, usr22,  usr22),
    values("User 2_2 Task2", "User 2_2 Task2", minutes(2), 2, 0, usr22,  usr22),
    values("User 2_2 Task3", "User 2_2 Task2", days(usr12), 2, 0, usr22,  usr22),
    values("User 2_2 Task4", "User 2_2 Task2", months(1), 2, 0, usr22,  usr22)
  ]);
  response.json({ ok: true });
});

export default router;
