const router = require('express').Router();
const pool = require('../db');

router.get('/all_tasks', async (req, res) => {
  try {
    const data = await pool.query('select * from tasks');
    res.json(data.rows);
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
