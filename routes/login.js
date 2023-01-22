import {Router} from "express";
import pool from "../db.js";
import {dbe} from "../dbHelpers.js";

const router = Router();

router.post("/login", async (request, response) => {
  try {
    const {username, password} = request.body;

    let result = {
      loggedIn: false, error: "", id: -1, logon: "", ln: "", fn: "", mn: "", cn: "",
    };
    const value = await dbe.raw("select check_pw(?, ?), id, ln, fn, mn from users where login=?",
      [username, password, username]);
    if (value.rowCount === 1) {
      const {
        check_pw: checkPw, id, ln, fn, mn,
      } = value.rows[0];

      let cn = ln;
      if (fn > "") {
        cn += ` ${fn}`;
      }
      if (mn > "") {
        cn += ` ${mn}`;
      }
      if (checkPw === true) {
        result = {
          loggedIn: true, error: "", id, logon: username, ln, fn, mn, cn,
        };
      } else {
        result.error = "password";
      }
    } else {
      result.error = "user";
    }
    response.json(result);
  } catch (error) {
    console.error(error.message);
  }
});

export default router;
