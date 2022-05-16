const express = require("express");

// run server on port 3001 unless another port is specified
const PORT = process.env.PORT || 3001;

const app = express();

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});