const express = require('express');
const app = express();
const cors = require("cors");
const pool = require("./db");

// run server on port 3001 unless another port is specified
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

app.use(cors());
app.use(express.json());


//ROUTES

//create a project

//insert in table projects via http post
//http post: {"id": 2, "title": "title2", "date": "2022-06-06", "description": "text"}
app.post("/", async (req, res) => {
    try {
        const { id, title, date, description } = req.body;
        const newProject = await pool.query(
            "INSERT INTO projects (id, title, date, description) VALUES ($1, $2, $3, $4)",
            [id, title, date, description]
        );

        res.json(newProject);
    } catch (err) {
        console.error(err.message);
    }
})