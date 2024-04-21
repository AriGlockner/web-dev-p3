// server.js

const express = require('express');
const path = require('path');
const requestPlayerData = require('./requestPlayerData');

const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to fetch player stats
app.get('/getPlayerStats', (req, res) => {
    requestPlayerData.getPlayerStats((error, stats) => {
        if (error) {
            res.status(500).send('Error retrieving player stats');
        } else {
            res.json(stats);
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
