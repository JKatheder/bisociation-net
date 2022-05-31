const express = require("express");
var cors = require('cors');

// run server on port 3001 unless another port is specified
const PORT = process.env.PORT || 3001;

const app = express();

// allow our client to see our data
app.use(cors({ origin: 'http://localhost:3000', methods: 'GET,PUT,POST,OPTIONS', credentials: true }));

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

app.get('/', (req, res) => {
    res.json({
        1: { text: "text1 ist viel zu lange daher wird das ersetzt...", date: "02.03.22", title: "Card 1", id: 1},
        2: { text: "text2", date: "02.03.22", title: "Card 2: Projekt", id: 2},
        3: { text: "text3", date: "02.03.22", title: "Card 3", id:3},
        4: { text: "text4", date: "02.04.22", title: "Card 4", id:4}
    })
});