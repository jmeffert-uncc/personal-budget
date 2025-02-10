const express = require("express");
const app = express();
const port = 3000;

// Add require for file system
const fs = require('fs');
// Load budget data from JSON file
const budget = JSON.parse(fs.readFileSync('budgetData.json', 'utf8'));

app.use('/', express.static('public'));

app.get("/hello", (req, res) => {
    res.send("Hello World");
});

app.use('/budget', (req, res) => {
    res.json(budget);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

