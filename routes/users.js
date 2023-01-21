const router = require('express').Router();
const pool = require('../db');

// get all users
router.get('/users', async (req, res) => {
  try {
    const allUsers = await pool.query('select * from users');
    res.json(allUsers.rows);
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
