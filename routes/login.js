import {Router} from "express";
import pool from "../db.js";

const router = Router();

router.post("/login", async (request, response) => {
  try {
    const { username, password } = request.body;

    let result = {
      loggedIn: false, error: "", id: -1, logon: "", ln: "", fn: "", mn: "", cn: "",
    };
    const value = await pool.query("select check_pw($1, $2), id, ln, fn, mn from users where login=$1", [username, password]);
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
