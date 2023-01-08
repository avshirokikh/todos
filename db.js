const Pool=require("pg").Pool
const pool=new Pool({
    user:"taskmgr",
    password:"taskmgr",
    host:"localhost",
    port:5432,
    database:"taskmgr"
})
module.exports = pool;