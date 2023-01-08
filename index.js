const express = require("express")
const app = express()
const cors = require("cors")
const pool = require("./db")

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
        const { username, password } = req.body

        let result = { loggedIn: false, error: "", id: -1, logon: "", ln: "", fn: "", mn: "", cn: "" }
        let value = await pool.query("select check_pw($1, $2), id, ln, fn, mn from users where login=$1", [username, password])
        if (value.rowCount != 1)
            result.error = "user";
        else {
            const { check_pw, id, ln, fn, mn } = value.rows[0];

            let cn = ln;
            if (fn > "") cn += " " + fn;
            if (mn > "") cn += " " + mn;
            if (check_pw != true)
                result.error = "password";
            else
                result = { loggedIn: true, error: "", id: id, logon: username, ln: ln, fn: fn, mn: mn, cn: cn }
        }
        res.json(result)
    } catch (error) {
        console.error(error.message)
    }
})
// validate login
app.post("/chk_login", async (req, res) => {
    try {
        const { user, password } = req.body
        console.log(req.body)
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
        const { id } = req.params;
        const data = await pool.query("select * from tasks where id=$1", [id])
        res.json(data.rows[0])
    } catch (error) {
        console.error(error.message)
    }
})

app.get("/subordinates/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const data = await pool.query("select id, trim(replace(concat(ln,' ',fn,' ',mn), '  ', ' ')) fio from users where pid=$1", [id])
        res.json(data.rows)
    } catch (error) {
        console.error(error.message)
    }
})

app.get("/user_tasks/:view/:user", async (req, res) => {
    try {
        const { view, user } = req.params;
        let data;
        switch (view) {
            case "1":
                data = await pool.query(
                    "select * from tasks_ex a where (status<2 or dt_due>CURRENT_DATE) and resp_id=$1 order by cat, dt_due",
                    [user])
                res.json(data.rows)
                break
            case "2":
                data = await pool.query(
                    "select * from tasks_ex where (status<2 or dt_due>CURRENT_DATE) and mgr_id=$1 order by resp_name, dt_due",
                    [user])
                res.json(data.rows)
                console.log(view)
                res.json(req.params)
                break
            case "3":
                data = await pool.query(
                    "select * from tasks_ex where resp_id=$1 order by dt_modified",
                    [user])
                res.json(data.rows)
                break
        }
    } catch (error) {
        console.error(error.message)
    }
})

app.listen(5000, () => {
    console.log("server has started on port 5000")
})
