const router = require('express').Router();
const pool = require('../db');

// get all users

// validate login
// validate login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    let result = {
      loggedIn: false, error: '', id: -1, logon: '', ln: '', fn: '', mn: '', cn: '',
    };
    const value = await pool.query('select check_pw($1, $2), id, ln, fn, mn from users where login=$1', [username, password]);
    if (value.rowCount !== 1) result.error = 'user';
    else {
      const {
        check_pw: checkPw, id, ln, fn, mn,
      } = value.rows[0];

      let cn = ln;
      if (fn > '') cn += ` ${fn}`;
      if (mn > '') cn += ` ${mn}`;
      if (checkPw !== true) result.error = 'password';
      else {
        result = {
          loggedIn: true, error: '', id, logon: username, ln, fn, mn, cn,
        };
      }
    }
    res.json(result);
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
