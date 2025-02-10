const express = require("express");
const app = express();
const port = 3000;

const budget = { myBudget: [
    {
        title: "Eat out",
        budget: 50
    },
    {
        title: "Rent",
        budget: 1000
    },
    {
        title: "Grocery",
        budget: 500
    }
]
};

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

