//budget api
const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

// Add require for file system
const fs = require('fs');

app.use(cors());
// Load budget data from JSON file
const budget = JSON.parse(fs.readFileSync('budgetData.json', 'utf8'));



app.get("/hello", (req, res) => {
    res.send("Hello World");
});

app.use('/budget', (req, res) => {
    res.json(budget);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

