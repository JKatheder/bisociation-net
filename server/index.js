const express = require("express");

// run server on port 3001 unless another port is specified
const PORT = process.env.PORT || 3001;

const app = express();

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

app.get('/', (req, res) => {
    res.send("[{text:\"text1 ist viel zu lange daher wird das ersetzt...\", date:\"02.03.22\", title:\"Card 1\"}," +
        "{text:\"text2\", date:\"02.03.22\", title:\"Card 2: Projekt\"}," +
        "{text:\"text3\",date: \"02.03.22\",title:\"Card 3\"}," +
        "{text:\"text4\" date:\"02.04.22\" title:\"Card 4\"}]")
});