const express = require("express");
// Add cors requirement
const cors = require("cors");
// Add mongoose requirement
const mongoose = require("mongoose");
const app = express();
const port = 3005;

// Enable CORS for all routes
app.use(cors());
// Add JSON parsing middleware
app.use(express.json());

// Add require for file system
const fs = require('fs');
// Load budget data from JSON file
const budget = JSON.parse(fs.readFileSync('budgetData.json', 'utf8'));

// MongoDB connection string - replace with your actual connection string
mongoose.connect('mongodb://localhost:27017/personal-budget', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB:', err));

// Create budget schema
const budgetSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    budget: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^#[0-9A-Fa-f]{6}$/.test(v);
            },
            message: props => `${props.value} is not a valid hex color! Must be in format #XXXXXX`
        }
    }
});

// Create budget model
const Budget = mongoose.model('Budget', budgetSchema);

app.use('/', express.static('public'));

app.get("/hello", (req, res) => {
    res.send("Hello World");
});

app.post("/budget", async (req, res) => {
    try {
        const newBudget = new Budget(req.body);
        console.log(newBudget);
        await newBudget.save();
        const budgets = await Budget.find({});
        res.json(budgets);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.use('/budget', async (req, res) => {
    try {
        const budgets = await Budget.find({});
        res.json(budgets);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

