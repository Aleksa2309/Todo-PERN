const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//ROUTES//

//create a todo

app.post("/todos", async (req, res) => {
    try {

        const { description } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO tasks (description) VALUES($1) RETURNING *",
            [description]
        );
        
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

//get all todos

app.get("/todos", async (req, res) => {
    try {
        const allTODOS = await pool.query("SELECT * FROM tasks");

        res.json(allTODOS.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//get a todo

app.get("/todos/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const todo = await pool.query("SELECT * FROM tasks WHERE task_id = $1", [id]);

        res.json(todo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

//update a todo

app.put("/todos/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const {description} = req.body;
        const updateTODO = await pool.query(
            "UPDATE tasks SET description = $1 WHERE task_id = $2",
            [description , id]);

        res.json("TODO was updated");
    } catch (error) {
        console.error(error.message);
    }
})

//delete a todo

app.delete("/todos/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const deleteTODO = await pool.query("DELETE FROM tasks WHERE task_id = $1", [id]);

        res.json("TODO was deleted");
    } catch (error) {
        console.error(error.message);
    }
})

app.listen(5432, () => {
    console.log("Server has started on port 5432");
})