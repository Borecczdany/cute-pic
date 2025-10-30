const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON bodies
app.use(express.json());

// Endpoint to save username + IP
app.post('/save-info', (req, res) => {
    const { username, ip } = req.body;
    if (!username || !ip) return res.status(400).send('Missing info');

    const content = `Username: ${username}, IP: ${ip}\n`;

    fs.appendFile('IP.web', content, (err) => {
        if (err) return res.status(500).send('Failed to save');
        res.send('Saved!');
    });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const cors = require('cors');
app.use(cors());
