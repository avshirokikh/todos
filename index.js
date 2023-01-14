require('dotenv').config();
const express = require("express")
const app = express()
const cors = require("cors")
const pool = require("./db")
const knex = require('knex');
const db = require('./dbHelpers')

//middleware
app.use(cors())
app.use(express.json())

// ROUTES
// get all users
app.get("/users", async (req, res) => {
    try {
        const allUsers = await pool.query("select * from users")
        res.json(allUsers.rows)
    } catch (error) {
        console.error(error.message)
    }
})

app.post("/login", async (req, res) => {
    try {
        const {username, password} = req.body

        let result = {loggedIn: false, error: "", id: -1, logon: "", ln: "", fn: "", mn: "", cn: ""}
        let value = await pool.query("select check_pw($1, $2), id, ln, fn, mn from users where login=$1", [username, password])
        if (value.rowCount != 1)
            result.error = "user";
        else {
            const {check_pw, id, ln, fn, mn} = value.rows[0];

            let cn = ln;
            if (fn > "") cn += " " + fn;
            if (mn > "") cn += " " + mn;
            if (check_pw != true)
                result.error = "password";
            else
                result = {loggedIn: true, error: "", id: id, logon: username, ln: ln, fn: fn, mn: mn, cn: cn}
        }
        res.json(result)
    } catch (error) {
        console.error(error.message)
    }
})
// validate login
app.post("/chk_login", async (req, res) => {
    try {
        const {user, password} = req.body
        //console.log(req.body)
        //        console.log(password)
        const value = await pool.query("select check_pw($1, $2)", [user, password])

        res.json(value.rows)
    } catch (error) {
        console.error(error.message)
    }
})

app.get("/all_tasks", async (req, res) => {
    try {
        const data = await pool.query("select * from tasks")
        res.json(data.rows)
    } catch (error) {
        console.error(error.message)
    }
})


app.get("/task/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const data = await pool.query("select * from tasks_ex where id=$1", [id])
        res.json(data.rows[0])
    } catch (error) {
        res.json({error: true, errorMessage: error.message})
        console.error(error.message)
    }
})

app.get("/subordinates/:id", async (req, res) => {
    try {
        const {id} = req.params;

        const data = await pool.query("select id, cn, case when id=$1 then 1 else 2 end o from users_ex where pid=$1 or id=$1 order by o,cn", [id])
        res.json(data.rows)
    } catch (error) {
        console.error(error.message)
    }
})

app.get("/user_tasks/:view/:user", async (req, res) => {
    try {
        const {view, user} = req.params;
        let data=[];
        switch (view) {
            case "1":
                console.log(db.tasks_ex()
                    .where({resp_id:user})
                    .where(function(){this
                          .whereRaw('dt_due<CURRENT_DATE')
                          .orWhere('status','<',2)})
                    .orderBy('resp_name','asc').orderBy('dt_due','asc').toSQL().toNative());
                await db.tasks_ex()
                    .where({resp_id:user})
                    .where(function(){this
                          .whereRaw('dt_due>CURRENT_DATE')
                          .orWhere('status','<',2)})
                    .orderBy('resp_name','asc').orderBy('dt_due','asc')
                    .then(result=>{data=result})  
//                    .catch(error=>{data=[]});

                res.json(data)
                break
            case "2":
/*
                data = await pool.query(
                    "select * from tasks_ex where (status<2 or dt_due>CURRENT_DATE) and mgr_id=$1 order by resp_name, dt_due",
                    [user])
                res.json(data.rows)
*/
                await db.tasks_ex()
                    .where({mgr_id:user})
                    .where(function(){this
                          .whereRaw('dt_due>CURRENT_DATE')
                          .orWhere('status','<',2)})
                    .orderBy('resp_name','asc').orderBy('dt_due','asc')
                    .then(result=>{data=result})  
                    .catch(error=>{z=[]});

                res.json(data)
                break
            case "3":
/*
                data = await pool.query(
                    "select * from tasks_ex where resp_id=$1 order by dt_modified",
                    [user])
                res.json(data.rows)
*/
                await db.tasks_ex()
                    .where({resp_id:user})
                    .orderBy('dt_modified','asc')
                    .then(result=>{data=result})  
                    .catch(error=>{z=[]});

                res.json(data)
                break
        }
    } catch (error) {
        console.error(error.message)
    }
})

app.get("/initdb", async (req, res) => {

    await pool.query("delete from tasks");
    await pool.query(`
INSERT INTO public.tasks (id, title, description, dt_due, dt_created, dt_modified, priority, status, owner, assigned_to) VALUES 
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
    res.json({ok: true});

})
app.post("/save-task/:user", async (req, res) => {
    try {
        const {user} = req.params;
        let {id, owner, title, description, due_to, priority, status, resp_id} = req.body

        let chk;

        if (id != -1) {
            chk = await pool.query("select owner, resp_id, mgr_id from tasks_ex where id=$1", [id])
            old = chk.rows[0];

            if (chk.rowCount != 1) {
                throw("Task not found")
            }

            if (owner != user && resp_id != user && old.mgr_id != user) {
                throw("Permission to modify selected task denied: user isn't owner nor is responsible for the task");
            }

            if (owner != user) {
                // ignore the change of responsible user
                resp_id = old.resp_id
            }

            if (old.owner != owner) {
                throw "Permission to modify selected task denied: changing task owner is not supported";
            }

            if (old.owner != user && old.mgr_id != user && old.resp_id != user) {
                throw "Permission to modify selected task denied: user isn't ownwer nor responsible for the task"
            }
        }
        chk = await pool.query("select id from users where id=$1 or pid=$2", [user, owner])
        if (chk.rowCount == 1) {
            throw "Permission to modify selected task denied: new responsible is not subordinate of the caller"
        }
        if (id == -1) {
            await pool.query("insert into tasks (owner, title, description, dt_due, priority, status, assigned_to, dt_modified, dt_created) values ($1,$2,$3,$4,$5,$6,$7,NOW(),NOW())",
                [owner, title, description, due_to, priority, status, resp_id])
        } else if (user != owner && user != old.mgr_id) {
            // may only modify the status
            await pool.query("update tasks set status=$2, dt_modified=NOW() where id=$1", [id, status])
        } else {
            // may modify all task attributes
            await pool.query("update tasks set owner=$2, title=$3, description=$4, dt_due=$5, priority=$6, status=$7, assigned_to=$8, dt_modified=NOW() where id=$1",
                [id, owner, title, description, due_to, priority, status, resp_id])
        }

        res.json({error: false})
        return;
    } catch (err) {
        console.error(err)
        res.json({error: true, message: err})
    }
})

const port = process.env.PORT;
console.log(`Your port is ${port}`);


app.listen(port, () => {
    console.log(`server has started on port ${port}`)
})
