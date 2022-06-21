const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// run server on port 3001 unless another port is specified
const PORT = process.env.PORT || 3001;

// allow our client to see our data
app.use(
    cors({
        origin: "http://localhost:3000",
        methods: "GET,PUT,POST,OPTIONS",
        credentials: true,
    })
);

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

app.get("/", (req, res) => {
    res.json([{
            text: "text1 ist viel zu lange daher wird das ersetzt...",
            date: "02.03.22",
            title: "Card 1",
            id: 1,
        },
        { text: "text2", date: "02.03.22", title: "Card 2: Projekt", id: 2 },
        { text: "text3", date: "02.03.22", title: "Card 3", id: 3 },
        { text: "text4", date: "02.04.22", title: "Card 4", id: 4 },
    ]);
});


app.use(express.json());

//ROUTES

//create a project

//insert in table projects via http post
//post: {"title": "title", "date": "2022-06-06", "description": "text"}
app.post("/projects", async (req, res) => {
    try {
        const { title, date, description } = req.body;
        const newProject = await pool.query(
            "INSERT INTO projects (title, date, description) VALUES ($1, $2, $3)",
            [title, date, description]
        );

        res.json(newProject);
    } catch (err) {
        console.error(err.message);
    }
})


//get all projects 
//get
app.get("/projects", async (req, res) => {
    try{
        const allProjects = await pool.query("SELECT * FROM projects");
        res.json(allProjects.rows)
    } catch (err) {
        console.error(err.message)
    }
})


//get the project with :id
//get
app.get("/projects/:id", async (req, res) => {
    try{
        const { id } = req.params
        const project = await pool.query("SELECT * FROM projects WHERE id = $1", 
        [id])

        res.json(project.rows[0])
    } catch (err) {
        console.error(err.message);
    }
})


//update the project with :id
//put:  {"title": "updated-title", "date": "2022-07-07", "description": "updated text"}
app.put("/projects/:id", async (req, res) => {
    try{
        const { id } = req.params;
        const { title, date, description } = req.body;
        const updateProject = await pool.query("UPDATE projects SET title = $2, date = $3, description = $4 WHERE id = $1", 
        [id, title, date, description])

        res.json(updateProject);
    } catch (err) {
        console.error(err.message);
    }
})


//delete the project with :id
//delete
app.delete("/projects/:id", async (req, res) => {
    try{
        const { id } = req.params;
        const deleteProject = await pool.query("DELETE FROM projects WHERE id = $1", 
        [id])

        res.json(deleteProject);
    } catch (err) {
        console.error(err.message);
    }
})