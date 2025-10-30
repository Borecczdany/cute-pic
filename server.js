const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/save-info', (req, res) => {
    const { username, ip } = req.body;
    if (!username || !ip) return res.status(400).send('Missing info');

    const content = `Username: ${username}, IP: ${ip}\n`;

    fs.appendFile('babft.txt', content, (err) => {  // file will be babft.txt
        if (err) return res.status(500).send('Failed to save');
        res.send('Saved!');
    });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
