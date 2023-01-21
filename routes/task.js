const router = require('express').Router();
const pool = require('../db');

router.get('/task/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await pool.query('select * from tasks_ex where id=$1', [id]);
    res.json(data.rows[0]);
  } catch (error) {
    res.json({ error: true, errorMessage: error.message });
    console.error(error.message);
  }
});

module.exports = router;
