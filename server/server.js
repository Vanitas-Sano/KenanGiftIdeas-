const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Get all gifts
app.get('/api/gifts', (req, res) => {
    const sql = "SELECT * FROM gifts";
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        });
    });
});

// Add a new gift
app.post('/api/gifts', (req, res) => {
    const { name, description, link, image_url, price, category } = req.body;
    const sql = "INSERT INTO gifts (name, description, link, image_url, price, category) VALUES (?,?,?,?,?,?)";
    const params = [name, description, link, image_url, price, category];
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.status(201).json({
            "message": "success",
            "data": { id: this.lastID, ...req.body }
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
