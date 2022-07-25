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

// Nodes
// get all nodes for project
app.get('/nodes/:project_id', async(req, res) => {
    try {
        const { project_id } = req.params;
        const allNodes = await pool.query(
            'SELECT * FROM nodes WHERE project_id = $1', [project_id]
        );
        res.json(allNodes.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// save new node
app.post('/nodes/:project_id', async(req, res) => {
    try {
        const { project_id } = req.params;
        const { x, y, color, content } = req.body;
        const newNode = await pool.query(
            'INSERT INTO nodes (project_id, x_pos, y_pos, color, content) VALUES ($1, $2, $3, $4, $5) RETURNING node_id', [project_id, x, y, color, content]
        );
        res.json(newNode);
    } catch (err) {
        console.error(err.message);
    }
});

// update existing node
app.put('/nodes/:node_id', async(req, res) => {
    try {
        const { node_id } = req.params;
        const { x, y, color, content } = req.body;
        const updateNode = await pool.query(
            'UPDATE nodes SET x_pos = $2, y_pos = $3, color=$4, content = $5 WHERE node_id = $1', [node_id, x, y, color, content]
        );

        res.json(updateNode);
    } catch (err) {
        console.error(err.message);
    }
});

// delete node
app.delete('/nodes/:node_id', async(req, res) => {
    try {
        const { node_id } = req.params;
        const deleteNode = await pool.query(
            'DELETE FROM nodes WHERE node_id = $1', [node_id]
        );

        res.json(deleteNode);
    } catch (err) {
        console.error(err.message);
    }
});

// Edges
// get all edges for project
app.get('/edges/:project_id', async(req, res) => {
    try {
        const { project_id } = req.params;
        const allEdges = await pool.query(
            'SELECT * FROM edges WHERE project_id = $1', [project_id]
        );
        res.json(allEdges.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// save new edge
app.post('/edges/:project_id', async(req, res) => {
    try {
        const { project_id } = req.params;
        const { node1, node2, content } = req.body;
        const newEdge = await pool.query(
            'INSERT INTO edges (project_id, node_1, node_2, content) VALUES ($1, $2, $3, $4) RETURNING edge_id', [project_id, node1, node2, content]
        );
        res.json(newEdge);
    } catch (err) {
        console.error(err.message);
    }
});

// update existing edge
app.put('/edges/:edge_id', async(req, res) => {
    try {
        const { edge_id } = req.params;
        const { node1, node2, content } = req.body;
        const updateEdge = await pool.query(
            'UPDATE edges SET node_1 = $2, node_2 = $3, content = $4 WHERE edge_id = $1', [edge_id, node1, node2, content]
        );

        res.json(updateEdge);
    } catch (err) {
        console.error(err.message);
    }
});

// delete edge
app.delete('/edges/:edge_id', async(req, res) => {
    try {
        const { edge_id } = req.params;
        const deleteEdge = await pool.query(
            'DELETE FROM edges WHERE edge_id = $1', [edge_id]
        );

        res.json(deleteEdge);
    } catch (err) {
        console.error(err.message);
    }
});

// get edges where node_1 has node_id
app.get('/curredges/:node_id', async(req, res) => {
    try {
        const { node_id } = req.params;
        const Edges = await pool.query(
            'SELECT * FROM edges WHERE node_1 = $1', [node_id]
        );

        res.json(Edges.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});