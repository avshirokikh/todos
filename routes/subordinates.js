const router = require('express').Router();
const pool = require('../db');

router.get('/subordinates/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const data = await pool.query('select id, cn, case when id=$1 then 1 else 2 end o from users_ex where pid=$1 or id=$1 order by o,cn', [id]);
    res.json(data.rows);
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
