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
