const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

// run server on port 3001 unless another port is specified
const PORT = process.env.PORT || 3001;

// allow our client to see our data
app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: 'GET,PUT,POST,DELETE,OPTIONS',
    })
);

app.use(express.json());

//ROUTES
// Project List

//returns title, description, generated id and generated date
//post: {"title": "title", "description": "text"}
app.post('/projects', async(req, res) => {
    try {
        const { title, description } = req.body;
        const newProject = await pool.query(
            'INSERT INTO projects (title, description) VALUES ($1, $2) RETURNING project_id, title, date, description', [title, description]
        );
        res.json(newProject);
    } catch (err) {
        console.error(err.message);
    }
});

//get all projects
//get
app.get('/projects', async(req, res) => {
    try {
        const allProjects = await pool.query('SELECT * FROM projects');
        res.json(allProjects.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//get the project with :id
//get
app.get('/projects/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const project = await pool.query(
            'SELECT * FROM projects WHERE project_id = $1', [id]
        );

        res.json(project.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//update the project with :id
//put:  {"title": "updated-title", "description": "updated text"}
app.put('/projects/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const updateProject = await pool.query(
            'UPDATE projects SET title = $2, description = $3 WHERE project_id = $1', [id, title, description]
        );

        res.json(updateProject);
    } catch (err) {
        console.error(err.message);
    }
});

//delete the project with :id
//delete
app.delete('/projects/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const deleteProject = await pool.query(
            'DELETE FROM projects WHERE project_id = $1', [id]
        );

        res.json(deleteProject);
    } catch (err) {
        console.error(err.message);
    }
});

// Project View

// Load project
app.get('/graphdata/:project_id', async(req, res) => {
    try {
        const { project_id } = req.params;
        const nodes = await pool.query(
            'SELECT * FROM nodes WHERE project_id = $1', [project_id]
        );
        const edges = await pool.query(
            'SELECT * FROM edges WHERE project_id = $1', [project_id]
        );
        res.json({ nodes: nodes.rows, edges: edges.rows });
    } catch (err) {
        console.error(err.message);
    }
});

app.put('/graphdata/:project_id', async(req, res) => {
    try {
        const { project_id } = req.params;
        const { data } = req.body;
        console.log(data);
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});